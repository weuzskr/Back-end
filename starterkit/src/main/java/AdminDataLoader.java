/*

 package com.starterkit;

 import com.starterkit.model.Admin;
 import com.starterkit.model.Consulat;
 import com.starterkit.repository.AdminRepository;
 import com.starterkit.repository.ConsulatRepository;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.ApplicationArguments;
 import org.springframework.boot.ApplicationRunner;
 import org.springframework.security.crypto.password.PasswordEncoder;
 import org.springframework.stereotype.Component;
 import org.springframework.transaction.annotation.Transactional;

 @Component
 public class AdminDataLoader implements ApplicationRunner {

 private final AdminRepository adminRepository;
 private final ConsulatRepository consulatRepository;
private final PasswordEncoder passwordEncoder;

 @Autowired
 public AdminDataLoader(AdminRepository adminRepository, ConsulatRepository
 consulatRepository, PasswordEncoder passwordEncoder) {
 this.adminRepository = adminRepository;
 this.consulatRepository = consulatRepository;
 this.passwordEncoder = passwordEncoder;
 }

 @Override

 @Transactional
 public void run(ApplicationArguments args) {
 // Vérification et création du premier administrateur si aucun n'existe
 if (adminRepository.count() == 0) {
 String username1 = "admin";
 String rawPassword1 = "passe";
 String email1 = "admin@mirahtec.com";
 String encodedPassword1 = passwordEncoder.encode(rawPassword1);
 Consulat consulat1 = consulatRepository.findById(1L).orElseThrow(() -> new
 RuntimeException("Consulat with id 1 not found"));
 Admin admin1 = new Admin(username1, encodedPassword1, email1, consulat1);
 adminRepository.save(admin1);
 System.out.println("Admin user 'admin' created successfully.");

 String username2 = "MagibBa";
 String rawPassword2 = "passe";
 String email2 = "Ba@mirahtec.com";
 String encodedPassword2 = passwordEncoder.encode(rawPassword2);
 Consulat consulat2 = consulatRepository.findById(2L).orElseThrow(() -> new
 RuntimeException("Consulat with id 2 not found"));
 Admin admin2 = new Admin(username2, encodedPassword2, email2, consulat2);
 adminRepository.save(admin2);
 System.out.println("Admin user 'MagibBa' created successfully.");

 String username3 = "admin1";
 String rawPassword3 = "passe";
 String email3 = "admin1@mirahtec.com";
 String encodedPassword3 = passwordEncoder.encode(rawPassword3);
 Consulat consulat3 = consulatRepository.findById(5L).orElseThrow(() -> new
 RuntimeException("Consulat with id 5 not found"));
 Admin admin3 = new Admin(username3, encodedPassword3, email3, consulat3);
 adminRepository.save(admin3);
 System.out.println("Admin user 'admin3' created successfully.");

 String username4 = "zuber";
 String rawPassword4 = "passe";
 String email4 = "zuber@mirahtec.com";
 String encodedPassword4 = passwordEncoder.encode(rawPassword4);
 Consulat consulat4 = consulatRepository.findById(10L).orElseThrow(() -> new
 RuntimeException("Consulat with id 10 not found"));
 Admin admin4 = new Admin(username4, encodedPassword4, email4, consulat4);
 adminRepository.save(admin4);
 System.out.println("Admin user 'Zuber Stephane' created successfully.");
 } else {
 System.out.println("Admin users already exist. Skipping admin creation.");
 }
 }
 }


*//*


package com.starterkit;

import com.starterkit.model.Admin;
import com.starterkit.model.Consulat;
import com.starterkit.repository.AdminRepository;
import com.starterkit.repository.ConsulatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class AdminDataLoader implements ApplicationRunner {

    private final AdminRepository adminRepository;
    private final ConsulatRepository consulatRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminDataLoader(AdminRepository adminRepository, ConsulatRepository consulatRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.consulatRepository = consulatRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        // Vérification et création du premier administrateur si aucun n'existe
        if (adminRepository.count() == 0) {
            createAdmin("admin", "passe", "admin@mirahtec.com", 1L, "Moussa", "Ndiaye", "123 Rue de Paris", "Actif");
            createAdmin("MagibBa", "passe", "Ba@mirahtec.com", 2L, "Martin", "Kane", "456 Avenue Blaise Diagne", "Actif");
            createAdmin("admin1", "passe", "admin1@mirahtec.com", 5L, "Fatou", "Sow", "Avenue Vittorio Emanuele II, Bergame", "Inactif");
            createAdmin("zuber", "passe", "zuber@mirahtec.com", 10L, "Zuber", "Stephane", "321 Kramgasse, Berne", "Actif");
        } else {
            System.out.println("Les admin existent deja vous pouvais commenter le fichier.");
        }
    }

    private void createAdmin(String username, String rawPassword, String email, Long consulatId, String nom, String prenom, String adresse, String statut) {
        String encodedPassword = passwordEncoder.encode(rawPassword);
        Consulat consulat = consulatRepository.findById(consulatId)
                .orElseThrow(() -> new RuntimeException("Consulat with id " + consulatId + " not found"));
        Admin admin = new Admin(username, encodedPassword, email, nom, prenom, adresse, statut, consulat);
        adminRepository.save(admin);
        System.out.println("Admin user '" + username + "' creer avec succes.");
    }
}
*/
