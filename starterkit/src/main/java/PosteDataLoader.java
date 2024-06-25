package com.starterkit;

import com.starterkit.model.Poste;
import com.starterkit.repository.PosteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;



@Component
public class PosteDataLoader implements ApplicationRunner {

    private final PosteRepository posteRepository;

    @Autowired
    public PosteDataLoader(PosteRepository posteRepository) {
        this.posteRepository = posteRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (posteRepository.count() == 0) {
            List<String> postes = Arrays.asList(
                    "Abidjan",
                    "Bordeaux",
                    "Casablanca",
                    "Djeddah",
                    "Le Havre",
                    "Lusaka",
                    "Lagos",
                    "Lyon",
                    "Madrid",
                    "Marseille",
                    "Milan",
                    "Naples",
                    "New York",
                    "Paris",
                    "Gouanghzou",
                    "Pointe Noire"
            );

            postes.forEach(nom -> {
                Poste poste = new Poste(nom);
                posteRepository.save(poste);
            });

            System.out.println("Postes loaded successfully.");
        } else {
            System.out.println("Postes already exist in the database. Skipping DataLoader.");
        }
    }
}
