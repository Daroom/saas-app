// Controller file - use RequestHandler type for all exports:
import { RequestHandler } from 'express';
import * as customerService from '../services/customerService';

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Customer ID is required' });
    return;
  }
  try { 
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: 'Customer data is required' });
    return;
  }
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Customer ID is required' });
    return;
  }
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Customer ID is required' });
    return;
  }
  try {
    await customerService.deleteCustomer(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};