package com.starterkit.service;

import com.starterkit.model.Citoyen;
import com.starterkit.repository.CitoyenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CitoyenService {

    @Autowired
    private CitoyenRepository citoyenRepository;

    public List<Citoyen> getAllCitoyens() {
        return citoyenRepository.findAll();
    }
}
