
window.addEventListener('load', () => {
    let baseDatos;
    let solicitudConexion = indexedDB.open('Almacen-de-Vinos', 1);

    solicitudConexion.onsuccess = function(evento) {
        baseDatos = evento.target.result;
        agregarVinosAlAlmacen();
    }

    solicitudConexion.onerror = function(evento) {
        document.querySelector("#resultado").innerText = `No se pudo cargar la base de datos correctamente: ${evento.target.errorCode}`;
    }
    
    solicitudConexion.onupgradeneeded = function(evento) {
        baseDatos = evento.target.result;
        let vinos = baseDatos.createObjectStore('vinos', { keyPath: 'nombre' }); 
    }

    function agregarVinosAlAlmacen() {
        let transaccion = baseDatos.transaction(['vinos'], 'readwrite');
        let vinos = transaccion.objectStore('vinos');

        //let vinoListo = { nombre: "Malbec", imagen: "imagen1.jpg", detalle: "Vino tinto argentino con cuerpo medio y notas frutales." };

        const vinoListo = { nombre: "Cabernet Sauvignon", imagen: "./multimedia/imagenesVinos/vino1.jpg", detalle: "Vino tinto con cuerpo, aroma a grosellas y especias." };
                // { nombre: "Merlot", imagen: "imagen4.jpg", detalle: "Vino tinto suave con notas a ciruela y vainilla." },
                // { nombre: "Syrah", imagen: "imagen5.jpg", detalle: "Vino tinto potente con aromas a moras y especias." },
                // // Agregar más vinos según sea necesario
            ;


        // Verificar si el vino ya existe en la base de datos
        let solicitud = vinos.openCursor();

        solicitud.onsuccess = function(evento) {
            let cursor = evento.target.result;
            if (cursor) {
                // Si encontramos un vino con el mismo nombre, actualizamos sus datos
                if (cursor.value.nombre === vinoListo.nombre) {
                    cursor.update(vinoListo).onsuccess = function() {
                        document.querySelector("#resultado").innerText = `El vino ya existe y ha sido actualizado`;
                    };
                    return;
                }
                cursor.continue(); // Pasamos al siguiente vino
            } else {
                // Si no encontramos un vino con el mismo nombre, lo agregamos a la base de datos
                vinos.add(vinoListo).onsuccess = function() {
                    document.querySelector("#resultado").innerText = `El vino se ha agregado de forma satisfactoria`;
                };
            }
        };
        
        transaccion.oncomplete = function() {
        };
    }
});


window.addEventListener('load', () => {
    let baseDatos;
    let solicitudConexion = indexedDB.open('Almacen-de-Vinos', 1);

    solicitudConexion.onsuccess = function(evento) {
        baseDatos = evento.target.result;
        mostrarVinosEnTarjetas();
    }

    solicitudConexion.onerror = function(evento) {
        document.querySelector("#resultado").innerText = `No se pudo cargar la base de datos correctamente: ${evento.target.errorCode}`;
    }

    function mostrarVinosEnTarjetas() {
        let transaccion = baseDatos.transaction(['vinos'], 'readonly');
        let vinos = transaccion.objectStore('vinos');

        let contenidoTarjetas = document.querySelector("#contenido-tarjetas");

        let cursorSolicitud = vinos.openCursor();
        cursorSolicitud.onsuccess = function(evento) {
            let cursor = evento.target.result;
            if (cursor) {
                // Obtener los datos del vino del cursor
                let vino = cursor.value;

                // Crear una tarjeta para el vino actual
                let tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta");

                let nombre = document.createElement("h2");
                nombre.textContent = vino.nombre;

                let imagen = document.createElement("img");
                imagen.setAttribute("src", vino.imagen);
                

                let detalle = document.createElement("p");
                detalle.textContent = vino.detalle;

                tarjeta.appendChild(nombre);
                tarjeta.appendChild(imagen);
                tarjeta.appendChild(detalle);

                contenidoTarjetas.appendChild(tarjeta);

                // Continuar con el siguiente vino
                cursor.continue();
            }
        };
    }
});




/*Pasos para eliminar base de datos*/

// const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

// // Nombre de la base de datos que quieres eliminar
// const dbName = "";

// // Abre una conexión a la base de datos con el método deleteDatabase
// const solicitudConexion = indexedDB.deleteDatabase(dbName);

// // Maneja el resultado de la solicitud
// solicitudConexion.onsuccess = function(evento) {
//     console.log("Base de datos eliminada correctamente");
// };

// solicitudConexion.onerror = function(evento) {
//     console.error("Error al eliminar la base de datos:", evento.target.errorCode);
// };
