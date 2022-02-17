package com.backend.backend.controlador.respuestas;

import com.backend.backend.repositorio.entidades.Usuario;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class UsuarioPropuResp {

    private Integer id;

    private String nombre;

    private Integer cantidad;

    private List<PropuestaNombreResp> propuestas;

    public UsuarioPropuResp(Usuario usuario) {
        this.id = usuario.getId();
        this.nombre = usuario.getNombre();
        this.cantidad = usuario.getPropuestas().size();
        this.propuestas = usuario.getPropuestas().parallelStream().map(PropuestaNombreResp::new).collect(Collectors.toList());
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public List<PropuestaNombreResp> getPropuestas() {
        return propuestas;
    }
}
