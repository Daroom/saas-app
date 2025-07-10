import { db } from '@saas-app/database';

export const getAllLicenses = () => db.license.findMany();
export const getLicenseById = (id: string) => db.license.findUnique({ where: { id } });
export const createLicense = (data: any) => db.license.create({ data });
export const updateLicense = (id: string, data: any) => db.license.update({ where: { id }, data });
export const deleteLicense = (id: string) => db.license.delete({ where: { id } });