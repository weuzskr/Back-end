package com.starterkit.controller;

import com.starterkit.model.Citoyen;
import com.starterkit.service.CitoyenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/citoyens")
public class CitoyenController {

    private final CitoyenService citoyenService;

    @Autowired
    public CitoyenController(CitoyenService citoyenService) {
        this.citoyenService = citoyenService;
    }

    @PostMapping("/enroler")
    public ResponseEntity<?> enregistrerCitoyen(@RequestBody Citoyen citoyen) {
        try {
            Citoyen savedCitoyen = citoyenService.saveCitoyenWithRelations(citoyen);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCitoyen);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'enregistrement du citoyen : " + e.getMessage());
        }
    }
}
