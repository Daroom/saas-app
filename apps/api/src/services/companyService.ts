import { db } from '@saas-app/database';

export const getAllCompanies = () => db.company.findMany();
export const getCompanyById = (id: string) => db.company.findUnique({ where: { id } });
export const createCompany = (data: any) => db.company.create({ data });
export const updateCompany = (id: string, data: any) => db.company.update({ where: { id }, data });
export const deleteCompany = (id: string) => db.company.delete({ where: { id } });