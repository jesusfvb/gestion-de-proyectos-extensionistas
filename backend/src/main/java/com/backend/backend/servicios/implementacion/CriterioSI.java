package com.backend.backend.servicios.implementacion;

import com.backend.backend.controlador.respuestas.CriteriosRes;
import com.backend.backend.controlador.solicitud.CriteriosNewSo;
import com.backend.backend.controlador.solicitud.CriteriosUpSo;
import com.backend.backend.repositorio.CriterioR;
import com.backend.backend.servicios.CriterioS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CriterioSI implements CriterioS {

    @Autowired
    private CriterioR criterioR;

    @Override
    public List<CriteriosRes> listar() {
        return criterioR.findAll().parallelStream().map(CriteriosRes::new).collect(Collectors.toList());
    }

    @Override
    public CriteriosRes save(CriteriosNewSo criterio) {
        return new CriteriosRes(criterioR.save(criterio.getCriterios()));
    }

    @Override
    public CriteriosRes update(CriteriosUpSo criterio) {
        return new CriteriosRes(criterioR.save(criterio.getCriterios()));
    }

    @Override
    public Integer[] delete(Integer[] ids) {
        for (Integer id : ids) {
            criterioR.deleteById(id);
        }
        return ids;
    }

}
