package com.starterkit.controller;

import com.starterkit.model.Poste;
import com.starterkit.repository.PosteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/postes")
public class PosteController {

    private final PosteRepository posteRepository;

    @Autowired
    public PosteController(PosteRepository posteRepository) {
        this.posteRepository = posteRepository;
    }

    @GetMapping("/tous")
    public ResponseEntity<List<Poste>> getAllPostes() {
        List<Poste> postes = posteRepository.findAll();
        return ResponseEntity.ok(postes);
    }

}
