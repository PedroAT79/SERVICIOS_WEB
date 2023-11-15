import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellidos: {
            type: String,
            required: true
        },
        email: {
            type:String,
            required: true
        },
        razonSocial: {
            type:String
        },

        telefono: {
            type: String
        },

        password: {
            type: String,
            required: true
        },

        rol: {
            type:String,
            default:'usuario'
        },

        fechaRegistro: {
            type:Date,
            default:Date.now(),
            required:true
        },

        token: {
            type: String,
            required:true
        }


    },
     {
        timestamps: true//para que nos cree las columnas de editado y creado
    }
)

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;