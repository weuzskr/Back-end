package com.starterkit.service;

import com.starterkit.model.Citoyen;
import com.starterkit.model.Famille;
import com.starterkit.model.AttacherFamilliale;
import com.starterkit.repository.CitoyenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CitoyenService {

    private final CitoyenRepository citoyenRepository;

    @Autowired
    public CitoyenService(CitoyenRepository citoyenRepository) {
        this.citoyenRepository = citoyenRepository;
    }

    @Transactional
    public Citoyen saveCitoyenWithRelations(Citoyen citoyen) {
        if (citoyen.getAttacherFamilliales() != null) {
            for (AttacherFamilliale attacherFamilliale : citoyen.getAttacherFamilliales()) {
                attacherFamilliale.setCitoyen(citoyen);
            }
        }
        if (citoyen.getFamilles() != null) {
            for (Famille famille : citoyen.getFamilles()) {
                famille.setCitoyen(citoyen);
            }
        }
        return citoyenRepository.save(citoyen);
    }
}
