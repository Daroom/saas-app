import { RequestHandler } from 'express';
import * as invoiceService from '../services/invoiceService';

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Invoice ID is required' });
    return;
  }
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);
    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: 'Invoice data is required' });
    return;
  }
  try {
    const invoice = await invoiceService.createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Invoice ID is required' });
    return;
  }
  try {
    const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Invoice ID is required' });
    return;
  }
  try {
    await invoiceService.deleteInvoice(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};