package com.starterkit.repository;

import com.starterkit.model.Consulat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsulatRepository extends JpaRepository<Consulat, Long> {
    List<Consulat> findByStatut(String statut);
/*
    List<Consulat> findByDepartements_Id(Long departementId);*/
}
