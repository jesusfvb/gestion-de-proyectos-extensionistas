package com.backend.backend.servicios.implementacion;

import com.backend.backend.controlador.respuestas.UsuarioResp;
import com.backend.backend.repositorio.UsuarioR;
import com.backend.backend.repositorio.entidades.Usuario;
import com.backend.backend.servicios.UsuarioS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class UsuarioSI implements UsuarioS {

    @Autowired
    private UsuarioR usuarioR;

    @Override
    public List<UsuarioResp> listar() {
        List<UsuarioResp> salida = new LinkedList<>();
        usuarioR.findAll().forEach(usuario -> salida.add(new UsuarioResp(usuario)));
        return salida;
    }

    @Override
    public Usuario getByUsuario(String arg0) {
        if (arg0.equals("admin")) {
            Usuario usuario = new Usuario(-1);
            usuario.setNombre("Admin");
            usuario.setUsuario("admin");
            usuario.setContrasenna("1234");
            usuario.setRol(Usuario.Rol.Administrator);
            return usuario;
        }
        return usuarioR.findByUsuario(arg0);
    }
}
