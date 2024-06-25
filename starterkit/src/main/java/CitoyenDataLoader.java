/*
package com.starterkit;

import com.starterkit.model.Citoyen;
import com.starterkit.model.Profession;
import com.starterkit.model.AttacherFamilliale;
import com.starterkit.model.Famille;
import com.starterkit.model.Consulat;
import com.starterkit.repository.CitoyenRepository;
import com.starterkit.repository.ProfessionRepository;
import com.starterkit.repository.AttacherFamillialeRepository;
import com.starterkit.repository.FamilleRepository;
import com.starterkit.repository.ConsulatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class CitoyenDataLoader implements ApplicationRunner {

    private final CitoyenRepository citoyenRepository;
    private final ProfessionRepository professionRepository;
    private final AttacherFamillialeRepository attacherFamillialeRepository;
    private final FamilleRepository familleRepository;
    private final ConsulatRepository consulatRepository;

    @Autowired
    public CitoyenDataLoader(CitoyenRepository citoyenRepository, ProfessionRepository professionRepository,
                             AttacherFamillialeRepository attacherFamillialeRepository, FamilleRepository familleRepository,
                             ConsulatRepository consulatRepository)*/
/**//*
 {
        this.citoyenRepository = citoyenRepository;
        this.professionRepository = professionRepository;
        this.attacherFamillialeRepository = attacherFamillialeRepository;
        this.familleRepository = familleRepository;
        this.consulatRepository = consulatRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (citoyenRepository.count() == 0) {
            Profession profession = professionRepository.findById(1L).orElse(null);
            AttacherFamilliale attacherFamilliale = attacherFamillialeRepository.findById(1L).orElse(null);
            Famille famille = familleRepository.findById(1L).orElse(null);
            Consulat consulat = consulatRepository.findById(1L).orElse(null);

            List<Citoyen> citoyens = Arrays.asList(
                    new Citoyen("77889", "Gueye", "Ibrahima", LocalDate.of(1975, 4, 5), "Diourbel", "Sénégal", "M", 1.82f, "777890123", "photo7.jpg", "signature7.png", "Londres, Royaume-Uni", "empreinte7", "Marié", profession, attacherFamilliale, famille, consulat),
                    new Citoyen("99000", "Fall", "Khadija", LocalDate.of(2000, 9, 15), "Mbour", "Sénégal", "F", 1.72f, "778901234", "photo8.jpg", "signature8.png", "Moscou, Russie", "empreinte8", "Célibataire", profession, attacherFamilliale, famille, consulat)
                    // Ajoutez d'autres citoyens si nécessaire
            );

            citoyenRepository.saveAll(citoyens);
            System.out.println("Data loaded successfully.");
        } else {
            System.out.println("Data already exists in Citoyen table. Skipping insertion.");
        }
    }
}*/
