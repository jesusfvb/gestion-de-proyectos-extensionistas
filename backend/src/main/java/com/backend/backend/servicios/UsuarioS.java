package com.backend.backend.servicios;

import com.backend.backend.controlador.respuestas.UsuarioResp;
import com.backend.backend.repositorio.entidades.Usuario;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UsuarioS {

    List<UsuarioResp> listar();

    Usuario getByUsuario(String arg0);
}
