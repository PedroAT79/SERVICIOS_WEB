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

const verPresupuesto = async (req, res) => {
    const { id } = req.params;
    const presupuesto = await Presupuesto.findById(id);

    if(!presupuesto){
        const error = new Error(`No existe un presupuesto con ese nº de Id`);
        return res.status(400).json({error: error.message});
    }

    try {
       return res.json({presupuesto}); 
    } catch (error) {
        console.log(error);
    }

}

export {registrarPresupuesto, listarPresupuestos, verPresupuesto};