package com.backend.backend.repositorio;

import com.backend.backend.repositorio.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioR extends JpaRepository<Usuario,Integer> {
}
