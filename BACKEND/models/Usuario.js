import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarToken from '../helpers/generarToken.js';
import generarId from "../helpers/generarId.js";
import obtenerNumeroRegistro from "../helpers/contadorDeRegistros.js";

const UsuarioSchema = mongoose.Schema(
    {
        usuarioCont: {
            type: String
        },
        nombreReg: {
            type: String,
            required: true
        },
        apellidosReg: {
            type: String,
            required: true
        },
        emailReg: {
            type: String,
            required: true
        },
        razonSocialReg: {
            type: String
        },

        telefonoReg: {
            type: String,
            default: 'Sin informacion'
        },
        usuarioReg: {
            type: String,
            required: true
        },

        passwordReg: {
            type: String,
            required: true
        },

        rolReg: {
            type: String,
            default: 'usuario'
        },

        fechaRegistroReg: {
            type: Date,
            default: Date.now(),
            required: true
        },

        tokenReg: {
            type: String,
            default: generarId(),
            required: true
        },


    },
    {
        timestamps: true//para que nos cree las columnas de editado y creado
    }
)

//Encriptado del usuario:
UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified("passwordReg")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.passwordReg = await bcrypt.hash(this.passwordReg, salt);

    const numeroRegistro = await obtenerNumeroRegistro(Usuario);
    this.usuarioCont = numeroRegistro;

})



//Autencacion del usuario:
UsuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.passwordReg);
}

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;