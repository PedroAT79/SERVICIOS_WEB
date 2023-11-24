import mongoose from "mongoose";

const ofertaSchema = mongoose.Schema({

    idPresupuesto: {
        type: mongoose.Schema.ObjectId,
        ref: 'Presupuesto',
        required:true

    },
    fechaEntrega: {
        type: Date
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
    adjunto: {
        type: Buffer

    },
    fechaOferta: {
        type: Date,
        required: true
    },
    observaciones: {
        type: String
    }
},
    {
        timestamps: true//para que nos cree las columnas de editado y creado

    }
)

const Oferta = mongoose.model('Oferta', ofertaSchema);
export default Oferta;