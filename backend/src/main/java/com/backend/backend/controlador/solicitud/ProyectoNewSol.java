package com.backend.backend.controlador.solicitud;

import com.backend.backend.repositorio.entidades.Proyecto;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class ProyectoNewSol {

    private String nombre;

    private String coordinador;

    private String descripcion;

    private String img;

    public ProyectoNewSol() {
    }

    public String getNombre() {
        return nombre;
    }

    public String getCoordinador() {
        return coordinador;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getImg() {
        return img;
    }

    @JsonIgnore
    public Proyecto getProyecto() {
        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(this.nombre);
        proyecto.setEstado(Proyecto.Estado.ACTIVO);
        proyecto.setCoordinador(this.coordinador);
        proyecto.setDescription(this.descripcion);
        proyecto.setImg(this.img);
        return proyecto;
    }
}
