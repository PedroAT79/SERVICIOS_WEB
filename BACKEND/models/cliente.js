import mongoose from "mongoose";

const clienteSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellidod: {
            type: String,
            required: true
        },
        dni: {
            type: String,
            required: true
        },
        email: {
            type:String,
            required: true
        },
        telefono: {
            type: String,
        },

        password: {
            type: String,
            required: true
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

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;