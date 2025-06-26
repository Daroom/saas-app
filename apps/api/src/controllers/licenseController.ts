import { RequestHandler } from 'express';
import * as licenseService from '../services/licenseService';

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const licenses = await licenseService.getAllLicenses();
    res.json(licenses);
  } catch (err) {
    next(err);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'License ID is required' });
    return;
  }
  try {
    const license = await licenseService.getLicenseById(req.params.id);
    if (!license) {
      res.status(404).json({ error: 'License not found' });
      return;
    }
    res.json(license);
  } catch (err) {
    next(err);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: 'License data is required' });
    return;
  }
  try {
    const license = await licenseService.createLicense(req.body);
    res.status(201).json(license);
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'License ID is required' });
    return;
  }
  try {
    const license = await licenseService.updateLicense(req.params.id, req.body);
    res.json(license);
  } catch (err) {
    next(err);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'License ID is required' });
    return;
  }
  try {
    await licenseService.deleteLicense(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};