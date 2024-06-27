/*
package com.starterkit;

import com.starterkit.model.Profession;
import com.starterkit.repository.ProfessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    private final ProfessionRepository professionRepository;

    @Autowired
    public DataLoader(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (professionRepository.count() == 0) {
            List<String> secteursActivites = Arrays.asList(
                    "Informatique",
                    "Finance",
                    "Éducation",
                    "Médecine",
                    "Ingénierie",
                    "Agriculture",
                    "Art",
                    "Vente",
                    "Transport",
                    "Hôtellerie"
            );

            secteursActivites.forEach(secteur -> {
                Profession profession = new Profession(secteur);
                professionRepository.save(profession);
            });

            System.out.println("Data loaded successfully.");
        } else {
            System.out.println("Data already exist in the database. Skipping DataLoader.");
        }
    }
}
*/
