package com.backend.backend.servicios.implementacion;

import com.backend.backend.controlador.respuestas.ProyectoResp;
import com.backend.backend.controlador.solicitud.InscriAlmaceSol;
import com.backend.backend.controlador.solicitud.ProyectoNewSol;
import com.backend.backend.repositorio.ProyectoR;
import com.backend.backend.repositorio.entidades.Proyecto;
import com.backend.backend.repositorio.entidades.Usuario;
import com.backend.backend.servicios.ProyectoS;
import com.backend.backend.servicios.UsuarioS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProyectoSI implements ProyectoS {

    @Autowired
    private ProyectoR proyectoR;

    @Autowired
    private UsuarioS usuarioS;

    @Override
    public List<ProyectoResp> listar() {
        return proyectoR.findAll().parallelStream().map(ProyectoResp::new).collect(Collectors.toList());
    }

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

    @Override
    public ProyectoResp save(ProyectoNewSol proyecto) {
        return new ProyectoResp(proyectoR.save(proyecto.getProyecto()));
    }

    @Override
    public Integer borrar(Integer id) {
        proyectoR.deleteById(id);
        return id;
    }

    @Override
    public Boolean inscribirse(InscriAlmaceSol inscribirse) {
        Proyecto proyecto = proyectoR.getById(inscribirse.getId());
        proyecto.getParticipantes().add(usuarioS.getByUsuario(inscribirse.getUsuario()));
        proyectoR.save(proyecto);
        return true;
    }

    @Override
    public Boolean almacenar(InscriAlmaceSol almacenar) {
        Proyecto proyecto = proyectoR.getById(almacenar.getId());
        proyecto.getAlamacenados().add(usuarioS.getByUsuario(almacenar.getUsuario()));
        proyectoR.save(proyecto);
        return false;
    }

    @Override
    public Integer quitarAlmacen(InscriAlmaceSol quitarAlmacen) {
        Proyecto proyecto = proyectoR.getById(quitarAlmacen.getId());
        proyecto.getAlamacenados().removeIf(usuario -> usuario.getUsuario().equals(quitarAlmacen.getUsuario()));
        proyectoR.save(proyecto);
        return proyecto.getId();
    }

    @Override
    public Integer quitarInscripcion(InscriAlmaceSol quitarInscripcion) {
        Proyecto proyecto = proyectoR.getById(quitarInscripcion.getId());
        proyecto.getParticipantes().removeIf(usuario -> usuario.getUsuario().equals(quitarInscripcion.getUsuario()));
        proyectoR.save(proyecto);
        return proyecto.getId();
    }
}
