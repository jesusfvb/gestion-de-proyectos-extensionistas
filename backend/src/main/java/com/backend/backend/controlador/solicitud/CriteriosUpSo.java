package com.backend.backend.controlador.solicitud;

import com.backend.backend.repositorio.entidades.Criterio;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class CriteriosUpSo {

    private Integer id;

    private String nombre;

    private String coordinador;

    private String area;

    private String description;

    public CriteriosUpSo() {
    }

    @JsonIgnore
    public Criterio getCriterios(Criterio criterio) {

        criterio.setId(this.id);
        criterio.setNombre(this.nombre);
        criterio.setCoordinador(this.coordinador);
        criterio.setDescripcion(this.description);
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

    public Integer getId() {
        return id;
    }

    public String getArea() {
        return area;
    }
}
