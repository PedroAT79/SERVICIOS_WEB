import express from 'express';
const router = express.Router();
import { registrarPresupuesto} from '../controllers/presupuestoController.js'

router.route('/')
.post(registrarPresupuesto);

export default router;