package com.backend.backend.servicios;

import com.backend.backend.controlador.respuestas.PropuestaResp;
import com.backend.backend.controlador.solicitud.PropuestaSo;
import com.backend.backend.controlador.solicitud.PropuestaUpSo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PropuestaS {

    List<PropuestaResp> listar();

    List<PropuestaResp> listarPorUsuario(String usuario);

    List<PropuestaResp> aceptar(Integer[] ids);

    List<PropuestaResp> denegar(Integer[] ids);

    List<PropuestaResp> listarAprobadas();

    PropuestaResp add(PropuestaSo propuesta);

    PropuestaResp update(PropuestaUpSo propuesta);

    Integer[] borrar(Integer[] ids);
}
