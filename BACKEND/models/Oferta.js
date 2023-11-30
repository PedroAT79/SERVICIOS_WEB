import mongoose from "mongoose";
import obtenerNumeroRegistro from "../helpers/contadorDeRegistros.js";
const ofertaSchema = mongoose.Schema({

    idPresupuesto: {
        type: mongoose.Schema.ObjectId,
        ref: 'Presupuesto',
        required: true

    },
    numeroOferta: {
        type: String
    },
    numeroPresupuesto: {
        type: String,
        required:true,
        default: 'Falta informacion'
    },
    cotizacionOferta: {
        type: Number,
        required: true
    },
     plazosPago: {
        type: Number,
        required: true
    },
    importePlazo: {
        type: Number,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    adjunto: {
        type: Buffer
    },
    observaciones: {
        type: String
    }
},
    {
        timestamps: true//para que nos cree las columnas de editado y creado

    }
)

ofertaSchema.pre('save', async function (next) {
    this.fechaOferta = Date.now();
    const numeroRegistro = await obtenerNumeroRegistro(Oferta);
    this.numeroOferta = numeroRegistro;
})

const Oferta = mongoose.model('Oferta', ofertaSchema);
export default Oferta;