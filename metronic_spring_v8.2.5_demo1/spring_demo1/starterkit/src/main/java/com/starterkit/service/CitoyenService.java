package com.starterkit.service;

import com.starterkit.model.Citoyen;
import com.starterkit.repository.CitoyenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CitoyenService {

    @Autowired
    private CitoyenRepository citoyenRepository;

    public Citoyen enrollCitizen(Citoyen citoyen) {
        return citoyenRepository.save(citoyen);
    }
}
