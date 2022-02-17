package com.backend.backend.servicios.implementacion;

import com.backend.backend.controlador.respuestas.ProyectoResp;
import com.backend.backend.repositorio.ProyectoR;
import com.backend.backend.repositorio.entidades.Proyecto;
import com.backend.backend.servicios.ProyectoS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProyectoSI implements ProyectoS {

    @Autowired
    private ProyectoR proyectoR;

    @Override
    public List<ProyectoResp> listarPorUsuarioActuales(String usuario) {
        return proyectoR.findByParticipantes_UsuarioAndEstado(usuario, Proyecto.Estado.ACTIVO).parallelStream().map(ProyectoResp::new).collect(Collectors.toList());
    }

    @Override
    public List<ProyectoResp> listarPorUsuarioCulminados(String usuario) {
        return proyectoR.findByParticipantes_UsuarioAndEstado(usuario, Proyecto.Estado.CULMINADO).parallelStream().map(ProyectoResp::new).collect(Collectors.toList());
    }

    @Override
    public List<ProyectoResp> listarPorUsuarioAlmacenado(String usuario) {
        return proyectoR.findByAlamacenados_Usuario(usuario).parallelStream().map(ProyectoResp::new).collect(Collectors.toList());

    }
}
