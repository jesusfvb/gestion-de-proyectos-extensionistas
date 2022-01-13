package com.backend.backend.controlador.solicitud;

import com.backend.backend.repositorio.entidades.Propuesta;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class PropuestaUpSo {

    private Integer id;

    private String nombre;

    private Integer idCoordinador;

    private String area;

    private String descripcion;

    public PropuestaUpSo() {
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

    public Integer getId() {
        return id;
    }
}
