import Presupuesto from "../models/Presupuesto.js";

const registrarPresupuesto = async (req, res) => {
    
const nuevaSolicitud = new Presupuesto(req.body); 

try {
    const registroSolicitud = await nuevaSolicitud.save();
    res.json({msg:registroSolicitud});

}catch(error) {
    console.log( error);
}

}

const listarPresupuestos = async (req, res) => {
    const obtenerPresupuestos = await Presupuesto.find();
    res.json({obtenerPresupuestos});
}

export {registrarPresupuesto, listarPresupuestos};