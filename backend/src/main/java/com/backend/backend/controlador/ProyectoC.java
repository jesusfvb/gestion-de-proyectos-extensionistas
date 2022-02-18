package com.backend.backend.controlador;

import com.backend.backend.controlador.respuestas.ProyectoResp;
import com.backend.backend.controlador.solicitud.InscriAlmaceSol;
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

    @DeleteMapping("/{id}")
    private ResponseEntity<Integer> borrar(@PathVariable Integer id) {
        return ResponseEntity.ok(proyectoS.borrar(id));
    }

    @DeleteMapping("/quitar/inscripcion")
    private ResponseEntity<Integer> quitarInscripcion(@RequestBody InscriAlmaceSol quitarInscripcion) {
        return ResponseEntity.ok(proyectoS.quitarInscripcion(quitarInscripcion));
    }

    @DeleteMapping("/quitar/almacen")
    private ResponseEntity<Integer> quitarAlmacen(@RequestBody InscriAlmaceSol quitarAlmacen) {
        return ResponseEntity.ok(proyectoS.quitarAlmacen(quitarAlmacen));
    }

    @PutMapping("/inscribirse")
    private ResponseEntity<Boolean> inscribirse(@RequestBody InscriAlmaceSol inscribirse) {
        return ResponseEntity.ok(proyectoS.inscribirse(inscribirse));
    }

    @PutMapping("/almacenar")
    private ResponseEntity<Boolean> almacenar(@RequestBody InscriAlmaceSol almacenar) {
        return ResponseEntity.ok(proyectoS.almacenar(almacenar));
    }

}
