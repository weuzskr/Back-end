package com.starterkit;

import com.starterkit.model.Region;
import com.starterkit.model.Departement;
import com.starterkit.repository.RegionRepository;
import com.starterkit.repository.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class RegionDepartementDataLoader implements ApplicationRunner {

    private final RegionRepository regionRepository;
    private final DepartementRepository departementRepository;

    @Autowired
    public RegionDepartementDataLoader(RegionRepository regionRepository, DepartementRepository departementRepository) {
        this.regionRepository = regionRepository;
        this.departementRepository = departementRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (regionRepository.count() == 0) {
            addRegionsAndDepartements();
        } else {
            System.out.println("Data already loaded. Skipping data loading.");
        }
    }

    private void addRegionsAndDepartements() {
        // Adding regions
        List<String> regions = Arrays.asList(
                "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire", "Corse", "Grand Est",
                "Hauts-de-France", "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire",
                "Provence-Alpes-Côte d'Azur", "Guadeloupe", "Martinique", "Guyane", "La Réunion", "Mayotte",
                "Terres Australes et Antarctiques", "Wallis et Futuna", "Polynésie Française", "Nouvelle-Calédonie",
                "Saint-Pierre-et-Miquelon", "Saint-Barthélemy", "Saint-Martin"
        );

        for (String regionName : regions) {
            Region region = new Region(regionName);
            regionRepository.save(region);
        }

        // Adding departements with correct region assignments
        addDepartements();
    }

    private void addDepartements() {
        // Define regions and their corresponding departements
        String[][] regionDepartements = {
                {"Auvergne-Rhône-Alpes", "Ain", "Allier", "Ardèche", "Cantal", "Drôme", "Isère", "Loire", "Haute-Loire", "Puy-de-Dôme", "Rhône", "Métropole de Lyon", "Savoie", "Haute-Savoie"},
                {"Bourgogne-Franche-Comté", "Côte-d'Or", "Doubs", "Jura", "Nièvre", "Haute-Saône", "Saône-et-Loire", "Yonne", "Territoire de Belfort"},
                {"Bretagne", "Côtes-d'Armor", "Finistère", "Ille-et-Vilaine", "Morbihan"},
                // Add other regions and their corresponding departements...
        };

        for (String[] regionDepartement : regionDepartements) {
            Optional<Region> regionOpt = regionRepository.findByNom(regionDepartement[0]);
            if (regionOpt.isPresent()) {
                Region region = regionOpt.get();
                for (int i = 1; i < regionDepartement.length; i++) {
                    Departement departement = new Departement(regionDepartement[i], region);
                    departementRepository.save(departement);
                }
            }
        }

        System.out.println("Region and Departement data loaded successfully.");
    }
}
