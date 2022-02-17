package com.backend.backend.repositorio.entidades;

import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Usuario extends Entidad {

    public enum Rol {Usuario, Vicedecana, Asesor, Administrator}

    @Column
    private String nombre;

    @Column
    private String usuario;

    @Column
    private String contrasenna;

    @Column
    @Enumerated(EnumType.STRING)
    private Rol rol;

    @ManyToMany(mappedBy = "participantes")
    private List<Proyecto> proyectos = new ArrayList<>();

    @OneToMany(mappedBy = "autor", orphanRemoval = true)
    private List<Propuesta> propuestas = new ArrayList<>();

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

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public String getContrasenna() {
        return contrasenna;
    }

    public void setContrasenna(String contrasenna) {
        this.contrasenna = contrasenna;
    }

    public List<Proyecto> getProyectos() {
        return proyectos;
    }

    public void setProyectos(List<Proyecto> proyectos) {
        this.proyectos = proyectos;
    }

    public List<Propuesta> getPropuestas() {
        return propuestas;
    }

    public void setPropuestas(List<Propuesta> propuestas) {
        this.propuestas = propuestas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Usuario usuario = (Usuario) o;
        return getId() != null && Objects.equals(getId(), usuario.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
