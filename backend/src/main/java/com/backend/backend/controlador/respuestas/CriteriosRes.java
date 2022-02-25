package com.backend.backend.controlador.respuestas;

import com.backend.backend.repositorio.entidades.Criterio;

public class CriteriosRes {

    private Integer id;

    private String nombre;

    private String coordinador;

    private String description;

    public CriteriosRes(Criterio criterio) {
        this.id = criterio.getId();
        this.nombre = criterio.getNombre();
        this.coordinador = criterio.getCoordinador();
        this.description = criterio.getDescripcion();
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCoordinador() {
        return coordinador;
    }

    public String getDescription() {
        return description;
    }
}
