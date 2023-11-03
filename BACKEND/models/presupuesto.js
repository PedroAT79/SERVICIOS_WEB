import mongoose from "mongoose";

const presupuestoSchema = mongoose.Schema ({
    nombre: {
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
    tipoDesarrollo: {
        type:String,
        required: true
    },
    descripcion: {
        type:String,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    diseño: {
        type:String
    },
    funcionalidades: {
        type: String,
        required: true
    },
    publicoObjetivo: {
        type: String
    },
    competencia: {
        type: String
    },
    estado: {
        type: String,
        required: true,
        default: 'Pendiente'
    },
    numeroPresupuesto: {
        type: String
    },
    cotizacion: {
        type:Number,
        default: 0
    },
    oferta: {
        type:String
    }
    },
    {
    timestamps: true//para que nos cree las columnas de editado y creado
    }

)

const Presupuesto = mongoose.model('Presupuesto', presupuestoSchema);

export default Presupuesto;