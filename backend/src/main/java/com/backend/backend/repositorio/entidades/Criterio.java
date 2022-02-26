package com.backend.backend.repositorio.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Criterio extends Entidad {

    @Column
    private String nombre;

    @Column
    private String area;

    @Column
    private String coordinador;

    @Column
    private String descripcion;

    @Column
    private Boolean listo;

    public Criterio() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCoordinador() {
        return coordinador;
    }

    public void setCoordinador(String coordinador) {
        this.coordinador = coordinador;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean getListo() {
        return listo;
    }

    public void setListo(Boolean listo) {
        this.listo = listo;
    }
}
