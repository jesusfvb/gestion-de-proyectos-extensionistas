package com.backend.backend.servicios;

import com.backend.backend.controlador.respuestas.UsuarioPartProResp;
import com.backend.backend.controlador.respuestas.UsuarioPropuResp;
import com.backend.backend.controlador.respuestas.UsuarioResp;
import com.backend.backend.repositorio.entidades.Usuario;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UsuarioS {

    List<UsuarioResp> listar();

    List<UsuarioPartProResp> listarParticipacionProyecto();

    List<UsuarioPropuResp> listarPropuestas();

    Usuario getByUsuario(String arg0);

}
