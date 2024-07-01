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
                    "Abidjan", "Abu Dhabi", "Abuja", "Accra", "Addis-Abeba", "Alger", "Ankara",
                    "Bamako", "Banjul", "Brazzaville", "Beijing", "Berlin", "Bissau", "Brasilia",
                    "Bruxelles", "Conakry", "Doha", "Genève", "Koweït-City", "Kuala Lumpur",
                    "La Haye", "Le Caire", "Nouakchott", "Ottawa", "Ouagadougou", "Paris", "Praia",
                    "Pretoria", "Rabat", "Libreville", "Lisbonne", "Lomé", "Londres", "Madrid",
                    "Mascate", "Moscou", "New-Delhi", "Riyadh", "Rome Quirinal", "Rome Vatican",
                    "Séoul", "Tokyo", "Tripoli", "Tunis", "Yaoundé", "Washington", "Varsovie",
                    "Téhéran", "Nairobi", "Niamey", "Kinshasa", "Bordeaux", "Casablanca", "Djeddah",
                    "Le Havre", "Lusaka", "Lagos", "Lyon", "Marseille", "Milan", "Naples",
                    "New York", "Gouanghzou", "Pointe Noire"
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
                        new JuridictionData("NIGÉRIA", "Abuja"),
                        new JuridictionData("GHANA", "Accra"),
                        new JuridictionData("BENIN", "Accra"),
                        new JuridictionData("ETHIOPIE", "Addis-Abeba"),
                        new JuridictionData("TANZANIE", "Addis-Abeba"),
                        new JuridictionData("DJIBOUTI", "Addis-Abeba"),
                        new JuridictionData("COMORES", "Addis-Abeba"),
                        new JuridictionData("SOMALIE", "Addis-Abeba"),
                        new JuridictionData("MALI", "Bamako"),
                        new JuridictionData("FRANCE", "Marseille"),
                        new JuridictionData("AFRIQUE DU SUD", "Pretoria"),
                        new JuridictionData("MOZAMBIQUE", "Pretoria"),
                        new JuridictionData("ZAMBIE", "Pretoria"),
                        new JuridictionData("BOTSWANA", "Pretoria"),
                        new JuridictionData("ZIMBABWE", "Pretoria"),
                        new JuridictionData("MALAWI", "Pretoria"),
                        new JuridictionData("SWAZILAND", "Pretoria"),
                        new JuridictionData("LESOTHO", "Pretoria"),
                        new JuridictionData("NAMIBIE", "Pretoria"),
                        new JuridictionData("MADAGASCAR", "Pretoria"),
                        new JuridictionData("LES SEYCHELLES", "Pretoria"),
                        new JuridictionData("SAO-TOMÉ-ET-PRINCIPE", "Pretoria"),
                        new JuridictionData("MAURICE", "Pretoria"),
                        new JuridictionData("MAROC", "Rabat"),
                        new JuridictionData("ALLEMAGNE", "Berlin"),
                        new JuridictionData("AUTRICHE", "Berlin"),
                        new JuridictionData("BOSNIE-HERZÉGOVINE", "Berlin"),
                        new JuridictionData("BULGARIE", "Berlin"),
                        new JuridictionData("LIECHTENSTEIN", "Berlin"),
                        new JuridictionData("CROATIE", "Berlin"),
                        new JuridictionData("GEORGIE", "Berlin"),
                        new JuridictionData("HONGRIE", "Berlin"),
                        new JuridictionData("MOLDAVIE", "Berlin"),
                        new JuridictionData("POLOGNE", "Berlin"),
                        new JuridictionData("RÉPUBLIQUE TCHÈQUE", "Berlin"),
                        new JuridictionData("SLOVAQUIE", "Berlin"),
                        new JuridictionData("GUINÉE BISSAU", "Bissau"),
                        new JuridictionData("BRÉSIL", "Brasilia"),
                        new JuridictionData("BELGIQUE", "Bruxelles"),
                        new JuridictionData("LUXEMBOURG", "Bruxelles"),
                        new JuridictionData("GUINEE", "Conakry"),
                        new JuridictionData("QATAR","Doha"),
                        new JuridictionData("SUISSE","Genève"),
                        new JuridictionData("KOWEÏT", "Koweït-City"),
                        new JuridictionData("BAHREÏN", "Koweït-City"),
                        new JuridictionData("LIBAN", "Koweït-City"),
                        new JuridictionData("MALAISIE", "Kuala Lumpur"),
                        new JuridictionData("PAYS-BAS", "La Haye"),
                        new JuridictionData("SINGAPORE", "Koweït-City"),
                        //new JuridictionData("THAILAND", "Bangkok"),
                       // new JuridictionData("VIET NAM", "Hanoi"),
                        new JuridictionData("EGYPTE", "Le Caire"),
                        new JuridictionData("SOUDAN", "Le Caire"),
                        new JuridictionData("SYRIE", "Le Caire"),
                        new JuridictionData("SOUDAN DU SUD", "Le Caire"),
                        new JuridictionData("ERYTHRÉE", "Le Caire"),
                        new JuridictionData("LIBYE", "Le Caire"),
                        new JuridictionData("MAURITANIE", "Nouakchott"),
                        new JuridictionData("CANADA", "Ottawa"),
                        new JuridictionData("CUBA", "Ottawa"),
                        new JuridictionData("BURKINA FASO", "Ouagadougou"),
                        new JuridictionData("FRANCE", "Paris"),
                        new JuridictionData("MONACO", "Paris"),
                        new JuridictionData("ANDORRE", "Paris"),
                        new JuridictionData("CAP-VERT", "Praia"),
                        new JuridictionData("GABON", "Libreville"),
                        new JuridictionData("GUINÉE EQUATORIALE", "Libreville"),
                        new JuridictionData("BURUNDI", "Libreville"),
                        new JuridictionData("CENTRAFRIQUE", "Libreville"),
                        new JuridictionData("PORTUGAL", "Lisbonne"),
                        new JuridictionData("TOGO", "Lomé"),
                        new JuridictionData("GRANDE-BRETAGNE", "Londres"),
                        new JuridictionData("IRLANDE", "Londres"),
                        new JuridictionData("ESPAGNE", "Madrid"),
                        new JuridictionData("OMAN", "Mascate"),
                        new JuridictionData("ARMÉNIE", "Moscou"),
                        new JuridictionData("KAZAKHSTAN", "Moscou"),
                        new JuridictionData("BIÉLORUSSIE", "Moscou"),
                        new JuridictionData("RUSSIE", "Moscou"),
                        new JuridictionData("YÉMEN", "Riyadh"),
                        new JuridictionData("IRAK", "Riyadh"),
                                new JuridictionData("ARABIE SAOUDITE", "Riyadh"),
                        new JuridictionData("PHILIPPINES", "Tokyo"),
                        new JuridictionData("INDONÉSIE", "Tokyo"),
                                new JuridictionData("JAPON", "Tokyo"),
                        new JuridictionData("ANGOLA", "Yaoundé"),
                        new JuridictionData("TCHAD", "Yaoundé"),
                                new JuridictionData("CAMEROUN", "Yaoundé"),
                        new JuridictionData("ITALIE", "Rome Quirinal"),
                        new JuridictionData("VATICAN", "Rome Vatican"),
                        new JuridictionData("CORÉE", "Séoul"),
                        new JuridictionData("TUNISIE", "Tunis"),
                        new JuridictionData("INDE", "New-Delhi"),
                                new JuridictionData("ÉTATS-UNIS", "Washington"),
                                new JuridictionData("MEXIQUE", "Washington"),
                                new JuridictionData("ARGENTINE", "Washington"),
                                new JuridictionData("COSTA-RICA", "Washington"),
                                new JuridictionData("GUATEMALA", "Washington"),
                                new JuridictionData("NICARAGUA", "Washington"),
                                new JuridictionData("HONDURAS", "Washington"),
                                new JuridictionData("PANAMA", "Washington"),
                                new JuridictionData("CHILI", "Washington"),
                                new JuridictionData("POLOGNE", "Varsovie"),
                                new JuridictionData("IRAN", "Téhéran"),
                                new JuridictionData("KENYA", "Nairobi"),
                                new JuridictionData("RWANDA", "Nairobi"),
                                new JuridictionData("OUGANDA", "Nairobi"),
                                new JuridictionData("NIGER", "Niamey"),
                                new JuridictionData("RÉPUBLIQUE DÉMOCRATIQUE DU CONGO", "Kinshasa")

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
