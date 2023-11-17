import express from 'express';
const router = express.Router();
import { registrarPresupuesto, listarPresupuestos, verPresupuesto} from '../controllers/presupuestoController.js'

router.route('/')
.post(registrarPresupuesto)
.get(listarPresupuestos);

router.route('/verpresupuesto/:id')
.get(verPresupuesto);

export default router;