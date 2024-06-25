/*
package com.starterkit;

import com.starterkit.model.Famille;
import com.starterkit.repository.FamilleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class FamilleDataLoader implements ApplicationRunner {

    private final FamilleRepository familleRepository;

    @Autowired
    public FamilleDataLoader(FamilleRepository familleRepository) {
        this.familleRepository = familleRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        // Vérifier si la table Famille est vide
        if (familleRepository.count() == 0) {
            // Si la table est vide, alors insérer les données
            List<Famille> familles = Arrays.asList(
                    new Famille("SN0221__JD", "Moussa", "Ndiaye", 30, "M", "Parent"),
                    new Famille("SN0221__JS", "Ablaye", "Cisse", 28, "F", "Parent"),
                    new Famille("SN0221__AD", "Yurri", "Malinine", 5, "F", "Enfant"),
                    new Famille("SN0221__BD", "Fatou", "WADE", 20, "M", "Femme")
                    // Ajoutez d'autres familles si nécessaire
            );

            familleRepository.saveAll(familles);

            System.out.println("Data loaded successfully.");
        } else {
            System.out.println("Data already exists in Famille table. Skipping insertion.");
        }
    }
}
*/
