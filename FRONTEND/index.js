
const activarBotonFormulario = {
    nombre: '',
    email: '',
    telefono: '',
    textoConsulta: ''
}

const nombre = document.getElementById('nombre');
const email = document.querySelector('#email');
const telef = document.querySelector('#telefono');
const textoConsulta = document.querySelector('#textoConsulta');
const botonFormulario = document.getElementById('formularioSubmit');

nombre.addEventListener('blur', validarInput);
telefono.addEventListener('blur', validarInput);
telef.addEventListener('blur', validarInput);
textoConsulta.addEventListener('blur', validarInput);
email.addEventListener('input', validarInput);


function validarInput(e) {
    if (e.target.value.trim() === '') {
        mostrarError(e.target);
        activarBotonFormulario[e.target.name] = '';
        activarBoton();
        return;
    }

    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
        mostrarError(e.target);
        activarBotonFormulario[e.target.name] = '';
        activarBoton();
        return;
    }

    limpiarAlerta(e.target);
    activarBotonFormulario[e.target.name] = e.target.value.trim().toLowerCase();
    activarBoton();


}

function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
}

function mostrarError(referencia) {
    limpiarAlerta(referencia);
    referencia.classList.add('error');

}

function activarBoton() {
    if (Object.values(activarBotonFormulario).includes('')) {
        botonFormulario.setAttribute("disabled", "true");
        return;
    } else {
        botonFormulario.removeAttribute("disabled");
        return;
    }
}

function limpiarAlerta(referencia) {

    if (referencia.value !== '') {
        referencia.classList.remove('error');
    }


}

/*Mostrar Formulario de presupuesto*/

const formularioPresupuesto = document.querySelector('.presupuestoServicios');

const botonPresup = document.querySelector('#botonPresupuesto');

botonPresup.addEventListener('click', mostrarFormularioPresup);

function mostrarFormularioPresup() {

    formularioPresupuesto.style.display = 'grid';

}

/*Cerrar ventana presupuesto*/
const razonSocial = document.querySelector('.razonSocial');
const cif = document.querySelector('.cif');
const email2 = document.querySelector('.email2');
const telf = document.querySelector('.telf');
const tipoServicio = document.querySelector('.tipoServicio');
const descripcion = document.querySelector('.descripcion');
const diseño = document.querySelector('.diseño');
const funcionalidades = document.querySelector('.funcionalidades');
const publicoObjetivo = document.querySelector('.publicoObjetivo');
const competencia = document.querySelector('.competencia');
const plazosEntrega = document.querySelector('.plazosEntrega');
const cerrarVentanaPresupuesto = document.querySelector('.cerrarVentana');

cerrarVentanaPresupuesto.addEventListener('click', cerrarVentana);

const datosPresupuesto = {
    razonSocial: '',
    cif: '',
    email2: '',
    telf: '',
    tipoServicio: '',
    descripcion: '',
    diseño: '',
    funcionalidades: '',
    publicoObjetivo: '',
    competencia: '',
    plazosEntrega: ''
}

function cerrarVentana(e) {
    e.preventDefault();
    formularioPresupuesto.reset();
    formularioPresupuesto.style.display = 'none';
}

/* Validad Formulario de presupuesto*/

