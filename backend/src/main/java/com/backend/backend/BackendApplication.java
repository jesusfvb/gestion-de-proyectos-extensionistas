package com.backend.backend;

import com.backend.backend.repositorio.UsuarioR;
import com.backend.backend.repositorio.entidades.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private UsuarioR usuarioR;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if (usuarioR.count() == 0) {
            Usuario usuario;
            usuario = new Usuario();
            usuario.setContrasenna("1234");
            usuario.setNombre("Dayana");
            usuario.setUsuario("dayana");
            usuario.setRol(Usuario.Rol.Usuario);
            usuarioR.save(usuario);

            usuario = new Usuario();
            usuario.setContrasenna("1234");
            usuario.setNombre("Roylan");
            usuario.setUsuario("roylan");
            usuario.setRol(Usuario.Rol.Usuario);
            usuarioR.save(usuario);

            usuario = new Usuario();
            usuario.setContrasenna("1234");
            usuario.setNombre("Vicedecana");
            usuario.setUsuario("vicedecana");
            usuario.setRol(Usuario.Rol.Vicedecana);
            usuarioR.save(usuario);

            usuario = new Usuario();
            usuario.setContrasenna("1234");
            usuario.setNombre("Asesor");
            usuario.setUsuario("asesor");
            usuario.setRol(Usuario.Rol.Asesor);
            usuarioR.save(usuario);
        }
    }
}
