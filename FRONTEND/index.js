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

//Boton Desplegable:
const buttonDesplegable = document.querySelector('.desplegable button');
const ulDesplegable = document.querySelector('.accesos');
const ilDesplegable = document.querySelectorAll('.accesos li');





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
descripcion.addEventListener('blur',comprobarFormPresupuesto);
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
window.addEventListener('DOMContentLoaded',mostrarMenu);

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

function cerrarVentanaCamposPresup(e){
    e.preventDefault();
    document.getElementById('aviso').style.display = 'none';
    document.querySelector('.botonEnviarPresupuesto').removeAttribute("disabled"); 

}

function mostrarFormularioPresup() {
    formularioPresupuesto.style.display = 'grid';
}


function tipoDesarrollo(){
    let opciones = document.querySelectorAll('input[name="tipoDesarrollo"]');
    for(let opcion of opciones){
        if (opcion.checked) {
           
            return opcion.value;

        }else {
           document.getElementById('aviso').style.display = 'grid';
           document.querySelector('.botonEnviarPresupuesto').setAttribute("disabled", "true"); 

        }
        }
    

}
function comprobarFormPresupuesto(e){ 
    let campo = document.getElementById(e.target.id);
    if(campo.value === '') {
        campo.classList.add('campoVacio');
    }else {
        campo.classList.remove('campoVacio');
    }
    }
    

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
function desplegarMenu(e){
   e.preventDefault();
   if(window.innerWidth<1024){
    ulDesplegable.style.display = 'flex';
    ilDesplegable.style.display = 'flex';
    console.log('desde desplegar menu')
   }
}

function cerrarMenu(){
    if(window.innerWidth <= 1024){
        ulDesplegable.style.display = 'none';
        console.log('desde cerrar menu')
    }

}

function resizeWindow(){
    if(window.innerWidth <= 1024){
        ulDesplegable.style.display = 'none';
    } else {
        ulDesplegable.style.display = 'flex';
    }
}

function mostrarMenu(e){
    e.preventDefault();
    if(window.innerWidth <= 1024){
        ulDesplegable.style.display = 'none';
       console.log('hola desde mostrarMenu');
    }
}

