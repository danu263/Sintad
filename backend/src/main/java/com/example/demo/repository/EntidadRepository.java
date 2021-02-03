package com.example.demo.repository;

import com.example.demo.entity.Entidad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntidadRepository extends JpaRepository<Entidad, Integer> {
}
