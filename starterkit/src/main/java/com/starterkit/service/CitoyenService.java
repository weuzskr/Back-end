package com.starterkit.service;
import com.starterkit.model.*;
import com.starterkit.repository.*;


import com.starterkit.model.Citoyen;
import com.starterkit.model.*;
import com.starterkit.service.CitoyenService;
import com.starterkit.repository.CitoyenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CitoyenService {

    @Autowired
    private CitoyenRepository citoyenRepository;

    @Autowired
    private AttacherFamillialeRepository attacherFamillialeRepository;

    @Autowired
    private FamilleRepository familleRepository;

    @Autowired
    private ConsulatRepository consulatRepository;

    @Transactional
    public Citoyen enrôlerCitoyen(Citoyen citoyen) {
        // Enregistrer AttacherFamilliale s'il n'est pas déjà enregistré
        if (citoyen.getAttacherFamilliale() != null && citoyen.getAttacherFamilliale().getId() == null) {
            AttacherFamilliale attacherFamilliale = citoyen.getAttacherFamilliale();
            attacherFamilliale = attacherFamillialeRepository.save(attacherFamilliale);
            citoyen.setAttacherFamilliale(attacherFamilliale);
        }

        // Enregistrer Famille s'il n'est pas déjà enregistré
        if (citoyen.getFamille() != null && citoyen.getFamille().getId() == null) {
            Famille famille = citoyen.getFamille();
            famille = familleRepository.save(famille);
            citoyen.setFamille(famille);
        }

        // Enregistrer Consulat s'il n'est pas déjà enregistré
        if (citoyen.getConsulat() != null && citoyen.getConsulat().getId() == null) {
            Consulat consulat = citoyen.getConsulat();
            consulat = consulatRepository.save(consulat);
            citoyen.setConsulat(consulat);
        }

        return citoyenRepository.save(citoyen);
    }
}

