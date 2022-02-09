
package com.systemComunity.myspa.controller;

import com.systemComunity.myspa.db.ConexionMySQL;
import com.systemComunity.myspa.model.Empleado;
import com.systemComunity.myspa.model.Persona;
import com.systemComunity.myspa.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class ControllerLogin  {
    public Empleado login(String nombreUsuario, String contrasenia) throws Exception{
         //Consulta todos los registros de empleado en la BD 

        //Definimos la consulta SQL:
        String sql = "SELECT * FROM v_empleados WHERE nombreUsuario=? AND contrasenia=? "
               +"AND estatus = 1 AND (token IS NULL OR TOKEN = '');" ;

        //Una variable temporal para crear nuevas instancias de Empleado:
        Empleado e = null;
        
        //Con este objeto vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con MySQL:
        Connection conn = connMySQL.open();

        //Declaramos e inicializamos el objeto con el que ejecutaremos 
        //la consulta SQL:
        PreparedStatement pstmt = conn.prepareStatement(sql);
        
        pstmt.setString(1, nombreUsuario);
        pstmt.setString(2, contrasenia);
        //Ejecutammos la consulta y guardamos su resultado:
        ResultSet rs = pstmt.executeQuery();

        //Recorremos el ResultSet:
        if(rs.next()) {
         e = fillEmpleado(rs);
         saveToken(e.getUsuario());
        }
        //Cerramos los objetos de BD:
        rs.close();
        pstmt.close();
        connMySQL.close();

        //Devolvemos el empleado que se genero:
        return e;

    }

    /**
     * Crear un objeto de tipo sucursal y llena sus propiedades utilizando los
     * datos proporcionados por un ResultSet.
     *
     * @param rs
     * @return
     */
    private Empleado fillEmpleado(ResultSet rs) throws SQLException {

        //Una variable temporal para crear nuevos objetos de tipo Empleado
        Empleado e = new Empleado();

        //Una variable temporal para crear nuevos objetos de tipo Persona
        Persona p = new Persona();

        //Una variable temporal para crear nuevos objetos de tipo usuario:
        Usuario u = new Usuario();

        //Llenamos sus datos:
        p.setApellidoPaterno(rs.getString("apellidoPaterno"));
        p.setApellidoMaterno(rs.getString("apellidoMaterno"));
        p.setDomicilio(rs.getString("domicilio"));
        p.setId(rs.getInt("idPersona"));
        p.setGenero(rs.getString("genero"));
        p.setNombre(rs.getString("nombre"));
        p.setRfc(rs.getString("rfc"));
        p.setTelefono(rs.getString("telefono"));

        //Creamos un nuevo objeto de tipo Usuario
        u.setContrasenia(rs.getString("contrasenia"));
        u.setId(rs.getInt("idUsuario"));
        u.setNombreUsuario(rs.getString("nombreUsuario"));
        u.setRol(rs.getString("rol"));
        u.setToken();

        //Establecemos sus datos personales
        e.setFoto(rs.getString("foto"));
        e.setId(rs.getInt("idEmpleado"));
        e.setNumeroEmpleado(rs.getString("numeroEmpleado"));
        e.setPuesto(rs.getString("puesto"));
        e.setRutaFoto(rs.getString("rutaFoto"));
        e.setEstatus(rs.getInt("estatus"));

        //Establecemos su persona:
        e.setPersona(p);

        //Establecemos su Usuario:
        e.setUsuario(u);

        return e;
    }
    public void saveToken(Usuario u) throws Exception
    {
        //Generamos la consulta
        String query = "UPDATE usuario SET token = '"+u.getToken()+"' WHERE idUsuario="+u.getId()+";";
        //Con este objeto vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con MySQL:
        Connection conn = connMySQL.open();

        //Declaramos e inicializamos el objeto con el que ejecutaremos 
        //la consulta SQL:
        PreparedStatement pstmt = conn.prepareStatement(query);
        pstmt.execute();
        pstmt.close();
        conn.close();
        connMySQL.close();
        
    }
     public void deleteToken(Usuario u) throws Exception
    {
        //Generamos la consulta
        String query = "UPDATE usuario SET token = '' WHERE idUsuario ="+u.getId()+";";
        //Con este objeto vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con MySQL:
        Connection conn = connMySQL.open();

        //Declaramos e inicializamos el objeto con el que ejecutaremos 
        //la consulta SQL:
        PreparedStatement pstmt = conn.prepareStatement(query);
        pstmt.execute();
        pstmt.close();
        conn.close();
        connMySQL.close();
        
    }
     public boolean validateToken(String token) throws Exception
     {
         boolean valid= false;
         //Generamos la consulta:
         String query = "SELECT * FROM v_empleados WHERE token ='"+token+"';";
         //Con este objeto vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con MySQL:
        Connection conn = connMySQL.open();

        //Declaramos e inicializamos el objeto con el que ejecutaremos 
        //la consulta SQL:
        PreparedStatement pstmt = conn.prepareStatement(query);
        ResultSet rs = pstmt.executeQuery();
        while(rs.next())
        {
            valid=true;
        }
         //Cerramos los objetos de BD:
        rs.close();
        pstmt.close();
        connMySQL.close();
        return valid;
     }
     public Empleado login2(Usuario u) throws Exception{
         //Consulta todos los registros de empleado en la BD 

        //Definimos la consulta SQL:
        String sql = "SELECT * FROM v_empleados WHERE nombreUsuario=? AND contrasenia=? ";

        //Una variable temporal para crear nuevas instancias de Empleado:
        Empleado e = null;
        
        //Con este objeto vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con MySQL:
        Connection conn = connMySQL.open();

        //Declaramos e inicializamos el objeto con el que ejecutaremos 
        //la consulta SQL:
        PreparedStatement pstmt = conn.prepareStatement(sql);
        
        pstmt.setString(1, u.getNombreUsuario());
        pstmt.setString(2, u.getContrasenia());
        //Ejecutammos la consulta y guardamos su resultado:
        ResultSet rs = pstmt.executeQuery();

        //Recorremos el ResultSet:
        if(rs.next()) {
         e = fillEmpleado(rs);
        }
        //Cerramos los objetos de BD:
        rs.close();
        pstmt.close();
        connMySQL.close();

        //Devolvemos el empleado que se genero:
        return e;

    }
  }

