
const urlPresupuestos = 'http://localhost:4500/webdev/presupuestos'

//Funciones para mostrar los datos registrados en bbdd:
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

//Funcion para crear las tablas:
function crearTablaPresup(datosJson) {
  const sectionDatos = document.querySelector('.datos');
  const table = document.createElement('table');
  // Crear la fila de encabezados utilizando las claves del primer objeto
  const headerRow = document.createElement('thead');
  table.appendChild(headerRow);
  for (const key of Object.keys(datosJson.obtenerPresupuestos[0])) {
    //console.log(key)
    const th = document.createElement('th');
    if ((key !== '__v') && (key !== 'updatedAt') /*&& (key !== 'dni')*/ && (key !== 'diseño') && (key !== 'publicoObjetico') && (key !== 'competencia') && (key !== 'funcionalidades') && (key !== 'descripcion')) {

      th.textContent += tratamientoCabeceras(key);
      headerRow.appendChild(th);
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
          cell.textContent = tratamientoFecha(obj[key]);
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
    const btnEditar = document.createElement('button');
    btnEditar.innerHTML = 'Editar';
    btnEditar.classList.add('btnEditar')
    btnEditar.classList.add(j);
    celdaBtn.appendChild(btnEditar);
    const btnBorrar = document.createElement('button');
    btnBorrar.innerHTML = 'Borrar';
    btnBorrar.classList.add('btnBorrar');
    btnBorrar.classList.add(j);
    celdaBtn.appendChild(btnBorrar);



    table.appendChild(row);
  }
  table.classList.add('tabla');
  sectionDatos.appendChild(table);


}


window.addEventListener('load', obtenerPresupuestos(urlPresupuestos));

window.addEventListener('DOMContentLoaded', (event) => {
  const datosContainer = document.querySelector('.datos');

  datosContainer.addEventListener('click', (event) => {
    const target = event.target;
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
      const celda = target.parentElement;
      const fila = celda.parentElement;
      const id = fila.querySelector('.id').textContent;
      console.log('id:', id);
    } else if (target.classList.contains('btnBorrar')) {
      // Lógica para borrar...   event.preventDefault();
      const celda = target.parentElement;
      const fila = celda.parentElement;
      const id = fila.querySelector('.id').textContent;
      console.log('id:', id);


    }
  });
});

function verDatosPresupuesto(id) {

  const url = `http://localhost:4500/webdev/presupuestos/verpresupuesto/${id}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      crearVistaPresupuesto(data);
    })
    .catch(error => {
      console.error(error);
    })

}

function crearVistaPresupuesto(datosJson) {
  const tabla = document.querySelector('.tabla');
  tabla.style.display = 'none';
  const divDatos = document.createElement('div');
  divDatos.classList.add('datosPresupuesto')
  const datosPresupuesto = document.querySelector('.datos');
  datosPresupuesto.appendChild(divDatos);

  for (const key of Object.keys(datosJson.presupuesto)) {
    //console.log(datosJson.presupuesto[key]);
    const parrafo = document.createElement('p');
    parrafo.textContent = tratamientoCabeceras(key) + ': ';
    console.log(parrafo);
    const span = document.createElement('span');
    const valor = datosJson.presupuesto[key];
    console.log('valor.' +valor);
    span.textContent = valor;
    parrafo.appendChild(span);
    divDatos.appendChild(parrafo);
  }
  
}
/*console.log(datosJson.presupuesto.razonSocial);
console.log(Object.keys(datosJson.presupuesto.razonSocial));*/



function tratamientoCabeceras(key) {

  let nuevaKey = '';

  switch (key) {
    case 'razonSocial':
      nuevaKey = 'Razón Social';
      break;
    case 'dni':
      nuevaKey = 'DNI';
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
      nuevaKey = 'Objetivo';
      break;
    case 'competencia':
      nuevaKey = 'Competencia';
      break;
    case 'estado':
      nuevaKey = 'Estado';
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

function tratamientoFecha(fechaAFormatear) {
  cortarFecha(fechaAFormatear);
  const fecha = new Date(fechaAFormatear);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio % 100}`;

  return fechaFormateada;
}

//botones tabla presupuestos:
// Obtener todos los botones dentro de la tabla




