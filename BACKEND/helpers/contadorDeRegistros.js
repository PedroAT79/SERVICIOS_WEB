//Para crear el numero de registro:
async function obtenerNumeroRegistro(modelo) {
    const prefijoContador = selectorModelos(modelo.collection.collectionName);
    const fecha = new Date();
    const anio = fecha.getFullYear().toString();
    const prefijoAnio = anio.slice(2);
    const count = await modelo.countDocuments();
    const numeroRegistro =await  (count + 1) + "-" + prefijoContador + prefijoAnio;
    
    return numeroRegistro;
}

function selectorModelos(coleccion) {
    let modelo = '';
    switch (coleccion) {
        case 'ofertas':
            modelo = 'OF'
            break;
        case 'presupuestos':
            modelo = 'PR'
            break;
        case 'usuarios':
            modelo = 'US'
            break;
        case 'cestas':
            modelo = 'CC'
        default:
            modelo = ''
            break;
    }
    return modelo;
}




export default obtenerNumeroRegistro;