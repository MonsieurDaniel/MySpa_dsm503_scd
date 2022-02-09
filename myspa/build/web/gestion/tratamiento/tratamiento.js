var tratamientos = [
    {id: 1,
        nombre:"Baño de lodo",
        descripcion: "Lodo que revitalizador que...",
        estatus:1 
        },
    {id: 2,
        nombre:"Exfoliante facial",
        descripcion: "Mascarilla facil que elimina poros...",
        estatus:1 
        },
    {id: 3,
       nombre:"Masaje deportivo",
       descripcion: "Es un masaje que se realiza ...",
       estatus:1 
        }
];

function guardar() {
    var pos = -1;
    //Generamos un nuevo objeto 
    var tratamiento = new Object();
    //Definimos sus propiedades y sus valores:
    tratamiento.id = parseInt($('#txtCodigoT').val());
    tratamiento.nombre = $('#txtNombreT').val();
    tratamiento.descripcion = $('#txtDescripcionT').val();
    tratamiento.estatus = 1;
    //Buscamos la posicion del tratamiento con base en su ID para saber
    //si ya existe previamente
    pos = buscarPosicionTratamientoPorID(tratamiento.id);
    if (pos === -1)
    {
        //Lo insertamos dentro del arreglo
        tratamientos.push(tratamiento);
    } else
    {
        //Reemplazamos el tratamiento en la posicion que encontramos
        tratamientos[pos] = tratamiento;
    }
    //Mostramos un mensaje al usuario;
    Swal.fire('Movimiento realizado',
            'Tratamiento agregado correctamente',
            'success');
    //Refrescamos la tabla productos:
    resfrescarTabla();
}

function eliminar() 
{
//Obtenemos el ID del  Horario a eliminar
var idTratamiento= parseInt($('#txtCodigoT').val());
//Buscamos la posicion del tratamiento
var pos = buscarPosicionTratamientoPorID(idTratamiento);
//Verificamos si es una posicion valida
if(pos >= 0){
    //Quitamos el elemento del arreglo
    tratamientos.splice(pos,1);
    //Limpiamos el formulario
    limpiarFormulario();
    //Notificamos al usuario
    Swal.fire('','Tratamiento eliminado correctamente.','success');
    //Refrescamos la tabla productos
    resfrescarTabla();
}
else{
    Swal.fire('Atencion','No se encontró el tratamiento seleccionado','warning')
}
}

function resfrescarTabla() {

    //Esta variable contendra el contenido HTML de la tabla
    var contenido = '';
    //Recorremos el arreglo JSON de productos
    for (var i = 0; i < tratamientos.length; i++) {
        contenido = contenido + '<tr>' +
                '<td>' + tratamientos[i].id + '</td>' +
                '<td>' + tratamientos[i].nombre + '</td>' +
                '<td>' + tratamientos[i].descripcion + '</td>' +
                '<td>' + tratamientos[i].estatus + '</td>' +
                '<td><a href="#" onclick="mostrarDetalle('+ tratamientos[i].id +');"><i class="fa fa-eye"></i> </a>' +'</td>'+
                '</tr>';
    }
    //Insertamos el contenido de la tabla dentro de su cuerpo
    $('#tbodyTratamiento').html(contenido);
}
/*
 * Esta funcion sirve para  buscar la posicion de un producto 
 * dentro del arrreglo de productos, con base en un ID especificado
 * 
 * El metodo devolvera la posicion donde se encuentra el objeto con el ID 
 * coincidente. En caso de que no se encuentre un producto
 * con el ID especificado, la funcion devolvera el valor -1
 */
function buscarPosicionTratamientoPorID(id)
{
    //Recorremos el arreglo posicion por posicion
    for (var i = 0; i < tratamientos.length; i++) {
        //Comparamos si el ID del tratamiento en la posicion actual es el mismo que el buscado
        if (tratamientos[i].id === id)
        {
            //Devolvemos la posicion del producto
            return i;
        }
    }
    /*
     * Si llegamos a este punto significa que no encontramos un
     * tratamiento con el ID especificado, en cuyo caso devolvemos 
     * el valor -1:
     */
    return -1;
}

function mostrarDetalle(idTratamiento){
    //Buscamos la posicion del Horario
    var pos = buscarPosicionTratamientoPorID(idTratamiento);
    //Llenamos los campos del formulario
    $('#txtCodigoT').val(tratamientos[pos].id);
    $('#txtNombreT').val(tratamientos[pos].nombre);
    $('#txtDescripcionT').val(tratamientos[pos].descripcion);
    
     setDetalleTratamientoVisible(true);
}
function limpiarFormulario() 
{
    $('#txtCodigoT').val('');
    $('#txtNombreT').val('');
    $('#txtDescripcionT').val('');
}
function inicializarModulo(){
    
    //Codigo para implementar el filtro en la tabla
  $("#txtBuscar").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tbodyTratamiento tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

    setDetalleTratamientoVisible(false);
    refrescarTabla();
}
/*
 * Esta funcion nos sirve para ocultar y mostrar el area
 * que contiene el detalle producto.
 * 
 * Si el valor es true, mostramos el area del detalle del producto.
 * Si el valor es false, ocultamos el area del detalle del producto
 */
function  setDetalleTratamientoVisible(valor){
if (valor){
    $('#divTablaTratamiento').removeClass("col-12");
    $('#divTablaTratamiento').addClass("col-7");
    $('#divDetalleTratamiento').show();
}    
else
{
    $('#divTablaTratamiento').removeClass("col-7");
    $('#divTablaTratamiento').addClass("col-12");
    $('#divDetalleTratamiento').hide();
}
}




