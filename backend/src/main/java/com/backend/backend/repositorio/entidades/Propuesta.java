package com.backend.backend.repositorio.entidades;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Propuesta extends Entidad {
    public enum Estado {PENDIENTE}

    @Column
    private String nombre;

    @Column
    private String area;

    @Column
    private String description;

    @Column
    private LocalDateTime fechaSolicitud;

    @Enumerated
    @Column()
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "coordinador_id")
    private Usuario coordinador;

    public Propuesta() {
    }

    public Propuesta(String nombre, String area, String description, Integer idCoordinador) {
        this.nombre = nombre;
        this.area = area;
        this.description = description;
        this.coordinador = new Usuario(idCoordinador);
        this.fechaSolicitud = LocalDateTime.now();
        this.estado = Estado.PENDIENTE;
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

    public Usuario getCoordinador() {
        return coordinador;
    }

    public void setCoordinador(Usuario coordinador) {
        this.coordinador = coordinador;
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
}
