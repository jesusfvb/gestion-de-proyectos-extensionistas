package com.backend.backend.controlador;

import com.backend.backend.controlador.respuestas.PropuestaResp;
import com.backend.backend.controlador.solicitud.PropuestaSo;
import com.backend.backend.controlador.solicitud.PropuestaUpSo;
import com.backend.backend.servicios.PropuestaS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/propuestas")
public class PropuestaC {

    @Autowired
    private PropuestaS propuestaS;

    @GetMapping
    private ResponseEntity<List<PropuestaResp>> listar() {
        return ResponseEntity.ok(propuestaS.listar());
    }

    @PostMapping
    private ResponseEntity<PropuestaResp> add(@RequestBody PropuestaSo propuesta) {
        return ResponseEntity.ok(propuestaS.add(propuesta));
    }

    @DeleteMapping
    private ResponseEntity<Integer[]> borrar(@RequestBody Integer[] ids) {
        return ResponseEntity.ok(propuestaS.borrar(ids));
    }

    @PutMapping
    private ResponseEntity<PropuestaResp> update(@RequestBody PropuestaUpSo propuesta) {
        return ResponseEntity.ok(propuestaS.update(propuesta));
    }
}
