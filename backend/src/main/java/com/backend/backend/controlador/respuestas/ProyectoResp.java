package com.backend.backend.controlador.respuestas;

import com.backend.backend.repositorio.entidades.Proyecto;

public class ProyectoResp {

    private Integer id;

    private String nombre;

    private String coordinador;

    private String description;

    private String estado;

    public ProyectoResp(Proyecto proyecto) {
        this.id = proyecto.getId();
        this.nombre = proyecto.getNombre();
        this.coordinador = proyecto.getCoordinador();
        this.description = proyecto.getDescription();
        this.estado = proyecto.getEstado().name();
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescription() {
        return description;
    }

    public String getEstado() {
        return estado;
    }

    public String getCoordinador() {
        return coordinador;
    }
}
