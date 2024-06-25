package com.starterkit.service;

import com.starterkit.model.AttacherFamilliale;
import com.starterkit.model.Citoyen;
import com.starterkit.repository.AttacherFamillialeRepository;
import com.starterkit.repository.CitoyenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AttacherFamillialeService {

    @Autowired
    private AttacherFamillialeRepository attacherFamillialeRepository;

    @Autowired
    private CitoyenRepository citoyenRepository;

    @Transactional
    public AttacherFamilliale saveAttacherFamilliale(AttacherFamilliale attacherFamilliale) {
        Citoyen citoyen = citoyenRepository.findById(attacherFamilliale.getCitoyen().getId())
                .orElseThrow(() -> new IllegalArgumentException("Citoyen not found"));
        attacherFamilliale.setCitoyen(citoyen);
        return attacherFamillialeRepository.save(attacherFamilliale);
    }
}
