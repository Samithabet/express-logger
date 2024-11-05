import { Router } from 'express';
import ExampleController from '../controllers/ExampleController';

const router = Router();

router.get('/example', ExampleController.getExample);
router.get('/logs', ExampleController.getLogs);

export default router;
