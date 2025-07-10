import { Router } from 'express';
import * as invoiceController from '../controllers/invoiceController';

const router = Router();

router.get('/', invoiceController.getAll);
router.get('/:id', invoiceController.getById);
router.post('/', invoiceController.create);
router.put('/:id', invoiceController.update);
router.delete('/:id', invoiceController.remove);

export default router;