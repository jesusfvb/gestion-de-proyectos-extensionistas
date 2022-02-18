package com.backend.backend.servicios;

import com.backend.backend.controlador.respuestas.ProyectoResp;
import com.backend.backend.controlador.solicitud.InscriAlmaceSol;
import com.backend.backend.controlador.solicitud.ProyectoNewSol;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProyectoS {

    List<ProyectoResp> listar();

    List<ProyectoResp> listarPorUsuarioActuales(String usuario);

    List<ProyectoResp> listarPorUsuarioCulminados(String usuario);

    List<ProyectoResp> listarPorUsuarioAlmacenado(String usuario);

    ProyectoResp save(ProyectoNewSol proyecto);

    Integer borrar(Integer id);

    Boolean inscribirse(InscriAlmaceSol inscribirse);

    Boolean almacenar(InscriAlmaceSol almacenar);

    Integer quitarAlmacen(InscriAlmaceSol quitarAlmacen);

    Integer quitarInscripcion(InscriAlmaceSol quitarInscripcion);
}
