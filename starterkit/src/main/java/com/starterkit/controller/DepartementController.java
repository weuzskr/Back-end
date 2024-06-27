package com.starterkit.controller;

import com.starterkit.model.Departement;
import com.starterkit.repository.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departements")
public class DepartementController {

    private final DepartementRepository departementRepository;

    @Autowired
    public DepartementController(DepartementRepository departementRepository) {
        this.departementRepository = departementRepository;
    }

    @GetMapping("/tous")
    public ResponseEntity<List<Departement>> getAllDepartements() {
        List<Departement> departements = departementRepository.findAll();
        return ResponseEntity.ok(departements);
    }

    // Autres endpoints pour CRUD des départements peuvent être ajoutés ici
}
