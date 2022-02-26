package com.backend.backend.repositorio;

import com.backend.backend.repositorio.entidades.Criterio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriterioR extends JpaRepository<Criterio, Integer> {

    List<Criterio> findByListoIsTrue();

}
