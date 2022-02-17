package com.backend.backend.controlador.respuestas;

import com.backend.backend.repositorio.entidades.Usuario;

import java.util.List;
import java.util.stream.Collectors;

public class UsuarioPartProResp {

    private Integer id;

    private String nombre;

    private List<ProyectoResp> proyectos;

    public UsuarioPartProResp(Usuario usuario) {
        this.id = usuario.getId();
        this.nombre = usuario.getNombre();
        this.proyectos = usuario.getProyectos().parallelStream().map(ProyectoResp::new).collect(Collectors.toList());
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public List<ProyectoResp> getProyectos() {
        return proyectos;
    }
}
