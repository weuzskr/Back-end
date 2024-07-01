/*
 * package com.starterkit;
 * 
 * import com.starterkit.model.Poste;
 * import com.starterkit.repository.PosteRepository;
 * import org.springframework.beans.factory.annotation.Autowired;
 * import org.springframework.boot.ApplicationArguments;
 * import org.springframework.boot.ApplicationRunner;
 * import org.springframework.stereotype.Component;
 * 
 * import java.util.Arrays;
 * import java.util.Collections;
 * import java.util.List;
 * 
 * @Component
 * public class PosteDataLoader implements ApplicationRunner {
 * 
 * private final PosteRepository posteRepository;
 * 
 * @Autowired
 * public PosteDataLoader(PosteRepository posteRepository) {
 * this.posteRepository = posteRepository;
 * }
 * 
 * @Override
 * public void run(ApplicationArguments args) {
 * List<String> postes = Arrays.asList(
 * "Abidjan", "Abu Dhabi", "Abuja", "Accra", "Addis-Abeba", "Alger", "Ankara",
 * "Bamako", "Banjul", "Brazzaville", "Beijing", "Berlin", "Bissau", "Brasilia",
 * "Bruxelles", "Conakry", "Doha", "Genève", "Koweït-City", "Kuala Lumpur",
 * "La Haye", "Le Caire", "Nouakchott", "Ottawa", "Ouagadougou", "Paris",
 * "Praia",
 * "Pretoria", "Rabat", "Libreville", "Lisbonne", "Lomé", "Londres", "Madrid",
 * "Mascate", "Moscou", "New-Delhi", "Riyadh", "Rome Quirinal", "Rome Vatican",
 * "Séoul", "Tokyo", "Tripoli", "Tunis", "Yaoundé", "Washington", "Varsovie",
 * "Téhéran", "Nairobi", "Niamey", "Kinshasa", "Bordeaux", "Casablanca",
 * "Djeddah",
 * "Le Havre", "Lusaka", "Lagos", "Lyon", "Marseille", "Milan", "Naples",
 * "New York", "Gouanghzou", "Pointe Noire");
 * 
 * // Trier les postes par ordre alphabétique
 * Collections.sort(postes);
 * 
 * postes.forEach(nom -> {
 * if (!posteRepository.existsByNom(nom)) {
 * Poste poste = new Poste(nom);
 * posteRepository.save(poste);
 * }
 * });
 * 
 * System.out.println("Postes loaded successfully.");
 * }
 * }
 */