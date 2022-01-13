package com.backend.backend.servicios.implementacion;

import com.backend.backend.controlador.respuestas.UsuarioResp;
import com.backend.backend.repositorio.UsuarioR;
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
}
