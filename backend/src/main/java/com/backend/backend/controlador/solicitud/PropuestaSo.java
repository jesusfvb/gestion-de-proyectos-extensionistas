package com.backend.backend.controlador.solicitud;

import com.backend.backend.repositorio.entidades.Propuesta;
import com.backend.backend.repositorio.entidades.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class PropuestaSo {

    private String nombre;

    private Integer idCoordinador;

    private String area;

    private String descripcion;

    public PropuestaSo() {
    }

    public String getNombre() {
        return nombre;
    }

    public Integer getIdCoordinador() {
        return idCoordinador;
    }

    public String getArea() {
        return area;
    }

    public String getDescripcion() {
        return descripcion;
    }

    @JsonIgnore
    public Propuesta getPropuesta() {
        return new Propuesta(this.nombre, this.area, this.descripcion,this.idCoordinador);
    }
}
