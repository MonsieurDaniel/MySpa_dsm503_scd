var reservaciones = [
    {
        id: 1,
        idCliente: 2,
        salaReservacion: 3,
        fecha: "29/12/2021",
        estatus: "P"
    },
    {
        id: 2,
        idCliente: 3,
        salaReservacion: 1,
        fecha: "24/10/2021",
        estatus: "A"
    },
    {
        id: 3,
        idCliente: 1,
        salaReservacion: 2,
        fecha: "20/9/2021",
        estatus: "C"
    }
];

function inicializarModulo() {

    //Codigo para implementar el filtro en la tabla
    $("#txtBuscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbodyReservacion tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    setDetalleReservacionVisible(false);
    refrescarTabla();
}
function  setDetalleReservacionVisible(valor)
{
    if (valor) {
        $('#divTablaReservacion').show();
    } else
    {
        $('#divTablaReservacion').hide();
    }
}

function guardar() {

    var pos = -1;

    //Generamos un nuevo objeto 
    var reservacion = new Object();

    //Definimos sus propiedades y sus valores:
    reservacion.id = parseInt($('#txtCodigo').val());
    reservacion.idCliente = parseInt($('#txtCodigoCliente').val());
    reservacion.salaReservacion = $('#txtSalaReservada').val();
    reservacion.fecha = $('#fecha').val();
    if ($('#rbtnPendiente').prop('checked'))
    {
        reservacion.estatus = "P";
    } else if ($('#rbtnAtendida').prop('checked'))
    {
        reservacion.estatus = "A";
    } else {
        reservacion.estatus = "C";
    }

//Buscamos la posicion del producto con base en su ID para saber
//si ya existe previamente
    pos = buscarReservacionPorID(reservacion.id);
    if (pos === -1)
    {
        //Lo insertamos dentro del arreglo
        reservaciones.push(reservacion);
    } else
    {
        //Reemplazamos el producto en la posicion que encontramos
        reservaciones[pos] = reservacion;
    }
//Mostramos un mensaje al usuario;
    Swal.fire('Movimiento realizado', 'Reservación agregada correctamente.', 'success');

//Refrescamos la tabla productos:
    resfrescarTabla();
}
function eliminar()
{
    //Obtenemos el ID del producto a eliminar
    var idReservacion = parseInt($('#txtCodigo').val());

    //Buscamos la posicion del producto
    var pos = buscarReservacionPorID(idReservacion);

    //Verificamos si es una posicion valida
    if (pos >= 0)
    {
        //Quitamos el elemento del arreglo
        reservaciones.splice(pos, 1);
        //Limpiamos el formulario
        limpiarFormulario();
        //Notificamos al usuario
        Swal.fire('', 'Reservación eliminada correctamente.', 'success');
        //Refrescamos la tabla productos
        resfrescarTabla();
    } else {
        Swal.fire('Atencion', 'No se encontró la reservacion seleccionado', 'warning')
    }
}
function resfrescarTabla() {

    //Esta variable contendra el contenido HTML de la tabla
    var contenido = '';
    //Recorremos el arreglo JSON de productos
    for (var i = 0; i < reservaciones.length; i++) {
        contenido = contenido + '<tr>' +
                '<td>' + reservaciones[i].id + '</td>' +
                '<td>' + reservaciones[i].idCliente + '</td>' +
                '<td>' + reservaciones[i].salaReservacion + '</td>' +
                '<td>' + reservaciones[i].fecha + '</td>' +
                '<td>' + reservaciones[i].estatus + '</td>' +
                '<td><a href="#" onclick="mostrarDetalle(' + reservaciones[i].id + ');"><i class="fa fa-eye"></i> </a>' + '</td>' +
                '</tr>';
    }
    //Insertamos el contenido de la tabla dentro de su cuerpo
    $('#tbodyReservacion').html(contenido);
}
function buscarReservacionPorID(id)
{

    for (var i = 0; i < reservaciones.length; i++)
    {
        if (reservaciones[i].id === id)
        {
            return i;
        }
    }
    return -1;
}
function mostrarDetalle(idReservacion)
{
    //Buscamos la posicion del producto
    var pos = buscarReservacionPorID(idReservacion);

    //Llenamos los campos del formulario
    $('#txtCodigo').val(reservaciones[pos].id);
    $('#txtCodigoCliente').val(reservaciones[pos].idCliente);
    $('#txtSalaReservada').val(reservaciones[pos].salaReservacion);
    $('#fecha').val(reservaciones[pos].fecha);
    if (reservaciones[pos].estatus === "P")
    {
        $('#rbtnPendiente').prop('checked', true);
        $('#rbtnAtendida').prop('checked', false);
        $('#rbtnCancelada').prop('checked', false);
    } else if (reservaciones[pos].estatus === "A") 
    {
        $('#rbtnPendiente').prop('checked', false);
        $('#rbtnAtendida').prop('checked', true);
        $('#rbtnCancelada').prop('checked', false);
    } else
    {
        $('#rbtnPendiente').prop('checked', false);
        $('#rbtnAtendida').prop('checked', false);
        $('#rbtnCancelada').prop('checked', true);
    }

    setDetalleReservacionVisible(true);
}
function limpiarFormulario()
{
    $('#txtCodigo').val('');
    $('#txtCodigoCliente').val('');
    $('#txtSalaReservada').val('');
    $('#fecha').val('');
    $('#rbtnPendiente').prop('checked', false);
    $('#rbtnAtendida').prop('checked', false);
    $('#rbtnCancelada').prop('checked', false);
}