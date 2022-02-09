var empleado= null;
function cargarModuloProducto()
{
  $.ajax({
      context : document.body,
      url: "gestion/producto/producto.html"
  }).done(function(data){
  //  document.getElementById("contenedorPrincipal").innerHTML=data;
    $("#contenedorPrincipal").html(data);
  }); 
}

function cargarModuloCliente(){
  $.ajax({
      context : document.body,
      url: "gestion/cliente/cliente.html"
  }).done(function(data){
  //  document.getElementById("contenedorPrincipal").innerHTML=data;
    $("#contenedorPrincipal").html(data);
  }); 
    
}
function cargarModuloEmpleado(){
  $.ajax({
      context : document.body,
      url: "gestion/empleado/empleado.html"
  }).done(function(data){
  //  document.getElementById("contenedorPrincipal").innerHTML=data;
    $("#contenedorPrincipal").html(data);
  }); 
}
function cargarModuloHorario(){
     $.ajax({
      context : document.body,
      url: "gestion/horario/horario.html"
  }).done(function(data){
  //  document.getElementById("contenedorPrincipal").innerHTML=data;
    $("#contenedorPrincipal").html(data);
  }); 
}
function cargarModuloReservacion(){
     $.ajax({
      context : document.body,
      url: "gestion/reservacion/reservacion.html"
  }).done(function(data){
  //  document.getElementById("contenedorPrincipal").innerHTML=data;
    $("#contenedorPrincipal").html(data);
  }); 
}
function cargarModuloSala(){
     $.ajax({
      context : document.body,
      url: "gestion/sala/sala.html"
  }).done(function(data){
  //  document.getElementById("contenedorPrincipal").innerHTML=data;
    $("#contenedorPrincipal").html(data);
  }); 
}
function cargarModuloServicio(){
   $.ajax({
      context : document.body,
      url: "gestion/servicio/servicio.html"
  }).done(function(data){
  //  document.getElementById("contenedorPrincipal").innerHTML=data;
    $("#contenedorPrincipal").html(data);
  }); 
}
function cargarModuloSucursal(){
     $.ajax({
      context : document.body,
      url: "gestion/sucursal/sucursal.html"
  }).done(function(data){
  //  document.getElementById("contenedorPrincipal").innerHTML=data;
    $("#contenedorPrincipal").html(data);
  }); 
}
function cargarModuloTratamiento(){
    $.ajax({
      context : document.body,
      url: "gestion/tratamiento/tratamiento.html"
  }).done(function(data){
  //  document.getElementById("contenedorPrincipal").innerHTML=data;
    $("#contenedorPrincipal").html(data);
  }); 
}
function cerrarModulo(){
   $('#contenedorPrincipal').html('');
}
function inicializarPagina(){
    empleado = JSON.parse(sessionStorage.getItem('empleado'));
    $('#spanNombreEmpleado').html(empleado.persona.nombre+' '+empleado.persona.apellidoPaterno);
    $('#spanPuesto').html(empleado.puesto);
    $('#imgEmpleadoFoto2').prop('src','data:image/png;base64,' + empleado.foto);
}
function accederLogin(){
    //Creamos un nuevo objeto
    var usuario = new Object();
    usuario = new Object();

    usuario.nombreUsuario = $('#txtNombreUsuario').val();
    usuario.contrasenia = $('#txtContrasenia').val();

    $.ajax({
        type: "POST",
        async: true,
        url: "api/login/validate",
        data: {
            nombreUsuario: usuario.nombreUsuario,
            contrasenia:usuario.contrasenia
        }
    })
            .done(function (data) {
              //Revisamos si hubo algun error
                if (data.error != null)
                {
                    Swal.fire('Lo sentimos ', data.error, 'warning');
                } 
                else
                {   var nombre = data.persona.nombre+" "+data.persona.apellidoPaterno+
                            " "+data.persona.apellidoMaterno;
                    sessionStorage.setItem("nombre", nombre);
                    sessionStorage.setItem("token", data.usuario.token);
                    sessionStorage.setItem("idUsuario", data.usuario.id);
                    Swal.fire('Bienvenido usuario', 'Datos correctos', 'success');
                    sessionStorage.setItem('empleado',JSON.stringify(data));
                    window.location.replace("main.html");
                }
            });
}

function cerrarSession(){
    var data ={"idU":sessionStorage.getItem("idUsuario")};
    $.ajax({
        url:"api/login/out",
        type:"POST",
        data: data,
        asyn:true
    }).done(function(data)
    {
        if(data.result=!'')
        {
            sessionStorage.clear();
            window.location.replace("index.html");
        }
        else if(data.error=!'')
        {
            Swal.fire("Cierre de sesión fallido", "Vuelve a intentarlo","error");
        }
    })
   
}