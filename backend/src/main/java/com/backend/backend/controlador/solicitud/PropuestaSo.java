package com.backend.backend.controlador.solicitud;

import com.backend.backend.repositorio.entidades.Propuesta;
import com.backend.backend.repositorio.entidades.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;

public class PropuestaSo {

    private String nombre;

    private  String coordinador;

    private String area;

    private String descripcion;

    private String autor;

    public PropuestaSo() {
    }

    public String getNombre() {
        return nombre;
    }

    public String getCoordinador() {
        return coordinador;
    }

    public String getArea() {
        return area;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getAutor() {
        return autor;
    }

    @JsonIgnore
    public Propuesta getPropuesta(Usuario usuario) {
        Propuesta propuesta = new Propuesta();
        propuesta.setNombre(this.nombre);
        propuesta.setCoordinador(this.coordinador);
        propuesta.setArea(this.area);
        propuesta.setDescription(this.descripcion);
        propuesta.setFechaSolicitud(LocalDateTime.now());
        propuesta.setEstado(Propuesta.Estado.PENDIENTE);
        propuesta.setAutor(usuario);
        return propuesta;
    }
}
