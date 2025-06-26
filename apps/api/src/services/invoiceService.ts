import { db } from '@saas-app/database';

export const getAllInvoices = () => db.invoice.findMany();
export const getInvoiceById = (id: string) => db.invoice.findUnique({ where: { id } });
export const createInvoice = (data: any) => db.invoice.create({ data });
export const updateInvoice = (id: string, data: any) => db.invoice.update({ where: { id }, data });
export const deleteInvoice = (id: string) => db.invoice.delete({ where: { id } });