package com.starterkit.controller;

import com.starterkit.model.Citoyen;
import com.starterkit.service.CitoyenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/citoyens")
public class CitoyenController {

    @Autowired
    private CitoyenService citoyenService;

    @GetMapping
    public List<Citoyen> getAllCitoyens() {
        return citoyenService.getAllCitoyens();
    }
}
