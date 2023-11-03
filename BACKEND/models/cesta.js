import mongoose from "mongoose";

const cestaSchema = mongoose.Schema( {
    producto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required:true,
        default: 1
    },
    precio: {
        type: Number,
        required:true
    },
    fechaCompra: {
        type:Date,
        required:true,
        default: Date.now()
    },
    cliente: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
},
{
    timestamps: true
}

)

const Cesta = mongoose.model('Cesta', cestaSchema);

export default Cesta;