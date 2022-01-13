package com.backend.backend.repositorio;


import com.backend.backend.repositorio.entidades.Propuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropuestaR extends JpaRepository<Propuesta, Integer> {
}
