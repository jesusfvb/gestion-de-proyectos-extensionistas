package com.backend.backend.controlador;

import com.backend.backend.controlador.respuestas.CriteriosRes;
import com.backend.backend.controlador.solicitud.CriteriosNewSo;
import com.backend.backend.controlador.solicitud.CriteriosUpSo;
import com.backend.backend.servicios.CriterioS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/criterios")
public class CriterioC {

    @Autowired
    private CriterioS criterioS;

    @GetMapping()
    private ResponseEntity<List<CriteriosRes>> listar() {
        return ResponseEntity.ok(criterioS.listar());
    }

    @PostMapping
    private ResponseEntity<CriteriosRes> save(@RequestBody CriteriosNewSo criterio) {
        return ResponseEntity.ok(criterioS.save(criterio));
    }

    @PutMapping
    private ResponseEntity<CriteriosRes> update(@RequestBody CriteriosUpSo criterio) {
        return ResponseEntity.ok(criterioS.update(criterio));
    }

    @DeleteMapping
    private ResponseEntity<Integer[]> delete(@RequestBody Integer[] ids) {
        return ResponseEntity.ok(criterioS.delete(ids));
    }
}
