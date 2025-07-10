import { Router } from 'express';
import * as licenseController from '../controllers/licenseController';

const router = Router();

router.get('/', licenseController.getAll);
router.get('/:id', licenseController.getById);
router.post('/', licenseController.create);
router.put('/:id', licenseController.update);
router.delete('/:id', licenseController.remove);

export default router;