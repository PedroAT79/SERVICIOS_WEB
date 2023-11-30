import Usuario from '../models/Usuario.js';

const registrarUsuario = async (req, res) => {

    const nuevoUsuario = new Usuario(req.body);

    try {
        const registroUsuario = await nuevoUsuario.save();
        res.json({ msg: registroUsuario });
    } catch (error) {
        console.log(error);
    }
}

const verTodosLosUsuarios = async (req, res) => {

    try {
        const usuarios = await Usuario.find();
        if (!usuarios) {
            const error = await new Error('No existen usuarios');
            return res.status(400).json({ error: error.message });
        }
        return res.json({ msg: usuarios });
    } catch (error) {
        console.log(error.message)
    }


}

const verUnUsuario = async (req, res) => {

    const { id } = req.params;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            const error = await new Error('No el usuario con' + id);
            return res.status(400).json({ error: error.message });
        }
        res.json({ msg: usuario });
    } catch (error) {
        res.status(500).json({ msg: 'Error al busca el usuario', error: error.message });
    }
}

const editarUnUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombreReg, apellidosReg, emailReg, razonSocialReg, telefonoReg, usuarioReg, passwordReg, rolReg } = req.body;

    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, {
            nombreReg,
            apellidosReg,
            emailReg,
            razonSocialReg,
            telefonoReg,
            usuarioReg,
            passwordReg,
            rolReg
        }, { new: true }); 
        if (!usuarioActualizado) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json({ msg: usuarioActualizado });

    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el usuario", error: error.message });
    }

}

const eliminarUnUsuario = async (req, res) => {

    const { id } = req.params;

    try {
        const usuarioAeliminar = await Usuario.findByIdAndDelete(id);

        if(!usuarioAeliminar){
            return res.status(404).json({ msg: 'El usuario a eliminar no existe' });
        }

        res.json({ msg: 'Usuario eliminado correctamente', usuarioAeliminar });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message });
    }

}

export { registrarUsuario, verTodosLosUsuarios, verUnUsuario, editarUnUsuario, eliminarUnUsuario };

