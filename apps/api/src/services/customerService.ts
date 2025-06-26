import { db } from '@saas-app/database';

export const getAllCustomers = () => db.customer.findMany();
export const getCustomerById = (id: string) => db.customer.findUnique({ where: { id } });
export const createCustomer = (data: any) => db.customer.create({ data });
export const updateCustomer = (id: string, data: any) => db.customer.update({ where: { id }, data });
export const deleteCustomer = (id: string) => db.customer.delete({ where: { id } });