/*
package com.starterkit;

import com.starterkit.model.Juridiction;
import com.starterkit.model.Poste;
import com.starterkit.repository.JuridictionRepository;
import com.starterkit.repository.PosteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class JuridictionDataLoader implements ApplicationRunner {

    private final JuridictionRepository juridictionRepository;
    private final PosteRepository posteRepository;

    @Autowired
    public JuridictionDataLoader(JuridictionRepository juridictionRepository, PosteRepository posteRepository) {
        this.juridictionRepository = juridictionRepository;
        this.posteRepository = posteRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (juridictionRepository.count() == 0) {
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
                if (posteRepository.findByNom(nom).isEmpty()) {
                    Poste poste = new Poste(nom);
                    posteRepository.save(poste);
                }
            });

            // Add Juridictions and associate them with the corresponding Poste
            addJuridictions();

            System.out.println("Data loaded successfully.");
        } else {
            System.out.println("Data already exists. Skipping data loading.");
        }
    }

    private void addJuridictions() {
        List<JuridictionData> juridictionDataList = Arrays.asList(
                new JuridictionData("CÔTE D’IVOIRE", "Abidjan"),
                new JuridictionData("EMIRATS ARABES UNIS", "Djeddah"),
                new JuridictionData("NIGÉRIA", "Lagos"),
                new JuridictionData("GHANA, BÉNIN", "Lyon"),
                new JuridictionData("ETHIOPIE, TANZANIE, SOMALIE, DJIBOUTI, COMORES", "Madrid"),
                new JuridictionData("ALGÉRIE", "Marseille"),
                new JuridictionData("TURQUIE", "Milan")
        );

        juridictionDataList.forEach(data -> {
            Poste poste = posteRepository.findByNom(data.getPosteNom()).orElseThrow(
                    () -> new RuntimeException("Poste not found: " + data.getPosteNom())
            );
            Juridiction juridiction = new Juridiction(data.getJuridictionNom(), poste);
            juridictionRepository.save(juridiction);
        });
    }

    private static class JuridictionData {
        private final String juridictionNom;
        private final String posteNom;

        public JuridictionData(String juridictionNom, String posteNom) {
            this.juridictionNom = juridictionNom;
            this.posteNom = posteNom;
        }

        public String getJuridictionNom() {
            return juridictionNom;
        }

        public String getPosteNom() {
            return posteNom;
        }
    }
}
*/
