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


    @GetMapping("/usuario/{usuario}")
    private ResponseEntity<List<PropuestaResp>> listarPorUsuario(@PathVariable String usuario) {
        return ResponseEntity.ok(propuestaS.listarPorUsuario(usuario));
    }

    @GetMapping("/aprobadas")
    private ResponseEntity<List<PropuestaResp>> listarAprobadas() {
        return ResponseEntity.ok(propuestaS.listarAprobadas());
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

    @PutMapping("/aceptar")
    private ResponseEntity<List<PropuestaResp>> aceptar(@RequestBody Integer[] ids) {
        return ResponseEntity.ok(propuestaS.aceptar(ids));
    }

    @PutMapping("/denegar")
    private ResponseEntity<List<PropuestaResp>> denegar(@RequestBody Integer[] ids) {
        return ResponseEntity.ok(propuestaS.denegar(ids));
    }

}
