package com.backend.backend.controlador;

import com.backend.backend.controlador.respuestas.ProyectoResp;
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

    @GetMapping("/usuario/{usuario}")
    private ResponseEntity<List<ProyectoResp>> getPorUsuario(@PathVariable String usuario) {
        return ResponseEntity.ok(proyectoS.listarPorUsuario(usuario));
    }

}
