//MODULO DE COMPRAS

//VARIABLES Y ARREGLOS

let clientes = [];
let videojuegos = [];
let datoCliente = [];
let datoVideojuego = [];
let videojuegoSeleccionado;

//GUARDAR EN LOCAL STORAGE

const LS = window.localStorage;

//TRAEMOS LOS REGISTROS DEL LOCAL STORAGE

if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}
if(LS.getItem('videojuegos')) {
    videojuegos = JSON.parse(LS.getItem('videojuegos'));
}

const modClientes = document.querySelector('#clientes');
const modVideojuegos = document.querySelector('#videojuegos');

//SELECCIONAR CLIENTES
imprimirTablaClientes(clientes);

const inputBuscar = document.querySelector('#buscar-clientes');
inputBuscar.addEventListener('keyup', buscarClientes);

const btnSelectCliente = document.querySelector('#select-cliente');

btnSelectCliente.addEventListener('click', ()=> {

    modClientes.classList.add('d-none')
    modVideojuegos.classList.remove('d-none')

    cargarClienteTicket();
});

//FUNCIONES ****************

//FUNCION PARA BUSCAR CLIENTE

function buscarClientes(){

    if(inputBuscar.value === ''){
        imprimirTablaClientes(clientes);
    } else {
        if (isNaN(inputBuscar.value)) {
            busqueda = clientes.filter(function (cliente){
                return(
                    cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) || cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase())
                );
            });

            //VALIDAR SI ES SOLO UN CLIENTE
            if(busqueda.length === 1) {
                btnSelectCliente.classList.remove('disabled');
            } else if(busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
                btnSelectCliente.classList.add('disabled');
            }

            datoCliente = busqueda;

            imprimirTablaClientes(busqueda);
        } else {
            let busqueda = clientes.filter(function (cliente){
                return cliente.identificacion.includes(inputBuscar.value);
            });

            if (busqueda.length === 1) {
                btnSelectCliente.classList.remove('disabled');
            } else if (busqueda.length > 1 || busqueda.length < 1 && !btnSelectCliente.classList.contains('disabled')) {
                btnSelectCliente.classList.add('disabled');
            }

            datoCliente = busqueda;

            imprimirTablaClientes(busqueda);
        }
    }
}

//FUNCION PARA CARGAR EL TICKET CON LOS DATOS DEL CLIENTE SELECCIONADO

function cargarClienteTicket(){
    const clienteDatos = document.querySelector('#clienteDatos');

    clienteDatos.innerHTML = `
    <p><b>Documento:</b> ${datoCliente[0].identificacion}</p>
    <p><b>Nombre:</b> ${datoCliente[0].nombres} ${datoCliente[0].apellidos}</p>
    <p><b>Teléfono:</b> ${datoCliente[0].telefono}</p>
    <p><b>Email:</b> ${datoCliente[0].email}</p>
    <p><b>Nacionalidad:</b> ${datoCliente[0].nacionalidad}</p>
`
}

function imprimirTablaClientes(datos) {

    //LIMPIAR LA TABLA ANTERIOR
    const tabla = document.querySelector('#tabla-clientes');
    tabla.innerHTML = '';

    //IMPRIMIR
    datos.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        </tr>
    `
    });
}

//FUNCION IMPRIMIR VIDEOJUEGOS

function imprimirTablaVideojuegos(datos){

    const tabla = document.querySelector('#tabla-videojuegos');
    tabla.innerHTML = '';

    datos.forEach(videojuego => {
        tabla.innerHTML += `
        <tr>
        <td>${videojuego.nombreVideojuego}</td>
        <td>${videojuego.tematicaVideojuego}</td>
        <td>${videojuego.valorVideojuego}</td>
        <td>${videojuego.puntosVideojuego}</td>
        </tr>
        `
    })

}

//FUNCION PARA SELECCIONAR EL VIDEOJUEGO PARA COMPRAR
imprimirTablaVideojuegos(videojuegos);

const inputBuscarV = document.querySelector('#buscar-videojuegos');
inputBuscarV.addEventListener('keyup', buscarVideojuegos);

const btnComprarVideojuego = document.querySelector('#comprarVideojuego');
btnComprarVideojuego.addEventListener('click', () => {
    cargarVideojuegoTicket();

    document.querySelector('#form-tickets').classList.add('d-none');

    clientes.forEach((cliente, idx) => {
        if(cliente.id === datoCliente[0].id){
            clientes[idx].puntos += parseInt(datoVideojuego[0].puntosVideojuego);
        }
    });

    alert('VideoJuego Comprado Exitosamente, Tus puntos han sido añadidos')

    //GUARDAR EN LOCAL STORAGE
    LS.setItem('clientes', JSON.stringify(clientes));
});


//FUNCION PARA BUSCAR VIDEOJUEGO

function buscarVideojuegos() {
    if(inputBuscarV.value === ''){
        imprimirTablaVideojuegos(videojuegos);
    }else {
        if(inputBuscarV.value){
            busqueda = videojuegos.filter(function (videojuego) {
                return videojuego.nombreVideojuego.toLowerCase().includes(inputBuscarV.value.toLowerCase());
            });

            //VALIDAR QUE SEA UNO SOLO
            if(busqueda.length === 1){
                btnComprarVideojuego.classList.remove('disabled');
            } else if(busqueda.length > 1 || busqueda.length < 1 && btnComprarVideojuego.classList.contains('disabled')) {
                btnComprarVideojuego.classList.add('disabled');
            }

            datoVideojuego = busqueda;

            imprimirTablaVideojuegos(busqueda);
        }
    }
}

//FUNCION PARA CARGAR EL VIDEOJUEGO EN EL TICKET

function cargarVideojuegoTicket() {
    const videojuegoDatos = document.querySelector('#videojuegoDatos');

    videojuegoDatos.innerHTML = `
    <p><b>Valor Videojuego:</b> ${datoVideojuego[0].valorVideojuego}</p>
    <p><b>+IVA:</b> ${datoVideojuego[0].valorVideojuego * 0.16}</p>
    <p><b>+Impuesto especial:</b> ${datoVideojuego[0].valorVideojuego * 0.04}</p>
    <p><b>Total:</b> ${datoVideojuego[0].valorVideojuego * 1.20}</p>
    <hr>
    <p><b>Puntos de Fidelización del Videojuego</b> ${datoVideojuego[0].puntosVideojuego}</p>
`
}
