package com.starterkit.controller;

import com.starterkit.model.AttacherFamilliale;
import com.starterkit.service.AttacherFamillialeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attacher-familliale")
public class AttacherFamillialeController {

    private final AttacherFamillialeService attacherFamillialeService;

    @Autowired
    public AttacherFamillialeController(AttacherFamillialeService attacherFamillialeService) {
        this.attacherFamillialeService = attacherFamillialeService;
    }

    @PostMapping("/enroler")
    public ResponseEntity<?> enregistrerAttacherFamilliale(@RequestBody AttacherFamilliale attacherFamilliale) {
        try {
            AttacherFamilliale savedAttacherFamilliale = attacherFamillialeService.saveAttacherFamilliale(attacherFamilliale);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAttacherFamilliale);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'enregistrement de l'attacher familliale : " + e.getMessage());
        }
    }
}
