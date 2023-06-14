//MODULO DE FIDELIZACION

//ARREGLOS Y VARIABLES
let clientes= [];

//GUARDAR EL LOCAL STORAGE
let LS = window.localStorage;

//TRAER LOS REGISTROS DE LOCAL STORAGE SI EXISTEN
if(LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}

imprimirTabla(clientes);

const inputBuscar = document.querySelector('#buscar');
inputBuscar.addEventListener('keyup', buscarClientes);

function buscarClientes(){
    if(inputBuscar.value === ''){
        imprimirTabla(clientes);
    } else {
        if (isNaN(inputBuscar.value)) {
            let busqueda = clientes.filter(function (cliente){
                return (
                    cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) || cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase())
                );
            });

            imprimirTabla(busqueda);
        } else {
            let busqueda = clientes.filter(function (cliente) {
                return cliente.identificacion.includes(inputBuscar.value);
            });

            imprimirTabla(busqueda);
        }
        
    }
}

function imprimirTabla(datos){

    const tabla = document.querySelector('#tabla-clientes')
    tabla.innerHTML = '';

    datos.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        <td>${cliente.puntos}</td>
        `
    })

}


