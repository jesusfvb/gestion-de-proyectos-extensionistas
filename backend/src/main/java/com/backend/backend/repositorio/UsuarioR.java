package com.backend.backend.repositorio;

import com.backend.backend.repositorio.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioR extends JpaRepository<Usuario, Integer> {

    Usuario findByUsuario(String usuario);

    List<Usuario> findByProyectosIsNotEmpty();

    List<Usuario> findByPropuestasIsNotEmpty();

}
