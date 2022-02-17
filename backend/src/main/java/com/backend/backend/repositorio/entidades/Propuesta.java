package com.backend.backend.repositorio.entidades;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Propuesta extends Entidad {
    public enum Estado {PENDIENTE, ACEPATADA, DENEGADA}

    @Column
    private String nombre;

    @Column
    private String area;

    @Column
    private String description;

    @Column
    private LocalDateTime fechaSolicitud;

    @Column
    private String coordinador;

    @Enumerated(EnumType.STRING)
    @Column()
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Usuario autor;
    
    public Propuesta() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaSolicitud() {

        return fechaSolicitud;
    }

    public void setFechaSolicitud(LocalDateTime fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public String getCoordinador() {
        return coordinador;
    }

    public void setCoordinador(String coordinador) {
        this.coordinador = coordinador;
    }

    public Usuario getAutor() {
        return autor;
    }

    public void setAutor(Usuario autor) {
        this.autor = autor;
    }

}
