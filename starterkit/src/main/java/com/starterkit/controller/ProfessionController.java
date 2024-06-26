package com.starterkit.controller;


import com.starterkit.model.Profession;
import com.starterkit.repository.ProfessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/professions")
public class ProfessionController {

    private final ProfessionRepository professionRepository;

    @Autowired
    public ProfessionController(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }

    @GetMapping
    public List<Profession> getAllProfessions() {
        return professionRepository.findAll();
    }
}
