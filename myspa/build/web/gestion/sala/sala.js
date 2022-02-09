var salas = [];
var sucursales=[];


function inicializarModulo() {
    setDetalleSalaVisible(false);
    consultarSucursales();
    
    //Agregamos un oyente que se dispara cuando seleccionamos una sucursal
    //desde el combobox de sucursales:
    $('#cmbSucursales').on('change',function(){
        
        refrescarTabla();
    });
}


/*
 * Esta función nos sirve para mostrar y ocultar el área que contiene 
 * el detalle de un producto.
 * 
 * Si el valor es true, mostramos el area del detalle del producto.
 * Si el valor es false, ocultamos el area del detalle del producto.
 */
function setDetalleSalaVisible(valor)
{
    if (valor)
    {
        $('#divTablaSala').removeClass("col-12");
        $('#divTablaSala').addClass("col-7");
        $('#divDetalleSala').show();
    } else
    {
        $('#divTablaSala').removeClass("col-7");
        $('#divTablaSala').addClass("col-12");
        $('#divDetalleSala').hide();
    }
}
function guardar() {    
     // Generamos un nuevo Objeto
    var sala = new Object();

    // Definimos sus propiedades y sus valores
    sala.id = 0;
    sala.nombre = $('#txtNombre').val();
    sala.descripcion= $('#txtDescripcion').val();
    sala.foto = $('#txtCodigoImagen').val();
    sala.rutaFoto =$('#txtCodigoImagen').val();
    sala.estatus = 1;
    sala.idSucursal=$('#txtidSucursal').val();
    //Revisamos sin hay un ID previsto:
    if ($('#txtCodigoSala').val().length > 0)//Mayor 
    {
        sala.id = parseInt($('#txtCodigoSala').val());
    }
    $.ajax({
        type: "POST",
        url: "api/sala/save",
        data: {
            idSala: sala.id,
            nombre: sala.nombre,
            descripcion: sala.descripcion,
            foto: sala.foto,
            rutaFoto: sala.rutaFoto,
            idSucursal: sala.idSucursal
        }

    }).done(function (data) {
        //Revisamos si hubo algun error
        if (data.error != null)
        {
            Swal.fire('¡¡¡ Alerta !!!', data.error, 'warning');
        } else
        {
            refrescarTabla();
            sala = data;
            $('#txtCodigoSala').val(sala.id);
            Swal.fire('Movimiento realizado', 'Datos de sala guardados correctemente', 'success');
        }

    });
}


function eliminar() {
    // Obtenemos el ID de la sucursal a eliminar:
    var id = parseInt($('#txtCodigoSala').val());

    // Buscamos la posición de la sucursal:
    var pos = buscarPosicionSalaPorID(id);
    $.ajax({
        type: "POST",
        url: "api/sala/delete",
        data: {
            idSala: id
        }

    }).done(function (data) {
        //Revisamos si hubo algun error
        if (data.error != null)
        {
            Swal.fire('¡¡¡ Alerta !!!',data.error, 'warning');
        } else
        {
            limpiarFormulario();
            refrescarTabla();
            sala = data;
            $('#txtCodigoSala').val(id);
            Swal.fire('Eliminación realizada correctamente', 'Sala eliminada correctamente.', 'warning');
        }

    });
}


function refrescarTabla() {
    var idSucursal=$('#cmbSucursales').val();
    // Esta variable contendrá el contenido HTML de la tabla
    var contenido = '';

    //Hacemos la peticion al servicio REST que nos consulta las sucursales:
    $.ajax({
        type: "GET",
        url: "api/sala/getAllBySucursal",
        data:{idSucursal: idSucursal}
    })
            .done(function (data) {
                //Revisamos si susedio algun error
                if (data.error != null)
                {
                    Swal.fire('Error', data.error, 'warning');
                } else
                {
                    salas = data;
                    //Recorreremos el arreglo de productos posicion posicion:
                    for (var i = 0; i < data.length; i++) {
                        //Agregamos un nuevo renglon a la tabla contenido
                        //sus respectivas columnas y valores:
                        contenido = contenido + '<tr>' +
                                '<td>' + salas[i].id + '</td>' +
                                '<td>' + salas[i].nombre + '</td>' +
                                '<td >' + salas[i].descripcion + '</td>' +
                                '<td >' + salas[i].estatus + '</td>' +
                                '<td><a href="#" onclick="mostrarDetalleSala(' + salas[i].id + ');"><i class="text-info fas fa-eye"></i></a>' + '</td>' +
                                '</tr>';
                    }
                    // Insertamos el contenido de la tabla dentro de su cuerpo de la tabla
                    $('#tbodySalas').html(contenido);
                }
            });
}


function mostrarDetalleSala(idSala) {
    // Buscamos la posición del empleado:
    var pos = buscarPosicionSalaPorID(idSala);
    
    // Llenamos los campos del formulario:
    $('#txtCodigoSala').val(salas[pos].id);
    $('#txtNombre').val(salas[pos].nombre);
    $('#txtDescripcion').val(salas[pos].descripcion);
    $('#txtidSucursal').val(salas[pos].idSucursal);
    $('#txtCodigoImagen').val(salas[pos].rutaFoto);
    $('#imgSalaFoto').prop('src','data:image/png;base64,' + salas[pos].foto);
    setDetalleSalaVisible(true);
}


// Esta función sirve para buscar la posición de un cliente dentro del arreglo de empleados, con base en un ID especificado.
// El método devolverá la posición donde se encuentra el objeto con el ID coincidente. En caso de que no se encuentre un
// empleado con el ID especificado, la función devolverá el valor -1.

function buscarPosicionSalaPorID(id) {
    // Recorremos el arreglo posición por posición:
    for(var i = 0; i < salas.length; i++) {
        
        // Comparamos si el ID del empleado en la posición actual es el mismo que el buscado:
        if(salas[i].id === id) {
            return i;
        }
    }
    // Si llegamos a este punto significa que no encontramos un empleado con el ID especificado, 
    // en cuyo caso devolvemos el valor -1:
    return -1;
}

function imprimir() {
    var print = document.getElementById('divTablaSala').innerHTML;
    var contenido = document.body.innerHTML;

    document.body.innerHTML = print;
    window.print();
    document.body.innerHTML = contenido;
}


function limpiarFormulario() {
    $('#txtCodigoSala').val('');
     $('#txtidSucursal').val('');
    $('#txtNombre').val('');
    $('#txtDescripcion').val('');
    $('#imgSalaFoto').prop('src','media/img/salas/S_001.png');
     $('#txtCodigoImagen').val('');
     var inputFile = document.getElementById('inputFileFoto');
       inputFile.value='';
}



function consultarSucursales(){
     // Esta variable contendrá el contenido HTML de la tabla
    var data = {"estatus":1, "t":sessionStorage.getItem("token")};
    //Hacemos la peticion al servicio REST que nos consulta las sucursales:
    $.ajax({
        type: "GET",
        url: "api/sucursal/getAll",
        async: true,
        data: data

    })
            .done(function (data) {
                //Revisamos si susedio algun error
                if (data.error != null)
                {
                    Swal.fire('Error', data.error, 'warning');
                } else
                {
                    var contenido = '';
                    sucursales = data;
                    //Recorreremos el arreglo de productos posicion posicion:
                    for (var i = 0; i < data.length; i++) {
                        //Agregamos un nuevo renglon a la tabla contenido
                        //sus respectivas columnas y valores:
                        contenido = contenido + 
                                '<option value="'+sucursales[i].id+'">'+
                                sucursales[i].nombre+
                                '</option>';
                    }
                    // Insertamos el contenido de la tabla dentro de su cuerpo de la tabla
                    $('#cmbSucursales').html(contenido);
                }
            });
    
}
function cargarFotografia(){
    //Recuperamos el input de tipo File donde se selecciona la foto
    var inputFile = document.getElementById('inputFileFoto');
    //Revisamos que el usuario haya seleccionado un archivo:
    if (inputFile.files && inputFile.files[0]) {
        //Creamos el objeto que leerá la imagen
        var reader = new FileReader();
        //Agregamos un oyente al lector del archivo para que en cuanto el usuario cargue la imagen,
        //esta se lea y se convierta de forma automatica en una cadena de Base64:
        reader.onload = function (e){
            var fotoB64 = e.target.result;
            $("#imgSalaFoto").attr("src",fotoB64);
            $("#txtCodigoImagen").val(fotoB64.substring(22,fotoB64.length));
        };
        
        //Leemos el archivo que selecciono el usuario y lo convertimos en una cadena con la Base64
        reader.readAsDataURL(inputFile.files[0]);
    }
}




