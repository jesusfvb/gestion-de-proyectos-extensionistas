package com.backend.backend.controlador.respuestas;

import com.backend.backend.repositorio.entidades.Proyecto;
import com.backend.backend.repositorio.entidades.Usuario;

import java.util.List;
import java.util.stream.Collectors;

public class ProyectoResp {

    private Integer id;

    private String nombre;

    private String coordinador;

    private String description;

    private String estado;

    public List<String> inscritos;

    public List<String> almacenados;

    public ProyectoResp(Proyecto proyecto) {
        this.id = proyecto.getId();
        this.nombre = proyecto.getNombre();
        this.coordinador = proyecto.getCoordinador();
        this.description = proyecto.getDescription();
        this.estado = proyecto.getEstado().name();
        this.inscritos = proyecto.getParticipantes().stream().map(Usuario::getUsuario).collect(Collectors.toList());
        this.almacenados = proyecto.getAlamacenados().stream().map(Usuario::getUsuario).collect(Collectors.toList());
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

    public List<String> getInscritos() {
        return inscritos;
    }

    public List<String> getAlmacenados() {
        return almacenados;
    }
}
