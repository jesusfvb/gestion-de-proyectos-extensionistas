package com.backend.backend.controlador.solicitud;

import com.backend.backend.repositorio.entidades.Propuesta;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class PropuestaUpSo {

    private Integer id;

    private String nombre;

    private String coordinador;

    private String area;

    private String descripcion;

    public PropuestaUpSo() {
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

    public Integer getId() {
        return id;
    }
}
