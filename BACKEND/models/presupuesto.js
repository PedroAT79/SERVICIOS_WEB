import mongoose from "mongoose";
import obtenerNumeroRegistro from "../helpers/contadorDeRegistros.js";

const presupuestoSchema = mongoose.Schema({
    numeroPresupuesto: {
        type: String

    },
    razonSocial: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    email2: {
        type: String,
        required: true
    },
    telefono2: {
        type: String,
    },
    tipoDesarrollo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaEntrega: {
        type: Date,
        default:1/1/1970
    },
    diseño: {
        type: String,
        default: 'Sin informacion'
    },
    funcionalidades: {
        type: String,
        default: 'Sin informacion'
    },
    publicoObjetivo: {
        type: String,
        default: 'Sin informacion'
    },
    competencia: {
        type: String,
        default: 'Sin informacion'
    },
    estado: {
        type: String,
        default: 'Pendiente'
    },

    cotizacion: {
        type: Number,
        default: 0
    },
    oferta: {
        type: String
    }
},
    {
        timestamps: true//para que nos cree las columnas de editado y creado
    }

);

presupuestoSchema.pre('save', async function (next) {

    const numeroRegistro = await obtenerNumeroRegistro(Presupuesto);
    this.numeroPresupuesto = numeroRegistro

})

const Presupuesto = mongoose.model('Presupuesto', presupuestoSchema);

export default Presupuesto;