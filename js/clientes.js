//MODULO DE CLIENTES *******************************

//VARIABLES Y ARREGLOS A UTILIZAR
let clientes = [];

//DATO BANDERA PARA SABER CUANDO ESTAMOS EDITANDO
let editando = false;

//PARA GUARDAR EN LOCAL STORAGE
let LS = window.localStorage;

//TRAER SI EXISTEN REGISTROS EN LOCAL STORAGE

if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}

//IMPRIMIR TABLA DE CLIENTES
imprimirTabla(clientes);

//TRAER LOS DATOS DEL FORMULARIO DE CLIENTES
const form = document.querySelector('#form-anadir');

form.addEventListener('submit', e => {
    e.preventDefault(); // PARA PREVENIR QUE LA PAGINA SE RECARGUE

    anadirCliente();
})

const inputBuscar = document.querySelector('#buscar');
inputBuscar.addEventListener('keyup', buscarClientes);

//************************ FUNCIONES  ****************

//FUNCION PARA AÑADIR CLIENTE NUEVO AL ARREGLO *****************************
function anadirCliente(){
    //VAMOS A ACCEDER A LOS VALUES DEL FORMULARIO

    //IDENTIFICACACION DEL CLIENTE
    const identificacion = document.querySelector('#identificacion').value;

    //NOMBRES DEL CLIENTE
    const nombres = document.querySelector('#nombres').value;

    //APELLIDOS DEL CLIENTE
    const apellidos = document.querySelector('#apellidos').value;

    //TELEFONO DEL CLIENTE
    const telefono = document.querySelector('#telefono').value;

    //EMAIL DEL CLIENTE
    const email = document.querySelector('#email').value;

    //FECHA NACIMIENTO DEL CLIENTE
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value;

    //NACIONALIDAD DEL CLIENTE
    const nacionalidad = document.querySelector('#nacionalidad').value;

    //AHORA VAMOS A AGREGAR ESTOS VALORES AL ARRAY

    const nuevoCliente = {

        //LA CONDICION TERNARIA ES PARA ASIGNAR EL ID DEL CLIENTE EN ESTE CASO LO HACEMOS CON LA FUNCION DATE.NOW YA QUE ESTA ES SIEMPRE UNICA PARA CADA UNO, Y EN CASO DE QUE LA CONDICION PASE ENTONCES SE LE DA ESTE VALOR DE LA FUNCION.
        id: editando === false ? Date.now() : editando, 
        identificacion, 
        nombres,
        apellidos,
        telefono, 
        email,
        fechaNacimiento,
        nacionalidad,
        puntos: 0
    }

    //AHORA VAMOS A SABER SI ESTAMOS EDITANDO O NO EL CLIENTE

    if(editando){
        nuevoCliente.id = editando;
        clientes = clientes.map(cliente => cliente.id === editando ? nuevoCliente : cliente)

        //YA QUE HEMOS CAMBIADO LOS TITULOS DEL FORMULARIO POR EDITAR ENTONCES LOS VAMOS A VOLVER A SU ESTADO ORIGINAL LUEGO DE EDITAR CLIENTE
        document.querySelector('#form-title').textContent = 'NUEVO CLIENTE';
        document.querySelector('#form-button').textContent = 'Añadir';

        alert('Cliente Editado Exitosamente')

        //DEVOLVEMOS EL DATO BANDERA COMO ESTABA ORIGINALMENTE
        editando = false;
    } else {
        //AHORA SI YA VERIFICAMOS QUE NO ESTA EDITANDO ENTONCES ES MOMENTO DE PUBLICAR EL CLIENTE
        clientes.push(nuevoCliente);
        alert('Cliente Agregado Exitosamente')
    }

    editando = false;

    //GUARDAMOS LOS DATOS EN LOCAL STORAGE
    LS.setItem('clientes', JSON.stringify(clientes));

    //LIMPIAR LOS DATOS DEL FORMULARIO
    form.reset();

    //AHORA IMPRIMIMOS LA TABLA
    imprimirTabla(clientes);
}

//FUNCION PARA CARGAR LOS DATOS DEL CLIENTE ********************************

function cargarDatos(id){
    //VAMOS A EL TITULO Y EL BOTON DEL FORMULARIO PARA SABER QUE ESTAMOS EDITANDO

    //TITULO DEL FORMULARIO
    document.querySelector('#form-title').textContent = 'EDITAR CLIENTE';

    //TEXTO DEL BOTON SUBMIT DEL FORMULARIO
    document.querySelector('#form-button').textContent = 'Guardar Cambios'

    //VAMOS A HACER UN FOREACH PARA ENCONTRAR EL CLIENTE EL CUAL VAMOS A EDITAR Y ENCONTRAMOS A ESTE A TRAVES DEL ID
    clientes.forEach(cliente => {
        //RECORREMOS EL ARRAY Y SI EL ID COINCIDE ENTONCES CAMBIOS LOS DATOS DE ESTE CLIENTE
        if(cliente.id === id){
            identificacion.value = cliente.identificacion;
            nombres.value = cliente.nombres;
            apellidos.value = cliente.apellidos; 
            telefono.value = cliente.telefono;
            email.value = cliente.email;
            fechaNacimiento.value = cliente.fechaNacimiento;
            nacionalidad.value = cliente.nacionalidad;
        }
    });

    editando = id;
}

//FUNCION PARA ELIMINAR CLIENTES ********************************

function eliminarCliente(id){

    //CON LA FUNCION FILTER LO QUE HACEMOS ES QUE ME DEVUELVA TODOS LOS VALORES QUE NO SON EL QUE LE HEMOS PEDIDO, ES DECIR DEVUELVA TODOS MENOS ESE Y LOS MANDAMOS NUEVAMENTE AL LOCALSTORAGE
    clientes = clientes.filter(cliente => cliente.id !== id);

    //GUARDAMOS EN LOCAL STORAGE
    LS.setItem('clientes', JSON.stringify(clientes));

    alert('Cliente Eliminado Correctamente')

    //IMPRIMIMOS NUEVAMENTE LA TABLA CON EL CLIENTE YA ELIMINADO
    imprimirTabla(clientes);
}

//FUNCION PARA BUSCAR CLIENTE ******************************* 

function buscarClientes(){
    //VAMOS A VERIFICAR QUE EL INPUT NO ESTE VACIO 
    if(inputBuscar.value === ''){
        imprimirTabla(clientes);
    }else {
        //SI NO ESTA VACIO Y SI HAY UN VALOR ENTONCES...
        if(isNaN(inputBuscar.value)) {
            let busqueda = clientes.filter(function(cliente){
                return(
                    cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) || cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase())
                );
            });

            imprimirTabla(busqueda);

        }else {
            let busqueda = clientes.filter(function(cliente){
                return cliente.identificacion.includes(inputBuscar.value);
            });

            imprimirTabla(busqueda);
        }
    }

}

//FUNCION PARA IMPRIMIR TABLA ******************************

function imprimirTabla(datos){

    //LIMPIAR LA TABLA PARA QUE NO SE REPITAN UNA Y OTRA VEZ LOS CLIENTES
    const tabla = document.querySelector('#tabla-clientes');
    tabla.innerHTML = '';

    //AHORA SI IMPRIMIMOS LA TABLA
    datos.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.email}</td>
        <td>${cliente.fechaNacimiento}</td>
        <td>${cliente.nacionalidad}</td>

        <td>
            <div class="d-flex justify-content-center aling-items-center">
                <button class="btn btn-primary me-1" onclick="cargarDatos(${cliente.id})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarCliente(${cliente.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </td>
        </tr>`
    });
}