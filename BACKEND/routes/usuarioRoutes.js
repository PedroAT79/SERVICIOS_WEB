import express from 'express';
const router = express.Router();
import {registrarUsuario} from '../controllers/usuarioController.js'

router.route('/').
post(registrarUsuario);

export default router;

