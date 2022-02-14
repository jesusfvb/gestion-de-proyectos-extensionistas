package com.backend.backend.repositorio.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Proyecto extends Entidad {

    public enum Estado {ACTIVO, CULMINADO}

    @Column
    private String nombre;

    @Column
    private Estado estado;

    @OneToMany(orphanRemoval = true)
    @JoinColumn(name = "proyecto_id")
    private List<Usuario> participantes = new ArrayList<>();

    public Proyecto() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }


    public List<Usuario> getParticipantes() {
        return participantes;
    }

    public void setParticipantes(List<Usuario> participantes) {
        this.participantes = participantes;
    }
}
