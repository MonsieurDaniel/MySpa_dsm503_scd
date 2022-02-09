/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.systemComunity.myspa.rest;

import com.google.gson.Gson;
import com.systemComunity.myspa.controller.ControllerSala;
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
 * @author pau_d
 */
@Path("sala")
public class RESTSala {
    


    @Path("save")
    @POST//Metodos pos no utilizamos @QueryParam utilizamos @FormParam. No se puede buscar en la URL
    @Produces(MediaType.APPLICATION_JSON)// Especificamos el tipo de respuesta
    public Response save(@FormParam("idSala") @DefaultValue("0") int id,
            @FormParam("nombre") @DefaultValue("") String nombre,
            @FormParam("descripcion") @DefaultValue("") String descripcion,
            @FormParam("foto") @DefaultValue("") String foto,
            @FormParam("rutaFoto") @DefaultValue("") String rutaFoto,
            @FormParam("idSucursal") @DefaultValue("0") int idSucursal
    )//Insertar o Actualizar un registro de sucursal
    {
        String out = null;
        ControllerSala cs = new ControllerSala();
        Sala salas = new Sala();//Creamos un objeto de tipo sucursal
        try {
            //Llenamos las propiedades del objeto sucursal:
            salas.setId(id);
            salas.setNombre(nombre);
            salas.setDescripcion(descripcion);
            salas.setFoto(foto);
            salas.setRutaFoto(rutaFoto);
            salas.setIdSucursal(idSucursal);
            

            //Evaluamos si hacemos un INSERT o un UPDATE con base en
            //con base en el ID de la sucursal
            if (salas.getId() == 0) {
                cs.insert(salas);
            } else {
                cs.update(salas);
            }

            //Devolvemos como respuesta TODOS los datos de la sucursal
            out = new Gson().toJson(salas);
        } catch (Exception e) {
            //Imprimir el error en la consola del servidor:
            e.printStackTrace();

            //Devolvemos una descripcion del Error
             out = "{\"error\":\"¡No se ha seleccionado ningún registro de sala!.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();

    }

    @Path("getAll")// Especificamos la ruta del metodo
    @GET            // Especificamos el tipo de peticion
    @Produces(MediaType.APPLICATION_JSON)// Especificamos el tipo de respuesta
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        ControllerSala cs = new ControllerSala();
        List<Sala> salas = null;
        String out = null;
        try {
            salas = cs.getAll(filtro);
            out = new Gson().toJson(salas);

        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"" + e.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("getAllBySucursal")// Especificamos la ruta del metodo
    @GET            // Especificamos el tipo de peticion
    @Produces(MediaType.APPLICATION_JSON)// Especificamos el tipo de respuesta
    public Response getAllBySucursal(@QueryParam("filtro") @DefaultValue("") String filtro,
            @QueryParam("idSucursal") @DefaultValue("0") int idSucursal) {
        ControllerSala cs = new ControllerSala();
        List<Sala> salas = null;
        String out = null;
        try {
            salas = cs.getAllBySucursal(filtro,idSucursal);
            out = new Gson().toJson(salas);

        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"Algo salio mal. Intenta nuevamente o llama al administrador de sistemas\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idSala") @DefaultValue("0") int id) {
        String out = null;
        ControllerSala cs = new ControllerSala();

        try {
            cs.delete(id);
            out = "{\"result\":\"Movimiento realizado. Se ha elimido con exito.\"}";
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"Algo salio mal. Intente nuevamente o llame al administrador de sistemas.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
