
package com.systemComunity.myspa.rest;

import com.google.gson.Gson;
import com.systemComunity.myspa.controller.ControllerServicio;
import com.systemComunity.myspa.model.Servicio;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author DanielAbrahamSanchez
 */
@Path("servicio")
public class RESTServicio {
    @Path("insert")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insert(@FormParam("s") String s) throws Exception {
       
        String out = null;
        try {
            Gson objGS = new Gson();
            Servicio objS = objGS.fromJson(s, Servicio.class);
           
            ControllerServicio objCS = new ControllerServicio();
            int r = objCS.insert(objS);
            
            out = "{\"result\":\"Servicio"+r+ "generado con exito\"}";
     }
     catch (Exception e)
             {
             e.printStackTrace();
             out = "{\"exception\":\"Se produjo al insertar el servicio😣😫😫 \"}";
             }
        return Response.status(Response.Status.OK).entity(out).build();
}
}
