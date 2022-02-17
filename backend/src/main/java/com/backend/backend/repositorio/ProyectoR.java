package com.backend.backend.repositorio;

import com.backend.backend.repositorio.entidades.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyectoR extends JpaRepository<Proyecto, Integer> {

    List<Proyecto> findByParticipantes_UsuarioAndEstado(String usuario, Proyecto.Estado estado);

    List<Proyecto> findByAlamacenados_Usuario(String usuario);

}
