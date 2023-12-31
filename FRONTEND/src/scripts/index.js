//VARIABLES FORMULARIO CONTACTO:
const nombre = document.getElementById('nombre');
const email = document.querySelector('#email');
const telef = document.querySelector('#telefono');
const textoConsulta = document.querySelector('#textoConsulta');
const botonFormulario = document.getElementById('formularioSubmit');

//VARIABLES FORMULARIO PRESUPUESTO:
const formularioPresupuesto = document.querySelector('.presupuestoServicios');
const cerrarVentanaPresupuesto = document.querySelector('.cerrarVentana');
const botonPresup = document.querySelector('#botonPresupuesto');
const btnEnviarPresup = document.querySelector('.botonEnviarPresupuesto');

//VARIABLES DE LOS INPUTS DEL FORMULARIO DE PRESUPUESTO:
const razonSocial = document.querySelector('#razonSocial');
const dni = document.querySelector('#dni');
const email2 = document.querySelector('#email2');
const telefono2 = document.querySelector('#telefono2');
const descripcion = document.querySelector('#descripcion');
const diseño = document.querySelector('.diseño');
const funcionalidades = document.querySelector('#funcionalidades');
const publicoObjetivo = document.querySelector('.publicoObjetivo');
const competencia = document.querySelector('.competencia');
const fechaEntrega = document.querySelector('.fechaEntrega');
const cerrarVentanaAvisoCampos = document.querySelector('#cerrarVentana');


//VARIABLES DE LOS INPUTS DEL FORMULARIO DE REGISTRO DE USUARIO:
const formularioRegistroUsuario = document.querySelector('.usuarioSinRegistrar');
const nombreReg = formularioRegistroUsuario.querySelector('.nombreReg');
const apellidosReg = formularioRegistroUsuario.querySelector('.apellidosReg');
const emailReg = formularioRegistroUsuario.querySelector('.emailReg');
const razonSocialReg = formularioRegistroUsuario.querySelector('.razonSocialReg');
const telefonoReg = formularioRegistroUsuario.querySelector('.telefonoReg');
const usuarioReg = formularioRegistroUsuario.querySelector('.usuarioReg');
const passwordReg = formularioRegistroUsuario.querySelector('.passwordReg');
const btnRegistroUsuario = formularioRegistroUsuario.querySelector('.registrarUsuario');

//Boton Desplegable:
const buttonDesplegable = document.querySelector('.desplegable button');
const ulDesplegable = document.querySelector('.accesos');
//Inputs para acceso usuario/password:
const accesoUsuario = document.querySelector('.accesoUsuario');
const cerrarAccesoUsuario = document.querySelector('.usuarioContrasena ul button');
const resetAccesoUsuario = document.querySelector('.resetButton');
const btnAltaUsuario = document.querySelector('.altaUsuario');
const btnVolverRegistroUsuario = document.querySelector('.usuarioSinRegistrar ul button');

//ADDEVENTLISTENER PARA EL FORMULARIO DE REGISTRO DE USUARIO:
btnRegistroUsuario.addEventListener('click', registrarUsuario);

//ADDEVENTLISTENERS DEL FORMULARIO PRESUPUESTO:
botonPresup.addEventListener('click', mostrarFormularioPresup);
cerrarVentanaPresupuesto.addEventListener('click', cerrarVentana);
btnEnviarPresup.addEventListener('click', enviarPrespuesto);
cerrarVentanaAvisoCampos.addEventListener('click', cerrarVentanaCamposPresup)

//Validacion campos vacios del formulario para presupuestos:
razonSocial.addEventListener('blur', comprobarFormPresupuesto);
dni.addEventListener('blur', comprobarFormPresupuesto);
email2.addEventListener('blur', comprobarFormPresupuesto);
telefono2.addEventListener('blur', comprobarFormPresupuesto);
descripcion.addEventListener('blur', comprobarFormPresupuesto);
funcionalidades.addEventListener('blur', comprobarFormPresupuesto);


//ADDEVENTLISTENER DEL FORMULARIO DE CONTACTO:
nombre.addEventListener('blur', validarInput);
telefono.addEventListener('blur', validarInput);
telef.addEventListener('blur', validarInput);
textoConsulta.addEventListener('blur', validarInput);
email.addEventListener('input', validarInput);

//AddEventListener del boton despleable :
buttonDesplegable.addEventListener('click', desplegarMenu);
ulDesplegable.addEventListener('mouseleave', cerrarMenu);
window.addEventListener('resize', resizeWindow);
window.addEventListener('DOMContentLoaded', mostrarMenu);

//AddEventListener para inputs de acceso a zona Admin y Usuario:
accesoUsuario.addEventListener('click', accederZonaAdmin);
cerrarAccesoUsuario.addEventListener('click', cerrarAccUsuario);
resetAccesoUsuario.addEventListener('click', borrarCamposAcceso);
btnAltaUsuario.addEventListener('click', abrirRegistroVentana);
btnVolverRegistroUsuario.addEventListener('click', volverAaccesoUsuario);

//FUNCIONES:
//FUNCIONES VALIDACION FORMULARIO DE CONTACTO:
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
//Funciones del formulario de presupuesto:

function cerrarVentana(e) {
    e.preventDefault();
    formularioPresupuesto.reset();
    formularioPresupuesto.style.display = 'none';
}

function cerrarVentanaCamposPresup(e) {
    e.preventDefault();
    document.getElementById('aviso').style.display = 'none';
    document.querySelector('.botonEnviarPresupuesto').removeAttribute("disabled");

}

function mostrarFormularioPresup() {
    formularioPresupuesto.style.display = 'grid';
}

function tipoDesarrollo() {
    let opciones = document.querySelectorAll('input[name="tipoDesarrollo"]');
    for (let opcion of opciones) {
        if (opcion.checked) {

            return opcion.value;

        } else {
            document.getElementById('aviso').style.display = 'grid';
            document.querySelector('.botonEnviarPresupuesto').setAttribute("disabled", "true");

        }
    }


}
function comprobarFormPresupuesto(e) {
    let campo = document.getElementById(e.target.id);
    if (campo.value === '') {
        campo.classList.add('campoVacio');
    } else {
        campo.classList.remove('campoVacio');
    }
}

//Registrar usuario:
async function registrarUsuario(e) {
    e.preventDefault();
    try {
        let respuesta = await fetch('http://localhost:4500/webdev/usuarios', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombreReg: nombreReg.value,
                apellidosReg:apellidosReg.value,
                emailReg: emailReg.value,
                razonSocialReg: razonSocialReg.value,
                telefonoReg: telefonoReg.value,
                usuarioReg: usuarioReg.value,
                passwordReg: passwordReg.value
            })
        })
        if (!respuesta.ok) {
            throw new Error("Error desde frontend");
            
        }
        let data = await respuesta.json();
        console.log(data);

        formularioRegistroUsuario.reset();
        formularioRegistroUsuario.style.display = 'none';
        alert('Usuario Registrado');

    } catch (error) {
        console.log(error);
    }
}
//Registrar Presupuesto:
async function enviarPrespuesto(e) {
    e.preventDefault();

    try {
        let respuesta = await fetch('http://localhost:4500/webdev/presupuestos',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        razonSocial: razonSocial.value,
                        dni: dni.value,
                        email2: email2.value,
                        telefono2: telefono2.value,
                        tipoDesarrollo: tipoDesarrollo(),
                        descripcion: descripcion.value,
                        fechaEntrega: Date.parse(fechaEntrega.value),
                        diseño: diseño.value,
                        funcionalidades: funcionalidades.value,
                        publicoObjetivo: publicoObjetivo.value,
                        competencia: competencia.value,

                    }),

            })


        if (!respuesta.ok) {
            throw new Error("Error desde frontend");
        }
        let data = await respuesta.json();
        console.log(data);

        formularioPresupuesto.reset();
        formularioPresupuesto.style.display = 'none';
        alert('Presupuesto enviado');



    } catch (error) {
        console.log(error)
    }
}

//Funcion menu desplegable:
function desplegarMenu(e) {
    e.preventDefault();
    if (window.innerWidth < 1024) {
        ulDesplegable.style.display = 'flex';
    }
}

function cerrarMenu() {
    if (window.innerWidth <= 1024) {
        ulDesplegable.style.display = 'none';
    }

}

function resizeWindow() {
    if (window.innerWidth <= 1024) {
        ulDesplegable.style.display = 'none';
    } else {
        ulDesplegable.style.display = 'flex';
    }
}

function mostrarMenu(e) {
    e.preventDefault();
    if (window.innerWidth <= 1024) {
        ulDesplegable.style.display = 'none';
        console.log('hola desde mostrarMenu');
    }
}

function accederZonaAdmin(e) {
    e.preventDefault();
    const usuarioContrasena = document.querySelector('.usuarioContrasena');
    if (usuarioContrasena.style.display === 'none') {
        usuarioContrasena.style.display = 'flex';
        document.querySelector('.usuarioSinRegistrar').style.display = 'none';
    } else {
        usuarioContrasena.style.display = 'none';
    }


    console.log('hola desde accederZonaAdmin')
}

function cerrarAccUsuario(e) {
    e.preventDefault();
    const usuarioContrasena = document.querySelector('.usuarioContrasena');
    usuarioContrasena.style.display = 'none';
    borrarCamposAcceso();
}

function borrarCamposAcceso(e) {
    document.querySelector('.usuario').value = '';
    document.querySelector('.password').value = '';
}

function abrirRegistroVentana(e) {
    e.preventDefault();
    document.querySelector('.usuarioSinRegistrar').style.display = 'flex';
    document.querySelector('.usuarioRegistrado').style.display = 'none';


}

function volverAaccesoUsuario(e) {
    e.preventDefault();
    document.querySelector('.usuarioRegistrado').style.display = 'flex';
    document.querySelector('.usuarioSinRegistrar').style.display = 'none';
}




