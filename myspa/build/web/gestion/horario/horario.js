var horarios = [];
function imprimir()
{
    var print = document.getElementById('divTablaHora').innerHTML;
    var contenido = document.body.innerHTML;

    document.body.innerHTML = print;
    window.print();
    document.body.innerHTML = contenido;
}

function guardar() {
    var horas = new Object();
    
    if ($('#txtCodigoH').val().length < 1) 
        horas.id = 0;
    
    else 
    horas.id = parseInt($('#txtCodigoH').val());
    horas.horaInicio = ($('#txtHoraInicio').val());
    horas.horaFin = ($('#txtHoraFinalizacion').val());
  
         $.ajax({
                type  : "POST",
                url   : "api/horario/save",
                data  : {
                            idHorario  : horas.id,
                            horaInicio : horas.horaInicio,
                            horaFin    : horas.horaFin 
                        }
            })
            
    .done(function (data){
        if(data.error != null) {
            Swal.fire('¡¡¡ Alerta !!!', data.error, 'warning');
            
        } else {
                resfrescarTabla();
                Swal.fire('Movimiento realizado', 'La hora se guardo correctamente.', 'success');
                limpiarFormulario();
                
            }
        });
}

function eliminar()
{
//Declaramos la variable para obtener el ID del producto a eliminar
    var id = 0;

    if ($('#txtCodigoH').val().length > 0) {
        id = parseInt($('#txtCodigoH').val());
    
        $.ajax({
                    type  : "POST",
                    url   : "api/horario/delete",
                    data  : {
                                idHorario : id
                            }
                })

        .done(function (data){
            //Revisamos si se llegó a producir algún error:
            if(data.error != null) {
                Swal.fire('Error', data.error, 'warning');

            } else {
                resfrescarTabla();
                Swal.fire('Horario eliminado', data.result, 'success');
                limpiarFormulario();
                
            }
        });
        
    } else {
        Swal.fire('¡¡¡ Alerta !!!', '¡No se ha seleccionado ningún registro de Horario para eliminarlo!', 'warning');
    }
}

function resfrescarTabla() {

//Esta variable contendra el contenido HTML de la tabla
    var contenido = '';
    $.ajax({
        type: "GET",
        url: "api/horario/getAll"
    })

            .done(function (data) {
                //Revisamos si hubo algun error:
                if (data.error != null)
                {
                    Swal.fire('Error', data.error, 'warning');
                } else {
                    horarios = data;
                    //Recorremos el arreglo JSON de productos
                    for (var i = 0; i < data.length; i++) {
                        contenido = contenido + '<tr>' +
                                '<td>' + horarios[i].id + '</td>' +
                                '<td>' + horarios[i].horaInicio + '</td>' +
                                '<td>' + horarios[i].horaFin + '</td>' +
                                '<td><a href="#" onclick="mostrarDetalle(' + horarios[i].id + ');"><i class="fa fa-eye"></i> </a>' + '</td>' +
                                '</tr>';
                    }
                    //Insertamos el contenido de la tabla dentro de su cuerpo
                    $('#tbodyHorario').html(contenido);
                }
            });
        }
    function buscarPosicionHorarioPorID(id)
    {
        //Recorremos el arreglo posicion por posicion
        for (var i = 0; i < horarios.length; i++) {
            //Comparamos si el ID del producto en la posicion actual es el mismo que el buscado
            if (horarios[i].id === id)
            {
                //Devolvemos la posicion del producto
                return i;
            }
        }
        return -1;
    }

    function mostrarDetalle(idHorario) {
        //Buscamos la posicion del Horario
        var pos = buscarPosicionHorarioPorID(idHorario);
        //Llenamos los campos del formulario
        $('#txtCodigoH').val(horarios[pos].id);
        $('#txtHoraInicio').val(horarios[pos].horaInicio);
        $('#txtHoraFinalizacion').val(horarios[pos].horaFin);
        
        setDetalleHoraVisible(true);

    }
    function limpiarFormulario()
    {
        $('#txtCodigoH').val('');
        $('#txtHoraInicio').val('');
        $('#txtHoraFinalizacion').val('');
    }
  function inicializarModulo() {

    //Codigo para implementar el filtro en la tabla
    $("#txtBuscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbodyHorario tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    setDetalleHoraVisible(false);
    refrescarTabla();
}
    /*
     * Esta funcion nos sirve para ocultar y mostrar el area
     * que contiene el detalle producto.
     * 
     * Si el valor es true, mostramos el area del detalle del producto.
     * Si el valor es false, ocultamos el area del detalle del producto
     */
    function  setDetalleHoraVisible(valor) {
        if (valor) {
            $('#divTablaHora').removeClass("col-12");
            $('#divTablaHora').addClass("col-7");
            $('#divDetalleHora').show();
        } else
        {
            $('#divTablaHora').removeClass("col-7");
            $('#divTablaHora').addClass("col-12");
            $('#divDetalleHora').hide();
        }
    }


