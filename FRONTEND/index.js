
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


function validarInput(e){
if(e.target.value.trim() === '') {
    mostrarError(e.target);
    activarBotonFormulario[e.target.name] = '';
    activarBoton();
    return;
}

if(e.target.id === 'email' && !validarEmail(e.target.value)){
    mostrarError(e.target);
    activarBotonFormulario[e.target.name] = '';
    activarBoton();
    return;
}

limpiarAlerta(e.target);
activarBotonFormulario[e.target.name] = e.target.value.trim().toLowerCase();
activarBoton();

 
}

function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
}

function mostrarError(referencia){
    limpiarAlerta(referencia);
    referencia.classList.add('error');
    
}

function activarBoton() {
    if(Object.values(activarBotonFormulario).includes('')){
        botonFormulario.setAttribute("disabled", "true");
        return;
     }else {
        botonFormulario.removeAttribute("disabled");
        return;
     }
}

function limpiarAlerta(referencia){

    if(referencia.value !== '') {
        referencia.classList.remove('error');
    }


}