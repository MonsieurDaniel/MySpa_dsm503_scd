package com.systemComunity.myspa.rest;

import com.google.gson.Gson;
import com.systemComunity.myspa.controller.ControllerLogin;
import com.systemComunity.myspa.controller.ControllerReservacion;
import com.systemComunity.myspa.model.Cliente;
import com.systemComunity.myspa.model.Horario;
import com.systemComunity.myspa.model.Reservacion;
import com.systemComunity.myspa.model.Sala;
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

/**
 *
 * @author DanielAbrahamSanchez
 */
@Path("reservacion")
public class RESTReservacion {

    @Path("getHourAv")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getHourAv(@QueryParam("fecha") String fecha,
                             @QueryParam("idSala") int sala,
                             @QueryParam("t") String t) {
        ControllerLogin objCL = new ControllerLogin();
        ControllerReservacion objCR = new ControllerReservacion();
        String out = "";
        List<Horario> horarios = null;
        try {
            if (!t.equals("") && objCL.validateToken(t)) 
               
            {   if(sala != 0 ){
                 
                horarios = objCR.getHourAv(fecha, sala);
                out = new Gson().toJson(horarios);
            }else{
                 out = "{\"error\":\"No se ha seleccionado una sala\"}";
            }
            } 
        } catch (Exception ex) {
            ex.printStackTrace();
            out = "{\"error\":\"Se produjo un error al cargar las horas disponibles\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("insert")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response insert(
            @QueryParam("fecha") String fecha,
            @QueryParam("estatus") String estatus,
            @QueryParam("horario") String horario,
            @QueryParam("cliente") String cliente,
            @QueryParam("sala") String sala,
            @QueryParam("t") String t) 
    {
        ControllerLogin objCL = new ControllerLogin();
        String out = "";
        
        try {
            if (!t.equals("") && objCL.validateToken(t)) 
            {
               Cliente objC = new Cliente();
               objC.setId(Integer.parseInt(cliente));
               
               Sala objS = new Sala();
               objS.setId(Integer.parseInt(sala));
               
               Horario objH = new Horario();
               objH.setId(Integer.parseInt(horario));
               
               Reservacion objR = new Reservacion();
               objR.setFecha(fecha);
               objR.setEstatus(Integer.parseInt(estatus));
               objR.setHorario(objH);
               objR.setCliente(objC);
               objR.setSala(objS);
               
               ControllerReservacion objCR = new ControllerReservacion();
               objCR.insert(objR);
              out = "{\"result\":\"Reservacion Almacenada con éxito\"}";  
            }
            else{
                 out = "{\"error\":\"Acceso denagado al API\"}";  
            }
        }
        catch(Exception ex){
            ex.printStackTrace();
              out = "{\"exception\":\"Se produjo un error al insertar la reservacion\"}";

        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) throws Exception {
        ControllerReservacion cr = new ControllerReservacion();
        List<Reservacion> reservacion = null;
        String out = null;
        try {
            reservacion = cr.getAll(filtro);
            out = new Gson().toJson(reservacion);
     }
     catch (Exception e)
             {
             e.printStackTrace();
             out = "{\"error\":\""+ e.toString() + "\"}";
             }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("inactivo")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInactive(@QueryParam("filtro") @DefaultValue("") String filtro) throws Exception {
        ControllerReservacion cr = new ControllerReservacion();
        List<Reservacion> reservacion = null;
        String out = null;
        try {
            reservacion = cr.inactivos(filtro);
            out = new Gson().toJson(reservacion);
     }
     catch (Exception e)
             {
             e.printStackTrace();
             out = "{\"error\":\""+ e.toString() + "\"}";
             }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("atendidos")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAtendt(@QueryParam("filtro") @DefaultValue("") String filtro) throws Exception {
        ControllerReservacion cr = new ControllerReservacion();
        List<Reservacion> reservacion = null;
        String out = null;
        try {
            reservacion = cr.atend(filtro);
            out = new Gson().toJson(reservacion);
     }
     catch (Exception e)
             {
             e.printStackTrace();
             out = "{\"error\":\""+ e.toString() + "\"}";
             }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("delete")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@QueryParam("idReservacion") @DefaultValue("0") int id) throws Exception {
        
        // Creamos un objeto de tipo ControllerProducto:
        ControllerReservacion cr = new ControllerReservacion();
        String out = null;
        
        try {      
            
            if (id >= 1) {
                // Mandamos el parámetro de ID al método de DELETE:
                cr.delete(id);

                // Devolvemos como respuesta un result de que el registro se ha eliminado correctamente:
              out = "{\"result\":\"Movimiento realizado. Se cancelo de manera correcta el registro.\"}";
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
