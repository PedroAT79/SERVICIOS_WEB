import express from 'express';
const router = express.Router();
import { registrarPresupuesto, listarPresupuestos} from '../controllers/presupuestoController.js'

router.route('/')
.post(registrarPresupuesto)
.get(listarPresupuestos);

export default router;