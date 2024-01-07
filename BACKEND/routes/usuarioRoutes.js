import express from 'express';
const router = express.Router();
import {autenticarUsuario, confirmarUsuario, editarUnUsuario, eliminarUnUsuario, perfilUsuario, registrarUsuario, verTodosLosUsuarios, verUnUsuario} from '../controllers/usuarioController.js'

router.route('/')
.post(registrarUsuario)
.get(verTodosLosUsuarios);

router.route('/:id')
.get(verUnUsuario)
.put(editarUnUsuario)
.delete(eliminarUnUsuario);

router.get('/confirmarUsuario/:tokenReg', confirmarUsuario);
router.post('/autenticarUsuario', autenticarUsuario);
router.get('/perfil', perfilUsuario);

export default router;

