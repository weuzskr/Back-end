package com.starterkit.repository;

import com.starterkit.model.Poste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PosteRepository extends JpaRepository<Poste, Long> {
    Optional<Poste> findByNom(String nom);
    boolean existsByNom(String nom);
}
