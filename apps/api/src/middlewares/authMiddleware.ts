import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.user = user;
    next();
  });
};