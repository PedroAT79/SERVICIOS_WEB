import Usuario from "../models/Usuario";

const checkAuthUsuario = async (req, res, next) => {

    const {id} = req.params;
    const usuarioSesion = req.usuario;

}