import { RequestHandler } from 'express';
import * as companyService from '../services/companyService';

export const getAll: RequestHandler = async (req, res, next) => {
  
  try {
    const companies = await companyService.getAllCompanies();
    res.json(companies);
  } catch (err) {
    next(err);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Company ID is required' });
    return;
  }
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    res.json(company);
  } catch (err) {
    next(err);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: 'Company data is required' });
    return;
  }
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Company ID is required' });
    return;
  }
  try {
    const company = await companyService.updateCompany(req.params.id, req.body);
    res.json(company);
  } catch (err) {
    next(err);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Company ID is required' });
    return;
  }
  try {
    await companyService.deleteCompany(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};