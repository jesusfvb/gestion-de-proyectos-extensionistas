package com.backend.backend.controlador.respuestas;

import com.backend.backend.repositorio.entidades.Criterio;

public class CriteriosRes {

    private Integer id;

    private String nombre;

    private String coordinador;

    private String area;

    private String description;

    private Boolean listo;

    public CriteriosRes(Criterio criterio) {
        this.id = criterio.getId();
        this.nombre = criterio.getNombre();
        this.coordinador = criterio.getCoordinador();
        this.description = criterio.getDescripcion();
        this.area = criterio.getArea();
        this.listo = criterio.getListo();
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

    public String getArea() {
        return area;
    }

    public Boolean getListo() {
        return listo;
    }
}
