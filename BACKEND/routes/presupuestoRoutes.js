import express from 'express';
const router = express.Router();
import { registrarPresupuesto, listarPresupuestos, verPresupuesto, editarPresupuesto, eliminarPrespuesto} from '../controllers/presupuestoController.js'

router.route('/')
.post(registrarPresupuesto)
.get(listarPresupuestos);

router.route('/:id')
.get(verPresupuesto)
.put(editarPresupuesto)
.delete(eliminarPrespuesto);

export default router;