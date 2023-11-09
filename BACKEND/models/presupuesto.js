import mongoose from "mongoose";

const presupuestoSchema = mongoose.Schema ({
    razonSocial: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    email2: {
        type:String,
        required: true
    },
    telefono2: {
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
        type: Date
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