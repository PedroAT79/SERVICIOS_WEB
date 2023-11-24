import express from 'express';
const router = express.Router();
import {editarOferta, eliminarOferta, listarOfertas, listarUnaOferta, registrarOferta} from '../controllers/ofertaController.js'

router.route('/')
.post(registrarOferta)
.get(listarOfertas);

router.route('/:id')
.get(listarUnaOferta)
.put(editarOferta)
.delete(eliminarOferta);

export default router;