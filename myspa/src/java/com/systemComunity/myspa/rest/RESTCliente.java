
package com.systemComunity.myspa.rest;

import com.google.gson.Gson;
import com.systemComunity.myspa.controller.ControllerCliente;
import com.systemComunity.myspa.model.Cliente;
import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("cliente")
public class RESTCliente {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("cliente") @DefaultValue("{}") String jsonCliente) {
        String out = null;
        ControllerCliente cc = new ControllerCliente();
        Cliente cliente = null;
        try {
            if (jsonCliente == null || jsonCliente.equals("{}")) {
                out = "{\"error\":\"No se recibieron datos del Cliente para guardar.\"}";
            } else {
                cliente = new Gson().fromJson(jsonCliente, Cliente.class);
                if(cliente.getFoto() == null) cliente.setFoto("");
                if(cliente.getRutaFoto() == null) cliente.setRutaFoto("");
                if (cliente.getId() == 0) {
                    cc.insert(cliente);
                } else {
                    cc.update(cliente);
                }
                out = new Gson().toJson(cliente);
            }
        } catch (Exception e) {
            e.printStackTrace();
            //Devolvemos una descripcion del Error:
            out = "{\"error\":\"¡No se ha seleccionado ningún registro de cliente!.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerCliente cc = new ControllerCliente();
        List<Cliente> clientes = null;
        Gson gson = new Gson();

        try {
            clientes = cc.getAll(filtro);
            out = gson.toJson(clientes);

        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"Ocurrió un error inesperado. Intenta nuevamente o llama al Administrador\"}";

        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete (@FormParam("id") @DefaultValue("0") int idCliente)
    {
     String out = null;
     ControllerCliente ce = new ControllerCliente();
     try
     {
       ce.delete(idCliente);
       out = "{\"result\":\"Movimiento realizado. Se elimino de manera correcta el registro.\"}";
     } 
     catch(Exception e){
      e.printStackTrace();
      out = "{\"error\":\"Ocurrió un error inesperado. Intenta nuevamente o llama al Administrador\"}";
    
     }
     return Response.status(Response.Status.OK).entity(out).build();
     
 }
    @Path("delete2")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete2 (@QueryParam("idCliente") @DefaultValue("0") int idCliente)
    {
     String out = null;
     ControllerCliente ce = new ControllerCliente();
     try
     {
       ce.delete(idCliente);
       out = "{\"result\":\"Movimiento realizado. Se elimino de manera correcta el registro.\"}";
     } 
     catch(Exception e){
      e.printStackTrace();
      out = "{\"error\":\"Ocurrió un error inesperado. Intenta nuevamente o llama al Administrador\"}";
    
     }
     return Response.status(Response.Status.OK).entity(out).build();
     
 }
}
