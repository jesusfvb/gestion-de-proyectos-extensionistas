package com.backend.backend.repositorio;

import com.backend.backend.repositorio.entidades.Criterio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriterioR extends JpaRepository<Criterio, Integer> {
}
