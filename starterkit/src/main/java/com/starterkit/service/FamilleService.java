package com.starterkit.service;

import com.starterkit.model.Citoyen;
import com.starterkit.model.Famille;
import com.starterkit.repository.CitoyenRepository;
import com.starterkit.repository.FamilleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FamilleService {

    @Autowired
    private FamilleRepository familleRepository;

    @Autowired
    private CitoyenRepository citoyenRepository;

    @Transactional
    public Famille saveFamille(Famille famille) {
        Citoyen citoyen = citoyenRepository.findById(famille.getCitoyen().getId())
                .orElseThrow(() -> new IllegalArgumentException("Citoyen not found"));
        famille.setCitoyen(citoyen);
        return familleRepository.save(famille);
    }
    public List<Famille> getAllFamilles() {
        return familleRepository.findAll();
    }
}
