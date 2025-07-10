import { db } from '@saas-app/database';

export const getAllInvoices = () => db.invoice.findMany({
  include: {
    customer: true
  }
});
export const getInvoiceById = (id: string) => db.invoice.findUnique({ 
  where: { id },
  include: {
    customer: true
  }
});
export const createInvoice = (data: any) => db.invoice.create({ 
  data,
  include: {
    customer: true
  }
});
export const updateInvoice = (id: string, data: any) => db.invoice.update({ 
  where: { id }, 
  data,
  include: {
    customer: true
  }
});
export const deleteInvoice = (id: string) => db.invoice.delete({ where: { id } });