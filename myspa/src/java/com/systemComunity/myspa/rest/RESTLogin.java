
package com.systemComunity.myspa.rest;

import com.google.gson.Gson;
import com.systemComunity.myspa.controller.ControllerLogin;
import com.systemComunity.myspa.model.Empleado;
import com.systemComunity.myspa.model.Usuario;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("login")
public class RESTLogin {
    
    @Path("validate")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@FormParam("nombreUsuario") String nombreUsuario, 
                          @FormParam("contrasenia") String contrasenia){
        String out = null;
        ControllerLogin cl = new ControllerLogin();
        Empleado em = null;
        try {
            em= cl.login(nombreUsuario, contrasenia);
            
            //Revisamos que tengamos una instancia de tipo empleado:
            if (em != null) {
                out= new Gson().toJson(em);
            }
            else{
                 out = "{\"error\":\"Datos de acceso incorectos. Intenta nuevamente o llama al Administrador\"}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"Ocurrió un error inesperado. Intenta nuevamente o llama al Administrador\"}";
        }
         return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("out")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response out(@FormParam("idU") @DefaultValue("0") String idU)
    {
    String out = "";
    try
    {
    Usuario objU = new Usuario();
    objU.setId(Integer.parseInt(idU));
    ControllerLogin objCL = new ControllerLogin();
    objCL.deleteToken(objU);

    out = "{\"result\":\"Ok\"}";
    }
    catch (Exception ex)
    {
    ex.printStackTrace();
    out = "{\"error\":\"Se generó un error en el cierre de sesión\"}";
    }
    return Response.status(Response.Status.OK).entity(out).build();
}
    @Path("validate2")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response login2(@QueryParam("nombreUsuario") @DefaultValue("") String nombreUsuario, 
                           @QueryParam("contrasenia") @DefaultValue("") String contrasenia){
        String out = null;
        ControllerLogin cl = new ControllerLogin();
        Empleado em = null;
        
        try {
            em.getUsuario().setNombreUsuario(nombreUsuario);
            em.getUsuario().setContrasenia(contrasenia);
            
              cl.login2(em.getUsuario());
          
             out= new Gson().toJson(em);
           
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"Ocurrió un error inesperado. Intenta nuevamente o llama al Administrador\"}";
        }
         return Response.status(Response.Status.OK).entity(out).build();
    }
}
