import express from 'express';
const router = express.Router();
import {editarUnUsuario, eliminarUnUsuario, registrarUsuario, verTodosLosUsuarios, verUnUsuario} from '../controllers/usuarioController.js'

router.route('/')
.post(registrarUsuario)
.get(verTodosLosUsuarios);

router.route('/:id')
.get(verUnUsuario)
.put(editarUnUsuario)
.delete(eliminarUnUsuario);


export default router;

