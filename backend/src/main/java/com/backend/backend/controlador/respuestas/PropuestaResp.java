package com.backend.backend.controlador.respuestas;

import com.backend.backend.repositorio.entidades.Propuesta;

import java.time.LocalDate;

public class PropuestaResp {

    private Integer id;

    private String nombre;

    private String area;

    private String descripcion;

    private LocalDate fechaSolicitud;

    private Propuesta.Estado estado;

    private String coordinador;

    public PropuestaResp() {
    }

    public PropuestaResp(Propuesta propuesta) {
        this.id = propuesta.getId();
        this.nombre = propuesta.getNombre();
        this.area = propuesta.getArea();
        this.descripcion = propuesta.getDescription();
        this.fechaSolicitud = LocalDate.from(propuesta.getFechaSolicitud());
        this.estado = propuesta.getEstado();
        this.coordinador = propuesta.getCoordinador();
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getArea() {
        return area;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public LocalDate getFechaSolicitud() {
        return fechaSolicitud;
    }

    public Propuesta.Estado getEstado() {
        return estado;
    }

    public String getCoordinador() {
        return coordinador;
    }
}
