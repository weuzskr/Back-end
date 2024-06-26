package com.starterkit.controller;

import com.starterkit.model.Famille;
import com.starterkit.service.FamilleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/familles")
public class FamilleController {

    private final FamilleService familleService;

    @Autowired
    public FamilleController(FamilleService familleService) {
        this.familleService = familleService;
    }

    @PostMapping("/enregistrer")
    public ResponseEntity<?> enregistrerFamille(@RequestBody Famille famille) {
        try {
            Famille savedFamille = familleService.saveFamille(famille);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedFamille);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'enregistrement de la famille : " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Famille>> getAllFamilles() {
        try {
            List<Famille> familles = familleService.getAllFamilles();
            return ResponseEntity.ok(familles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
