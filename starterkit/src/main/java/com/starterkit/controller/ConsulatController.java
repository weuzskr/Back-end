package com.starterkit.controller;

import com.starterkit.model.Consulat;
import com.starterkit.repository.ConsulatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consulats")
public class ConsulatController {

    private final ConsulatRepository consulatRepository;

    @Autowired
    public ConsulatController(ConsulatRepository consulatRepository) {
        this.consulatRepository = consulatRepository;
    }

    @GetMapping("/tous")
    public ResponseEntity<List<Consulat>> getAllConsulats() {
        List<Consulat> consulats = consulatRepository.findAll();
        return ResponseEntity.ok(consulats);
    }

    // Autres endpoints pour CRUD des consulats peuvent être ajoutés ici
}
