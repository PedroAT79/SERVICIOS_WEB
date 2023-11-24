import Oferta from '../models/Oferta.js'

const registrarOferta = async (req, res) => {
    //const { idPresupuesto, fechaEntrega, cotizacionOferta, plazosPago, importePago, adjunto, fechaOferta, observaciones} = req.body;

    const nuevaOferta = new Oferta(req.body);

    try {

        const registroOferta = await nuevaOferta.save();
        res.json({msg:registroOferta});

    }catch(error){
        console.log(error);
    }

}

const listarOfertas = async (req,res) => {

    const ofertas = await Oferta.find();
    if(!ofertas){
        const error = await new Error('No existen ofertas');
        return res.status(400).json({error: error.message});
    }

    return res.json({msg:ofertas});
}

const listarUnaOferta = async (req, res) => {

    const { id } = req.params;
    const oferta = await Oferta.findById(id);

    if(!oferta) {
        const error = await new Error('No existe esa oferta');
        return res.status(400).json({error: error.message});
    }

    return res.json({mag:oferta});

}

const editarOferta = async (req, res) => {
    const { id } = req.params;
    const {idPresupuesto, fechaEntrega, cotizacionOferta, plazosPago, importePago, adjunto, fechaOferta, observaciones} = req.body;

    try {
        const ofertaActualizada = await Oferta.findByIdAndUpdate(id, {
            idPresupuesto,
            fechaEntrega,
            cotizacionOferta,
            plazosPago,
            importePago,
            adjunto,
            fechaOferta,
            observaciones
        }, {new: true});
        if(!ofertaActualizada){
            return res.status(404).json({msg: 'Oferta no encontrada'});
        }
        res.json({msg:ofertaActualizada});
    } catch (error) {
        res.status(500).json({msg:'Error al actualizar la oferta', error: error.message});
    }

}

const eliminarOferta = async (req, res) => {
    const { id } = req.params;
    try {
    const ofertaAeliminar = await Oferta.findByIdAndDelete(id);
    
    if(!ofertaAeliminar) {
        return res.status(404).json({msg:'La oferta a eliminar no existe'});
    }
    res.json({msg:'Oferta eliminada correctamente',ofertaAeliminar});
   
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la oferta', error: error.message });
    }

}

export {registrarOferta, listarOfertas, listarUnaOferta, editarOferta, eliminarOferta}