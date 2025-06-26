import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@saas-app/database';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, ...rest } = req.body;
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: { email, password: hashedPassword, ...rest }
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findUnique({ where: { email } });
    if (!user){ 
        res.status(401).json({ error: 'Invalid credentials' });
        return; 
    }

    if (!user.password){
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid){
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
};