package com.backend.backend.controlador;

import com.backend.backend.controlador.respuestas.ProyectoResp;
import com.backend.backend.controlador.solicitud.ProyectoNewSol;
import com.backend.backend.servicios.ProyectoS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proyecto")
@CrossOrigin("*")
public class ProyectoC {

    @Autowired
    private ProyectoS proyectoS;

    @GetMapping()
    private ResponseEntity<List<ProyectoResp>> listar() {
        return ResponseEntity.ok(proyectoS.listar());
    }

    @GetMapping("/actuales/usuario/{usuario}")
    private ResponseEntity<List<ProyectoResp>> getPorUsuarioActuales(@PathVariable String usuario) {
        return ResponseEntity.ok(proyectoS.listarPorUsuarioActuales(usuario));
    }

    @GetMapping("/culminados/usuario/{usuario}")
    private ResponseEntity<List<ProyectoResp>> getPorUsuarioCulminados(@PathVariable String usuario) {
        return ResponseEntity.ok(proyectoS.listarPorUsuarioCulminados(usuario));
    }

    @GetMapping("/almacenado/usuario/{usuario}")
    private ResponseEntity<List<ProyectoResp>> getPorUsuarioAlmacenado(@PathVariable String usuario) {
        return ResponseEntity.ok(proyectoS.listarPorUsuarioAlmacenado(usuario));
    }


    @PostMapping
    private ResponseEntity<ProyectoResp> save(@RequestBody ProyectoNewSol proyecto) {
        return ResponseEntity.ok(proyectoS.save(proyecto));
    }

}
