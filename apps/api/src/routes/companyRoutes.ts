import { Router } from 'express';
import * as companyController from '../controllers/companyController';

const router = Router();

router.get('/', companyController.getAll);
router.get('/:id', companyController.getById);
router.post('/', companyController.create);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.remove);

export default router;