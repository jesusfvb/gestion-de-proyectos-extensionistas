package com.backend.backend.servicios;

import com.backend.backend.controlador.respuestas.ProyectoResp;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProyectoS {

    List<ProyectoResp> listarPorUsuarioActuales(String usuario);

    List<ProyectoResp> listarPorUsuarioCulminados(String usuario);

    List<ProyectoResp> listarPorUsuarioAlmacenado(String usuario);
}
