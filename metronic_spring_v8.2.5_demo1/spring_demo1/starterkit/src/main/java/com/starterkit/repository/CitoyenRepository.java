package com.starterkit.repository;

import com.starterkit.model.Citoyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CitoyenRepository extends JpaRepository<Citoyen, Long> {
    List<Citoyen> findByNom(String nom);
}
