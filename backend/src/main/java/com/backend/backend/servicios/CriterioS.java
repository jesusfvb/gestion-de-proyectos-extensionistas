package com.backend.backend.servicios;

import com.backend.backend.controlador.respuestas.CriteriosRes;
import com.backend.backend.controlador.solicitud.CriteriosNewSo;
import com.backend.backend.controlador.solicitud.CriteriosUpSo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CriterioS {

    List<CriteriosRes> listar();

    List<CriteriosRes> listarListos();

    CriteriosRes save(CriteriosNewSo criterio);

    CriteriosRes update(CriteriosUpSo criterio);

    CriteriosRes listo(Integer id);

    Integer[] delete(Integer[] ids);
}