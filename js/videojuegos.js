//MODULO DE VIDEOJUEGOS

//VARIABLES Y ARREGLOS QUE NECESITAREMOS
let videojuegos = [];

//DATO BANDERA PARA SABER SI ESTAMOS EDITANDO O NO
let editando = false;

//PARA ALMACENAR LOS DATOS EN LOCAL STORAGE
let LS = window.localStorage;

//TRAER LOS DATOS DE VIDEOJUEGOS SI EXISTEN EL LOCAL STORAGE

if(LS.getItem('videojuegos')) {
    videojuegos = JSON.parse(LS.getItem('videojuegos'));
}

//IMPRIMIR LA TABLA INICIAL
imprimirTabla(videojuegos);

//TRAERNOS LOS DATOS DEL FORMULARIO DE VIDEOJUEGOS 
const form = document.querySelector('#form-anadir');
form.addEventListener('submit', e=> {
    e.preventDefault();

    anadirVideojuego();
})

//FUNCIONES *****************************************************

//FUNCION PARA AÑADIR NUEVO VIDEOJUEGO

function anadirVideojuego(){

    //DEBEMOS TRAERNOS LOS DATOS DEL FORMULARIO DE VIDEOJUEGOS

    const nombreVideojuego = document.querySelector('#nombreVideojuego').value;
    const tematicaVideojuego = document.querySelector('#tematicaVideojuego').value;
    const valorVideojuego = document.querySelector('#valorVideojuego').value;
    const puntosVideojuego = document.querySelector('#puntosVideojuego').value;

    //AHORA VAMOS A AGREGAR EL VIDEOJUEGO CON TODOS SUS VALORES YA ANTERIORMENTE VERIFICADOS

    const nuevoVideojuego = {
        id: editando === false ? Date.now() : editando,
        nombreVideojuego,
        tematicaVideojuego,
        valorVideojuego,
        puntosVideojuego
    }

    if(editando) {
        nuevoVideojuego.id = editando
        videojuegos = videojuegos.map(videojuego => videojuego.id === editando ? nuevoVideojuego : videojuego)

        //DEVOLVER LOS NOMBRES DE LOS FORMULARIOS A LA NORMALIDAD

        document.querySelector('#form-title').textContent = 'NUEVO VIDEOJUEGO';
        document.querySelector('#form-button').textContent = 'Añadir';

        alert('Cliente Editado Exitosamente')

        editando = false;
    } else {
        alert('Videojuego Agregado Exitosamente')
        videojuegos.push(nuevoVideojuego);
    }

    editando = false;

    //GUARDAR EL LOCAL STORAGE

    LS.setItem('videojuegos', JSON.stringify(videojuegos));

    //BORRAR LOS DATOS DEL FORMULARIO ANTERIOR
    form.reset();

    //IMPRIMIR LA TABLA
    imprimirTabla(videojuegos);
}

//FUNCION PARA ELIMINAR VIDEOJUEGOS

function eliminarVideojuego(id){
    videojuegos = videojuegos.filter(videojuego => videojuego.id !== id);

    //GUARDAR LOS DATOS NUEVAMENTE EN LOCAL STORAGE
    LS.setItem('videojuegos', JSON.stringify(videojuegos))

    alert('Videojuego Eliminado Exitosamente')

    //IMPRIMIR LA TABLA
    imprimirTabla(videojuegos);
}

//FUNCION PARA CARGAR LOS DATOS

function cargarDatos(id){

    //CAMBIAR LOS TITULOS PARA SABER QUE ESTAMOS EDITANDO 
    document.querySelector('#form-title').textContent = 'EDITAR VIDEOJUEGO'
    document.querySelector('#form-button').textContent = 'Guardar Cambios';

    videojuegos.forEach(videojuego => {
        if(videojuego.id === id) {
            nombreVideojuego.value = videojuego.nombreVideojuego;
            tematicaVideojuego.value = videojuego.tematicaVideojuego;
            valorVideojuego.value = videojuego.valorVideojuego;
            puntosVideojuego.value = videojuego.puntosVideojuego;
        }
    });

    editando = id;
}

//FUNCION PARA IMPRIMIR TABLAS

function imprimirTabla(datos){

    //LIMPIAR LA TABLA ANTERIOR
    const tabla = document.querySelector('#tabla-videojuegos');
    tabla.innerHTML = '';

    //IMPRIMIR NUEVO
    datos.forEach(videojuego => {
        tabla.innerHTML += `
        <tr>
        <td>${videojuego.id}</td>
        <td>${videojuego.nombreVideojuego}</td>
        <td>${videojuego.tematicaVideojuego}</td>
        <td>${videojuego.valorVideojuego}</td>
        <td>${videojuego.puntosVideojuego}</td>
        <td>
            <div class="d-flex justify-content-center align-items-center">
                <button class="btn btn-primary me-1" onclick="cargarDatos(${videojuego.id})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarVideojuego(${videojuego.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </td>
        </tr>
    `
    });
}
