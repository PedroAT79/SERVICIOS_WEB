import generarToken from '../helpers/generarToken.js';
import Usuario from '../models/Usuario.js';

const registrarUsuario = async (req, res) => {

    const { emailReg, nombreReg } = req.body;
    const existeUsuario = await Usuario.findOne({ emailReg: emailReg });

    if (existeUsuario) {
        const error = new Error('Error: El usuario ya esta registrado');
        return res.status(400).json({ msg: error.message });
    }
    try {

        const nuevoUsuario = new Usuario(req.body);
        const registroUsuario = await nuevoUsuario.save();
        res.json({ msg: registroUsuario });
    } catch (error) {
        console.log(error);
    }
};

const perfilUsuario = (req, res) => { //Para mostrar el perfil del usuario.
    const { usuario } = req;
    res.json({ perfil_Usuario: usuario });
};

const confirmarUsuario = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ tokenReg: token });

    if (!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.tokenReg = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({ msg: 'Usuario confirmado mediante Token' });
    } catch (error) {
        console.log(error);
    }
}

const autenticarUsuario = async (req, res) => {
    //1º Comprobacion si existe cuenta:
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ emailReg: email });
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(403).json({ msg: error.message });
    }
    //2º Comprobar si el usuario ha sido confirmado con el TOKEN:
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta de usuario no ha sido confirmada');
        return res.status(403).json({ msn: error.message });
    }

    //3º Revisar el password:
    if (await usuario.comprobarPassword(password)) {

        return res.json({ token: generarToken(usuario.id) });
    } else {
        const error = new Error('El password ingresado no es correcto');
        return res.status(403).json({ msg: error.message });
    }


};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ tokenReg: token });

    if (tokenValido) {
        return res.json({ msg: 'Token valido, el usuario existe' });
    } else {
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    }


};

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const existeUsuario = await Usuario.findOne({tokenReg:token});

    if(!existeUsuario) {
        const error = new Error("Hubo un error, no existe este usuario");
        res.status(400).json({msg:error.message});
    }

    try {
        existeUsuario.tokenReg = null; //1º borro el token para que no quede en la bbdd
        existeUsuario.passwordReg = password //el password que le mando por el formulario (POST)
        await existeUsuario.save(); //guardo el usuario con la clave nueva y el token a null.
        res.json({msg:"Password modificado correctamente."})


    } catch (error) {
        console.log(error);
    }

};



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

};

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

        if (!usuarioAeliminar) {
            return res.status(404).json({ msg: 'El usuario a eliminar no existe' });
        }

        res.json({ msg: 'Usuario eliminado correctamente', usuarioAeliminar });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message });
    }

}



export { registrarUsuario, verTodosLosUsuarios, verUnUsuario, editarUnUsuario, eliminarUnUsuario, perfilUsuario, confirmarUsuario, autenticarUsuario, comprobarToken, nuevoPassword };

