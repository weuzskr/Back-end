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
                             ConsulatRepository consulatRepository) {
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
                    new Citoyen("12345", "Diop", "Ousmane", LocalDate.of(1990, 1, 1), "Dakar", "Sénégal", "M", 1.75f, "771234567", "photo1.jpg", "signature1.png", "Paris, France", "empreinte1", "Célibataire", profession, attacherFamilliale, famille, consulat),
                    new Citoyen("67890", "Ndiaye", "Awa", LocalDate.of(1985, 5, 20), "Saint-Louis", "Sénégal", "F", 1.65f, "772345678", "photo2.jpg", "signature2.png", "New York, USA", "empreinte2", "Mariée", profession, attacherFamilliale, famille, consulat),
                    new Citoyen("54321", "Ba", "Fatou", LocalDate.of(1995, 3, 15), "Thiès", "Sénégal", "F", 1.70f, "773456789", "photo3.jpg", "signature3.png", "Tokyo, Japon", "empreinte3", "Célibataire", profession, attacherFamilliale, famille, consulat),
                    new Citoyen("98765", "Diallo", "Moussa", LocalDate.of(1980, 7, 10), "Kaolack", "Sénégal", "M", 1.80f, "774567890", "photo4.jpg", "signature4.png", "Berlin, Allemagne", "empreinte4", "Marié", profession, attacherFamilliale, famille, consulat),
                    new Citoyen("11223", "Sow", "Mamadou", LocalDate.of(1992, 12, 25), "Touba", "Sénégal", "M", 1.78f, "775678901", "photo5.jpg", "signature5.png", "Shanghai, Chine", "empreinte5", "Célibataire", profession, attacherFamilliale, famille, consulat),
                    new Citoyen("44556", "Faye", "Aissatou", LocalDate.of(1988, 8, 30), "Ziguinchor", "Sénégal", "F", 1.68f, "776789012", "photo6.jpg", "signature6.png", "Buenos Aires, Argentine", "empreinte6", "Mariée", profession, attacherFamilliale, famille, consulat),
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
}
