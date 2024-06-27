package com.starterkit.controller;

import com.starterkit.model.Juridiction;
import com.starterkit.repository.JuridictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/juridictions")
public class JuridictionController {

    private final JuridictionRepository juridictionRepository;

    @Autowired
    public JuridictionController(JuridictionRepository juridictionRepository) {
        this.juridictionRepository = juridictionRepository;
    }

    @GetMapping("/tous")
    public ResponseEntity<List<Juridiction>> getAllJuridictions() {
        List<Juridiction> juridictions = juridictionRepository.findAll();
        return ResponseEntity.ok(juridictions);
    }

    // Autres endpoints pour CRUD des juridictions peuvent être ajoutés ici
}
