package com.backend.backend.controlador.respuestas;

import com.backend.backend.repositorio.entidades.Propuesta;

public class PropuestaNombreResp {

    private Integer id;

    private String nombre;

    public PropuestaNombreResp(Propuesta propuesta) {
        this.id = propuesta.getId();
        this.nombre = propuesta.getNombre();
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }
}
