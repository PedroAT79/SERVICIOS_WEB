import express from 'express';
const router = express.Router();
import {registrarCliente} from '../controllers/clienteController.js'

router.route('/').
post(registrarCliente);

export default router;

