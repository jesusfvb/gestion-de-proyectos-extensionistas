package com.backend.backend.repositorio.entidades;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Proyecto extends Entidad {

    public enum Estado {ACTIVO, CULMINADO}

    @Column
    private String nombre;

    @Column
    private Estado estado;

    @Column
    private String description;

    @Column
    private String coordinador;

    @Column
    private String img;

    @OneToMany(orphanRemoval = true)
    @JoinColumn(name = "proyecto_id")
    private List<Usuario> alamacenados = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "proyecto_usuarios",
            joinColumns = @JoinColumn(name = "proyecto_id"),
            inverseJoinColumns = @JoinColumn(name = "usuarios_id"))
    private Set<Usuario> participantes = new LinkedHashSet<>();

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

    public Set<Usuario> getParticipantes() {
        return participantes;
    }

    public void setParticipantes(Set<Usuario> participantes) {
        this.participantes = participantes;
    }

    public List<Usuario> getAlamacenados() {
        return alamacenados;
    }

    public void setAlamacenados(List<Usuario> alamacenados) {
        this.alamacenados = alamacenados;
    }

    public String getCoordinador() {
        return coordinador;
    }

    public void setCoordinador(String coordinador) {
        this.coordinador = coordinador;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
