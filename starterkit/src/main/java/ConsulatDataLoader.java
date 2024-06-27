/*
package com.starterkit;

import com.starterkit.model.Consulat;
import com.starterkit.model.Poste;
import com.starterkit.repository.ConsulatRepository;
import com.starterkit.repository.PosteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class ConsulatDataLoader implements ApplicationRunner {

    private final ConsulatRepository consulatRepository;
    private final PosteRepository posteRepository;

    @Autowired
    public ConsulatDataLoader(ConsulatRepository consulatRepository, PosteRepository posteRepository) {
        this.consulatRepository = consulatRepository;
        this.posteRepository = posteRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        // Check if data already exists to prevent duplication
        if (consulatRepository.count() == 0) {
            addConsulats();
        } else {
            System.out.println("Data already loaded. Skipping data loading.");
        }
    }

    private void addConsulats() {
        List<String> postes = Arrays.asList(
                "Abidjan", "Bordeaux", "Casablanca", "Djeddah", "Le Havre",
                "Lusaka", "Lagos", "Lyon", "Madrid", "Marseille",
                "Milan", "Naples", "New York", "Paris", "Gouanghzou", "Pointe Noire"
        );

        List<String> statuts = Arrays.asList(
                "Consul général", "Consul général", "Consul général", "Consul général", "Bureau consulaire",
                "Consulat général", "Consulat général", "Consulat général", "Consulat général", "Consulat général",
                "Consulat général", "Consulat", "Consul général", "Consul général", "Consul général", "Consul général"
        );

        for (int i = 0; i < postes.size(); i++) {
            String nom = postes.get(i);
            String statut = statuts.get(i);
            Optional<Poste> posteOptional = posteRepository.findByNom(nom);

            if (posteOptional.isPresent()) {
                Poste poste = posteOptional.get();
                Consulat consulat = new Consulat(nom, poste, statut);
                consulatRepository.save(consulat);
            } else {
                throw new RuntimeException("Poste not found: " + nom);
            }
        }

        System.out.println("Consulat data loaded successfully.");
    }
}
*/
