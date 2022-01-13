package com.backend.backend.controlador;

import com.backend.backend.controlador.respuestas.UsuarioResp;
import com.backend.backend.servicios.UsuarioS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin
public class UsuarioC {

    @Autowired
    private UsuarioS usuarioS;

    @GetMapping
    private ResponseEntity<List<UsuarioResp>> listar() {
        return ResponseEntity.ok(usuarioS.listar());
    }

}
