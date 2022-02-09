
package com.systemComunity.myspa.rest;


import com.google.gson.Gson;
import com.systemComunity.myspa.controller.ControllerHorario;
import com.systemComunity.myspa.model.Horario;

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

@Path("horario")
public class RESTHorario {
    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) throws Exception {
        ControllerHorario ch = new ControllerHorario();
        List<Horario> horarios = null;
        String out = null;
        try {
            horarios = ch.getAll(filtro);
            out = new Gson().toJson(horarios);
     }
     catch (Exception e)
             {
             e.printStackTrace();
             out = "{\"error\":\""+ e.toString() + "\"}";
             }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("idHorario") @DefaultValue("0") int id,
                         @FormParam("horaInicio") @DefaultValue("") String horaInicio,
                         @FormParam("horaFin") @DefaultValue("") String horaFin) {
        
     
        ControllerHorario cp = new ControllerHorario();
        String out = null;
        Horario hora = new Horario();
        
        try {
       
            hora.setId(id);
            hora.setHoraInicio(horaInicio);
            hora.setHoraFin(horaFin);
           
            if (hora.getId() == 0) {
                cp.insert(hora);
                
            } 
            else
                cp.update(hora);
            
            
            out = new Gson().toJson(hora);
            
        } 
        catch (Exception e) {
            // Imprimimos el Error en la consola del servidor:
            e.printStackTrace();
            out = "{\"error\":\"¡No se ha seleccionado ningún registro de horario!.\"}";
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idHorario") @DefaultValue("0") int id) throws Exception {
        
   
        ControllerHorario cp = new ControllerHorario();
        String out = null;
        
        try {      
            if (id >= 1) {
                // Mandamos el parámetro de ID al método de DELETE:
                cp.delete(id);

                // Devolvemos como respuesta un result de que el registro se ha eliminado correctamente:
              out = "{\"result\":\"Movimiento realizado. Se elimino de manera correcta el registro.\"}";
            }
            else{ 
            //Devolvemos una descripcion del Error:
            out = "{\"error\":\"Algo salió mal. Intenta nuevamente.\"}";
            }
            
        } catch (Exception e) {
            // Imprimimos el Error en la consola del servidor:
            e.printStackTrace();
            
            //Devolvemos una descripcion del Error:
            out = "{\"error\":\"Algo salió mal. Intenta nuevamente.\"}";
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
}