

const urlPresupuestos = 'http://localhost:4500/webdev/presupuestos';
const urlOfertas = 'http://localhost:4500/webdev/ofertas';
const listadoOfertas = document.querySelector('.datosOferta');
const datosContainer = document.querySelector('.datos')

//ADDEVENLISTER:
window.addEventListener('load', function () {
  if (window.location.pathname.includes('zonaAdmin.html')) {
    obtenerPresupuestos(urlPresupuestos);
    return console.log('zonaAdmin')
  } else if (window.location.pathname.includes('listadoOfertas.html')) {
    obtenerOfertas(urlOfertas);
    //return console.log('listadoOfertas');
  }
})

window.addEventListener('DOMContentLoaded', (event) => {
  if (window.location.pathname.includes('zonaAdmin.html')) {
    const datosContainer = document.querySelector('.datos');
    datosContainer.addEventListener('click', (event) => {
      const target = event.target;
      //console.log(event.target);
      if (target.classList.contains('btnVer')) {
        event.preventDefault();
        const celda = target.parentElement;
        const fila = celda.parentElement;
        const id = fila.querySelector('.id').textContent;
        verDatosPresupuesto(id);
        // Aquí puedes agregar la lógica para visualizar más detalles o realizar acciones con ese ID
      } else if (target.classList.contains('btnEditar')) {
        // Lógica para editar...
        event.preventDefault();
        const inputs = document.querySelectorAll('.divContacto input');
        inputs.forEach(function (input) {
          if (input.disabled = true) {
            input.disabled = false;
            document.querySelector('.btnEditar').classList.add('btnPulsado');
          }
        }
        )
      } else if (target.classList.contains('btnOferta')) {
        event.preventDefault();
        const inputs = document.querySelectorAll('.divContacto input');
        inputs.forEach(function (input) {
          if (input.disabled = true) {
            //input.disabled = false;
            document.querySelector('.btnOferta').classList.add('btnPulsado');
            document.querySelector('.btnEditar').style.display = 'none';
            document.querySelector('.btnOferta').style.display = 'none';

          } else {
            console.log('lo que sea');
          }


        })
        const divBotones = document.querySelector('.divBotones');
        console.log(divBotones);
        const divOferta = document.createElement('form');
        divOferta.classList.add('divOferta');
        divOferta.setAttribute('enctype', 'application/x-www-form-urlencoded');
        divBotones.insertAdjacentElement('beforebegin', divOferta);
        const idPrespuesto = document.querySelector('._id').value;
        const inputPresupuesto = document.createElement('input');
        const textAreaOferta = document.createElement('textarea');
        const tituloOferta = document.createElement('h4');
        const datosPpalOferta = document.createElement('div');
        datosPpalOferta.classList.add('datosOferta');
        const labelFechaOferta = document.createElement('label');
        const inputFechaOferta = document.createElement('input');
        const fecha = new Date();
        const cotOfertaLabel = document.createElement('label');
        const cotOfertaInput = document.createElement('input');
        const labelArchivo = document.createElement('label');
        const inputArchivo = document.createElement('input');
        const labelPlazos = document.createElement('label');
        const inputPlazos = document.createElement('input');
        const labelPrimerPago = document.createElement('label');
        const inputPrimerPago = document.createElement('input');
        const btnGuardarOferta = document.createElement('button');
        const btnBorrarCampos = document.createElement('button');
        const fechaEntregaLabel = document.createElement('label');
        const fechaEntregaInput = document.createElement('input');
        const divBotonesOferta = document.createElement('div');
        const numeroPresupLabel = document.createElement('label');
        const numeroPresupInput = document.createElement('input');
        numeroPresupInput.classList.add('numeroPresup');
        numeroPresupLabel.textContent = 'Nº Presup.';
        numeroPresupInput.value = document.querySelector('.divContacto .numeroPresupuesto').value;
        console.log(numeroPresupInput.value);
        numeroPresupLabel.appendChild(numeroPresupInput);

        cotOfertaInput.classList.add('cotOferta');
        const cotizacion = document.querySelector('.divContacto .cotizacion').value;
        if (cotizacion !== 0) {
          cotOfertaInput.value = cotizacion;
        } else {
          console.log(cotizacion);
          cotOfertaInput.value = 0;
        }

        fechaEntregaLabel.textContent = 'Fecha entrega estimada:';
        fechaEntregaInput.setAttribute('id', 'fechaEntrega')
        const fechaEntregaPresup = document.querySelector('.divInfo .fechaEntrega').value;
        console.log(fechaEntregaPresup);
        fechaEntregaInput.value = tratamientoFecha2(fechaEntregaPresup);
        fechaEntregaLabel.appendChild(fechaEntregaInput);
        cotOfertaLabel.textContent = 'Cotizacion oferta (€):'
        cotOfertaInput.type = 'number';
        cotOfertaInput.classList.add('cotizacionOferta');
        cotOfertaInput.setAttribute('name', 'cotizacionOferta');
        cotOfertaLabel.appendChild(cotOfertaInput);
        btnGuardarOferta.classList.add('btnGuardar');
        btnGuardarOferta.textContent = 'Guardar';
        btnGuardarOferta.setAttribute('type', 'submit');
        btnBorrarCampos.textContent = 'Borrar';
        btnBorrarCampos.classList.add('btnBorrar');
        labelPlazos.textContent = 'Nº Plazos de pago:'
        inputPlazos.classList.add('plazosPago');
        inputPlazos.setAttribute('name', 'plazosPago');
        labelPlazos.appendChild(inputPlazos);
        labelPrimerPago.textContent = 'Importe por plazo (€):'
        inputPrimerPago.setAttribute('name', 'importePlazo');
        inputPrimerPago.setAttribute('disabled', 'true');
        inputPrimerPago.value = 0;
        inputPrimerPago.type = 'number';
        inputPrimerPago.classList.add('importePlazo');
        labelPrimerPago.appendChild(inputPrimerPago);
        tituloOferta.textContent = 'Oferta:'
        labelArchivo.textContent = 'Insertar Archivo:';
        inputArchivo.classList.add('adjunto');
        inputArchivo.setAttribute('type', 'file');
        labelArchivo.appendChild(inputArchivo);
        textAreaOferta.setAttribute('id', 'editor');
        textAreaOferta.setAttribute('name', 'observaciones');
        textAreaOferta.classList.add('observaciones');
        divOferta.appendChild(tituloOferta);
        divOferta.appendChild(datosPpalOferta);

        inputPresupuesto.value = idPrespuesto;
        inputPresupuesto.classList.add('idPresupuesto');
        inputPresupuesto.setAttribute('name', 'idPresupuesto');
        inputPresupuesto.style.display = 'none';
        datosPpalOferta.appendChild(inputPresupuesto);


        datosPpalOferta.appendChild(fechaEntregaLabel);
        datosPpalOferta.appendChild(cotOfertaLabel);
        datosPpalOferta.appendChild(labelPlazos);
        datosPpalOferta.appendChild(labelPrimerPago);
        datosPpalOferta.appendChild(labelArchivo);
        datosPpalOferta.appendChild(labelFechaOferta);
        datosPpalOferta.appendChild(numeroPresupLabel);
        divOferta.appendChild(textAreaOferta);
        divOferta.appendChild(divBotonesOferta);
        divBotonesOferta.appendChild(btnGuardarOferta);
        divBotonesOferta.appendChild(btnBorrarCampos);
        ClassicEditor
          .create(divOferta.querySelector('#editor'))
          .catch(error => {
            console.error(error);
          });
      } else if (target.classList.contains('btnBorrar')) {
        const cotizOferta = document.querySelector('.cotOferta');
        const plazosOferta = document.querySelector('.plazosPago');
        const importePlazo = document.querySelector('.importePlazo');
        const entrega = document.querySelector('.entrega');
        const textArea = ClassicEditor.instances['editor'];
        const parrafoBorrar = textArea.querySelectorAll('.ck p');
        entrega.value = 0;
        cotizOferta.value = 0;
        plazosOferta.value = 0;
        importePlazo.value = 0;
        console.log(parrafoBorrar);
        if (textArea) {
          const editable = textArea.editable();
          editable.find('p').forEach(parrafo => {
            parrafo.remove();
          })
        }
      } else if (target.classList.contains('btnGuardar')) {
        event.preventDefault();

        // Obtén los valores de los campos del formulario de la oferta
        const idPresupuesto = document.querySelector('.idPresupuesto').value
        const fechaEntrega = document.querySelector('.datosOferta #fechaEntrega').value;
        const cotizacionOferta = document.querySelector('.cotizacionOferta').value;
        const plazosPago = document.querySelector('.plazosPago').value;
        const importePlazo = document.querySelector('.importePlazo').value;
        const numeroPresupuesto = document.querySelector('.numeroPresup').value;
        const observaciones = document.querySelector('.ck p').innerHTML;
        const adjuntoInput = document.querySelector('.adjunto');

        // Aquí puedes hacer una petición AJAX o enviar los datos al servidor para registrar la oferta
        // Por ejemplo, usando fetch para una petición POST a tu servidor
        fetch('http://localhost:4500/webdev/ofertas/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idPresupuesto,
            numeroPresupuesto,
            fechaEntrega,
            cotizacionOferta,
            plazosPago,
            importePlazo,
            observaciones,
          }),
        })
          .then(response => {
            // Manejar la respuesta del servidor
            if (response.ok) {
              // La oferta se registró correctamente
              console.log('Oferta registrada correctamente');
              return response.json();
              // Puedes hacer aquí otras acciones, como mostrar un mensaje de éxito o redirigir al usuario


            } else {
              // La oferta no se pudo registrar, manejar el error
              console.error('Error al registrar la oferta');
              // Mostrar un mensaje de error o tomar otras acciones necesarias

            }
          })
          .then(data => {
            console.log(data.idPrespuesto);
            alert('Oferta Registrada correctamente: ' + JSON.stringify(data.msg.numeroOferta));
            window.open('listadoOfertas.html');
          })
          .catch(error => {
            console.error('Error:', error);
            // Manejar errores de red u otros errores
          });
      }
    })
  } else if (window.location.pathname.includes('listadoOfertas.html')) {
    console.log('hola');
    const datosOferta = document.querySelector('.datosOferta');
    console.log(datosOferta);


  }
})

//FUNCIONES FETCH:
function obtenerPresupuestos(url) {
  let datosJson;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(function (salida) {
      datosJson = salida;
      crearTablaPresup(datosJson);

    }).catch(function (error) {
      console.log(error);
    })

}

function obtenerOfertas(url) {
  let datosJson;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(function (salida) {
      datosJson = salida;
      crearTablaOfertas(datosJson);


    }).catch(function (error) {
      console.log(error);
    })

}

//FUNCIONES PARA CREACION DE TABLAS:

function crearTablaPresup(datosJson) {
  const sectionDatos = document.querySelector('.datos');
  const table = document.createElement('table');
  // Crear la fila de encabezados utilizando las claves del primer objeto
  const headerRow = document.createElement('thead');
  table.appendChild(headerRow);
  for (const key of Object.keys(datosJson.obtenerPresupuestos[0])) {
    console.log(key)
    const th = document.createElement('th');

    if ((key !== '__v') && (key !== 'updatedAt') /*&& (key !== 'dni')*/ && (key !== 'diseño') && (key !== 'publicoObjetico') && (key !== 'competencia') && (key !== 'funcionalidades') && (key !== 'descripcion')) {

      th.textContent += tratamientoCabeceras(key);
      headerRow.appendChild(th);
      console.log(headerRow);
    }
  }
  const thBtn = document.createElement('th');
  thBtn.textContent = 'Opciones';
  headerRow.appendChild(thBtn);

  let j = 0;
  for (const obj of datosJson.obtenerPresupuestos) {
    j++;
    let i = 0;
    const row = document.createElement('tr')
    if (j % 2 === 0) {
      row.classList.add('par');
    } else {
      row.classList.add('impar');
    }
    for (const key in obj) {
      if (key !== '__v' && key !== 'updatedAt'/*&& (key !== 'dni')*/ && (key !== 'diseño') && (key !== 'publicoObjetico') && (key !== 'competencia') && (key !== 'funcionalidades') && (key !== 'descripcion')) {
        i++;
        const cell = document.createElement('td');
        cell.classList.add(clasesPresupuesto(i));
        if (clasesPresupuesto(i) === 'id') { //Para añadir el id a la celda.
          cell.setAttribute('id', obj[key]);
        }

        if (i === 7 || i === 11) {
          cell.textContent = tratamientoFecha2(obj[key]);
        } else {
          cell.textContent = obj[key];
        }
        row.appendChild(cell);

      }

    }
    //Creacion de los botones por cada fila de registro.
    const celdaBtn = document.createElement('td')
    celdaBtn.classList.add('celdaBtn');
    row.appendChild(celdaBtn);
    const BtnVer = document.createElement('button');
    BtnVer.innerHTML = 'Ver';
    BtnVer.classList.add('btnVer');
    BtnVer.classList.add(j);
    celdaBtn.appendChild(BtnVer);
    /*const btnEditar = document.createElement('button');
    btnEditar.innerHTML = 'Editar';
    btnEditar.classList.add('btnEditar')
    btnEditar.classList.add(j);
    celdaBtn.appendChild(btnEditar);
    const btnBorrar = document.createElement('button');
    btnBorrar.innerHTML = 'Borrar';
    btnBorrar.classList.add('btnBorrar');
    btnBorrar.classList.add(j);
    celdaBtn.appendChild(btnBorrar);*/
    table.appendChild(row);
  }
  table.classList.add('tabla');
  sectionDatos.appendChild(table);


}
function crearTablaOfertas(datosJson) {
  const sectionDatos = document.querySelector('.divCuerpo .listadoOfertas');
  const table = document.createElement('table');
  // Crear la fila de encabezados utilizando las claves del primer objeto
  const headerRow = document.createElement('thead');
  table.appendChild(headerRow);
  for (const key of Object.keys(datosJson.ofertas[0])) {
    const th = document.createElement('th');
    if ((key !== '__v') && (key !== 'updatedAt') && (key !== 'diseño') && (key !== 'competencia') && (key !== 'observaciones') && (key !== 'idPresupuesto')) {

      th.textContent = tratamientoCabeceras(key);
      headerRow.appendChild(th);
      console.log(headerRow);


    }
  }
  const thBtn = document.createElement('th');
  thBtn.textContent = 'Opciones';
  headerRow.appendChild(thBtn);

  let j = 0;
  for (const obj of datosJson.ofertas) {
    j++;
    let i = 0;
    const row = document.createElement('tr')
    if (j % 2 === 0) {
      row.classList.add('par');
    } else {
      row.classList.add('impar');
    }
    for (const key in obj) {
      if (key !== '__v' && key !== 'updatedAt' && (key !== 'observaciones') && (key !== 'idPresupuesto')) {
        i++;
        const cell = document.createElement('td');
        cell.classList.add(clasesPresupuesto(i));

        if (i === 5 || i === 6) {
          cell.textContent = tratamientoFecha2(obj[key]);
        } else {
          cell.textContent = obj[key];
        }

        //cell.textContent = obj[key];
        row.appendChild(cell);

      }

    }
    //Creacion de los botones por cada fila de registro.
    const celdaBtn = document.createElement('td')
    celdaBtn.classList.add('celdaBtn');
    row.appendChild(celdaBtn);
    const BtnVer = document.createElement('button');
    BtnVer.innerHTML = 'Ver';
    BtnVer.classList.add('btnVer');
    BtnVer.classList.add(j);
    celdaBtn.appendChild(BtnVer);
    const btnEditar = document.createElement('button');
    btnEditar.innerHTML = 'Editar';
    btnEditar.classList.add('btnEditar')
    btnEditar.classList.add(j);
    celdaBtn.appendChild(btnEditar);
    table.appendChild(row);
  }
  table.classList.add('tabla');
  sectionDatos.appendChild(table);
}
function crearVistaPresupuesto(datosJson) {

  let i = 0;
  const tabla = document.querySelector('.tabla');
  tabla.style.display = 'none';

  const divInfo = document.createElement('div');
  divInfo.classList.add('divInfo');

  const divContacto = document.createElement('div');
  divContacto.classList.add('divContacto');

  const divDatos = document.createElement('div');
  divDatos.classList.add('datosPresupuesto')

  const datosPresupuesto = document.querySelector('.datos');
  datosPresupuesto.appendChild(divDatos);

  for (const key of Object.keys(datosJson.presupuesto)) {
    const parrafo = document.createElement('p');
    parrafo.textContent = tratamientoCabeceras(key) + ': ';
    const input = document.createElement('input');
    input.classList.add(key);
    const valor = datosJson.presupuesto[key];

    input.value = valor;

    input.setAttribute('disabled', 'true');
    if (i < 6 || i === 7 || i >= 11) {
      divContacto.appendChild(parrafo);
      parrafo.appendChild(input);
      divDatos.appendChild(divContacto);
    } else {
      divInfo.appendChild(parrafo);
      parrafo.insertAdjacentElement('afterend', input);
      divDatos.appendChild(divInfo);
    }
    i++;
  }

  const divBotones = document.createElement('div');
  divBotones.classList.add('divBotones');
  const botonEditar = document.createElement('button');
  botonEditar.classList.add('btnEditar');
  botonEditar.textContent = 'Editar';

  const botonBorrar = document.createElement('button');
  botonBorrar.classList.add('btnBorrar');
  botonBorrar.textContent = 'Borrar';

  const botonGuardar = document.createElement('button');
  botonGuardar.classList.add('btnGuardar');
  botonGuardar.textContent = 'Guardar';

  const botonOferta = document.createElement('button');
  botonOferta.classList.add('btnOferta');
  botonOferta.textContent = 'Ofertar';

  divBotones.appendChild(botonEditar);
  //divBotones.appendChild(botonGuardar);
  divBotones.appendChild(botonOferta);
  //divBotones.appendChild(botonBorrar);
  datosPresupuesto.appendChild(divBotones);

}
function crearVistaOferta(datosJson) {

}


//FUNCIONES COMPLEMENTARIAS A OTRAS:
function verDatosPresupuesto(id) {

  const url = `http://localhost:4500/webdev/presupuestos/${id}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      crearVistaPresupuesto(data);
    })
    .catch(error => {
      console.error(error);
    })

}

function tratamientoCabeceras(key) {

  let nuevaKey = '';

  switch (key) {
    case 'razonSocial':
      nuevaKey = 'Razón Social';
      break;
    case 'dni':
      nuevaKey = 'Dni-Cif';
      break;
    case 'email2':
      nuevaKey = 'E-mail';
      break;

    case 'tipoDesarrollo':
      nuevaKey = 'Tipo';
      break;

    case 'descripcion':
      nuevaKey = 'Descripcion';
      break;
    case 'fechaEntrega':
      nuevaKey = 'Fecha Entrega';
      break;
    case 'diseño':
      nuevaKey = 'Diseño';
      break;
    case 'funcionalidades':
      nuevaKey = 'Funcionalidades';
      break;
    case 'publicoObjetivo':
      nuevaKey = 'Público objetivo';
      break;
    case 'competencia':
      nuevaKey = 'Competencia';
      break;
    case 'estado':
      nuevaKey = 'Estado Oferta';
      break;
    case 'cotizacion':
      nuevaKey = 'Cotización';
      break;
    case 'telefono2':
      nuevaKey = 'Telf.';
      break;
    case 'createdAt':
      nuevaKey = 'Fecha Solicitud';
      break;
    case '_id':
      nuevaKey = 'Id.'
      break;
    case 'updatedAt':
      nuevaKey = 'Fecha edicion'
      break;
    case 'numeroPresupuesto':
      nuevaKey = 'Nº Presup.';
      break;
    case 'cotizacionOferta':
      nuevaKey = 'Cotizacion OF.';
      break;
    case 'plazosPago':
      nuevaKey = 'Nº Plazos';
      break;
    case 'importePlazo':
      nuevaKey = 'Importe Plazo (€)';
      break;
    case 'numeroOferta':
      nuevaKey = 'Nº Oferta';
      break;
    default:
      nuevaKey = key;
      break;
  }
  return nuevaKey;
}

function clasesPresupuesto(i) {
  let clase = '';
  switch (i) {
    case 1:
      clase = 'id';
      break;
    case 2:
      clase = 'razonSocial';
      break;
    case 3:
      clase = 'dni';
      break;
    case 4:
      clase = 'email2';
      break;
    case 5:
      clase = 'telefono2';
      break;
    case 6:
      clase = 'tipoDesarrollo';
      break;
    case 7:
      clase = 'fechaEntrega'
      break;
    case 8:
      clase = 'publicoObjetivo'
      break;
    case 9:
      clase = 'estado'
      break;
    case 10:
      clase = 'cotizacion'
      break;
    case 11:
      clase = 'fechaSolicitud'
      break;
    case 12:
      clase = 'numeroPresupuesto'
      break;
    default:
      clase = '';
      break;

  }
  return clase;
}

function asimilableAfecha(fechaString) {
  const esfecha = Date.parse(fechaString);
  if (isNaN(esfecha)) {
    return false;
  }
  else {
    return true;
  }

}
function cortarFecha(fecha) {
  const fechaCortada = fecha.substring(0, 10);
  return fechaCortada;
}

//FUNCIONES TRATAMIENTO DE DATOS:
function tratamientoFecha(fechaAFormatear) {
  cortarFecha(fechaAFormatear);
  const fecha = new Date(fechaAFormatear);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();
  const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio % 100}`;
  return fechaFormateada;
}

function tratamientoFecha2(fechaAFormatear) {
  const fecha = new Date(fechaAFormatear);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = String(fecha.getFullYear() % 100).padStart(2, '0');
  const fechaFormateada = `${dia}/${mes}/${anio}`;
  return fechaFormateada;
}

function tratamientoFecha3(fechaAFormatear) {
  const fecha = new Date(fechaAFormatear);
  const dia = String(fecha.getDate())
  const mes = String(fecha.getMonth() + 1)
  const anio = String(fecha.getFullYear() % 100)
  const fechaFormateada = `${dia}/${mes}/${anio}`;
  return fechaFormateada;
}

//boton Editar presupuesto:
function editarPresupuesto(e) {
  e.preventDefault();
  document.querySelectorAll('input').setAttribute('disabled', false);
}






