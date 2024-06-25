/*
package com.starterkit;

import com.starterkit.model.AttacherFamilliale;
import com.starterkit.repository.AttacherFamillialeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class AttacherFamillialeDataLoader implements ApplicationRunner {

    private final AttacherFamillialeRepository attacherFamillialeRepository;

    @Autowired
    public AttacherFamillialeDataLoader(AttacherFamillialeRepository attacherFamillialeRepository) {
        this.attacherFamillialeRepository = attacherFamillialeRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (attacherFamillialeRepository.count() == 0) {
            List<AttacherFamilliale> attacherFamilliales = Arrays.asList(
                    new AttacherFamilliale("12345", "Ousmane", "Diop", "771234567", "Father", "123 Rue Principale"),
                    new AttacherFamilliale("67890", "Awa", "Ndiaye", "772345678", "Mother", "456 Rue de l'Oak"),
                    new AttacherFamilliale("54321", "Fatou", "Ba", "773456789", "Daughter", "789 Rue du Pin"),
                    new AttacherFamilliale("98765", "Moussa", "Diallo", "774567890", "Son", "101 Rue de l'Érable"),
                    new AttacherFamilliale("11223", "Aminata", "Faye", "775678901", "Sister", "234 Avenue de la Liberté"),
                    new AttacherFamilliale("33445", "Cheikh", "Sow", "776789012", "Brother", "567 Boulevard de la Paix")
                    // Ajoutez d'autres attacher familliales si nécessaire
            );

            attacherFamillialeRepository.saveAll(attacherFamilliales);
            System.out.println("Data loaded successfully.");
        } else {
            System.out.println("Data already exists in AttacherFamilliale table. Skipping insertion.");
        }
    }
}
*/
