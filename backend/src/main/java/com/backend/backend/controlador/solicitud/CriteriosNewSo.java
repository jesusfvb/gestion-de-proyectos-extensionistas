package com.backend.backend.controlador.solicitud;

import com.backend.backend.repositorio.entidades.Criterio;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class CriteriosNewSo {

    private String nombre;

    private String coordinador;

    private String area;

    private String description;

    public CriteriosNewSo() {
    }

    @JsonIgnore
    public Criterio getCriterios() {

        Criterio criterio = new Criterio();
        criterio.setNombre(this.nombre);
        criterio.setCoordinador(this.coordinador);
        criterio.setDescripcion(this.description);
        criterio.setListo(false);
        criterio.setArea(this.area);

        return criterio;
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
}
