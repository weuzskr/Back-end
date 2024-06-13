package com.starterkit.controller;

import com.starterkit.model.Citoyen;
import com.starterkit.repository.CitoyenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citoyens")
public class CitoyenController {

    private final CitoyenRepository citoyenRepository;

    @Autowired
    public CitoyenController(CitoyenRepository citoyenRepository) {
        this.citoyenRepository = citoyenRepository;
    }

    // Endpoint pour récupérer tous les citoyens
    @GetMapping
    public ResponseEntity<List<Citoyen>> getAllCitoyens() {
        List<Citoyen> citoyens = citoyenRepository.findAll();
        return new ResponseEntity<>(citoyens, HttpStatus.OK);
    }

    // Endpoint pour chercher un citoyen par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Citoyen> getCitoyenById(@PathVariable Long id) {
        Citoyen citoyen = citoyenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Citoyen not found with id: " + id));
        return new ResponseEntity<>(citoyen, HttpStatus.OK);
    }

    // Endpoint pour chercher un citoyen par son nom
    @GetMapping("/search")
    public ResponseEntity<List<Citoyen>> getCitoyensByNom(@RequestParam String nom) {
        List<Citoyen> citoyens = citoyenRepository.findByNom(nom);
        return new ResponseEntity<>(citoyens, HttpStatus.OK);
    }

    // Endpoint pour enregistrer un nouveau citoyen
    @PostMapping("/enroll")
    public ResponseEntity<Citoyen> addCitoyen(@RequestBody Citoyen citoyen) {
        Citoyen savedCitoyen = citoyenRepository.save(citoyen);
        return new ResponseEntity<>(savedCitoyen, HttpStatus.CREATED);
    }
}
