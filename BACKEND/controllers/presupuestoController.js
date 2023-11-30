import Presupuesto from "../models/presupuesto.js";

const registrarPresupuesto = async (req, res) => {

    const nuevaSolicitud = new Presupuesto(req.body);

    try {
        const registroSolicitud = await nuevaSolicitud.save();
        res.json({ msg: registroSolicitud });

    } catch (error) {
        console.log(error);
    }

}

const listarPresupuestos = async (req, res) => {
    const obtenerPresupuestos = await Presupuesto.find();
    res.json({ obtenerPresupuestos });
}

const verPresupuesto = async (req, res) => {
    const { id } = req.params;
    const presupuesto = await Presupuesto.findById(id);

    if (!presupuesto) {
        const error = new Error(`No existe un presupuesto con ese nº de Id`);
        return res.status(400).json({ error: error.message });
    }

    try {
        return res.json({ presupuesto });
    } catch (error) {
        console.log(error);
    }

}

const editarPresupuesto = async (req, res) => {
    const { id } = req.params;
    const { razonSocial, dni, email2, telefono2, tipoDesarrollo, descripcion, fechaEntrega, diseño, funcionalidades, publicoObjetivo, competencia, estado, /*numeroPresupuesto,*/ cotizacion, oferta } = req.body;

    try {

        const presupuestoActualizado = await Presupuesto.findByIdAndUpdate(id, {
            razonSocial,
            dni,
            email2,
            telefono2,
            tipoDesarrollo,
            descripcion,
            fechaEntrega,
            diseño,
            funcionalidades,
            publicoObjetivo,
            competencia,
            estado,
            //numeroPresupuesto,
            cotizacion,
            oferta
        }, { new: true });
        if (!presupuestoActualizado) {
            return res.status(404).json({ msg: 'Presupuesto no encontrado' });
        }
        res.json({ msg: presupuestoActualizado });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el presupuesto", error: error.message });
    }

}

const eliminarPrespuesto = async (req, res) => {

    const { id } = req.params;

    try {
        
        const presupuestoAeliminar = await Presupuesto.findByIdAndDelete(id);
        if(!presupuestoAeliminar){
            return res.status(404).json({ msg: 'El presupuesto a eliminar no existe' });
        }

        res.json({ msg: 'Prespuesto eliminado correctamente', presupuestoAeliminar });


    } catch (error) {
        
    }


}
export { registrarPresupuesto, listarPresupuestos, verPresupuesto, editarPresupuesto, eliminarPrespuesto };