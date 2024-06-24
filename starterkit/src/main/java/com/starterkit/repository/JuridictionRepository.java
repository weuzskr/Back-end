package com.starterkit.repository;

import com.starterkit.model.Poste;
import com.starterkit.model.Juridiction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JuridictionRepository extends JpaRepository<Juridiction, Long> {
}
