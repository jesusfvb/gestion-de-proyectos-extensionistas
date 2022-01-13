package com.backend.backend.repositorio.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Usuario extends Entidad {

    @Column
    private String nombre;

    public Usuario() {
    }

    public Usuario(Integer id) {
        super.setId(id);
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
