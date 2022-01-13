package com.backend.backend.controlador.respuestas;

import com.backend.backend.repositorio.entidades.Usuario;

public class UsuarioResp {

    private Integer id;

    private String nombre;

    public UsuarioResp() {
    }

    public UsuarioResp(Usuario usuario) {
        this.id = usuario.getId();
        this.nombre = usuario.getNombre();
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }
}
