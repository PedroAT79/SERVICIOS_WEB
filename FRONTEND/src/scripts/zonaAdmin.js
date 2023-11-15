
const urlPresupuestos = 'http://localhost:4500/webdev/presupuestos'


window.addEventListener('onload', obtenerPresupuestos(urlPresupuestos));


//Funciones para mostrar los datos registrados en bbdd:
function obtenerPresupuestos(url) {
    let datosJson;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(function (salida) {
            datosJson = salida;
           console.log(datosJson);
           crearTablas(datosJson);

        }).catch(function (error) {
            console.log(error);
        })

}

//Funcion para crear las tablas:
function crearTablas(datosJson){
    const sectionDatos = document.querySelector('.datos');
    const table = document.createElement('table');
    // Crear la fila de encabezados utilizando las claves del primer objeto
    const headerRow = document.createElement('tr');
    const th = document.createElement('th');
    for(const key of Object.keys(datosJson.obtenerPresupuestos[0])){
        th.textContent = key;
        console.log(key)
        
       
        
    }
    headerRow.appendChild(th);
    table.appendChild(headerRow);
    sectionDatos.appendChild(table);

    /*table.appendChild(headerRow);

    // Iterar sobre los objetos y crear filas de datos
    datosJson.forEach(obj => {
       
        const tr = document.createElement('tr');
      for (const key in datosJson[0]) {
        if (datosJson[0].hasOwnProperty(key)) {
          const td = document.createElement('td');
          td.textContent = obj[key];
          tr.appendChild(td);
        }
      }
      table.appendChild(tr);
      sectionDatos.appendChild(table);
    });*/



    /*
     //Creo la tabla:
     const table = document.createElement('table');
     table.classList.add('tabla');
     //Creo la fila de encabezados:
     const headerRow = document.createElement('tr');
     Object.keys(datosJson.obtenerPresupuestos).forEach(Node => {
         const th = document.createElement('th');
         th.textContent = Node;
         headerRow.appendChild(th);
     });
     table.appendChild(headerRow);*/
    

}


