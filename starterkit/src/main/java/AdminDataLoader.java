/*


import com.starterkit.model.Admin;
import com.starterkit.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataLoader implements ApplicationRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminDataLoader(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        // Vérification et création du premier administrateur si aucun n'existe
        if (adminRepository.count() == 0) {
            String username = "admin";
            String rawPassword = "passe";
            String email = "admin@mirahtec.com";
            String encodedPassword = passwordEncoder.encode(rawPassword);

            Admin admin = new Admin(username, encodedPassword, email);
            adminRepository.save(admin);
            System.out.println("Admin user 'admin' created successfully.");
        } else {
            System.out.println("Admin user 'admin' already exists. Skipping admin creation.");
        }

        // Vérification et création d'un nouvel administrateur
        if (!adminRepository.existsByUsername("MagibBa")) {
            String newUsername = "MagibBa";
            String newRawPassword = "passe";
            String newEmail = "Ba@mirahtec.com";
            String newEncodedPassword = passwordEncoder.encode(newRawPassword);

            Admin newAdmin = new Admin(newUsername, newEncodedPassword, newEmail);
            adminRepository.save(newAdmin);
            System.out.println("Admin user 'MagibBa' created successfully.");
        } else {
            System.out.println("Admin user 'MagibBa' already exists. Skipping admin creation.");
        }
    }


}
*/
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
            String username = "admin";
            String rawPassword = "passe";
            String email = "admin@mirahtec.com";
            String encodedPassword = passwordEncoder.encode(rawPassword);

            // Récupérer le Consulat avec l'ID 1 (assurez-vous qu'il existe déjà en base de données)
            Consulat consulat = consulatRepository.findById(1L).orElseThrow(() -> new RuntimeException("Consulat with id 1 not found"));

            Admin admin = new Admin(username, encodedPassword, email, consulat);
            adminRepository.save(admin);
            System.out.println("Admin user 'admin' created successfully.");
        } else {
            System.out.println("Admin user 'admin' already exists. Skipping admin creation.");
        }

        // Vérification et création d'un nouvel administrateur
        if (!adminRepository.existsByUsername("MagibBa")) {
            String newUsername = "MagibBa";
            String newRawPassword = "passe";
            String newEmail = "Ba@mirahtec.com";
            String newEncodedPassword = passwordEncoder.encode(newRawPassword);

            // Récupérer à nouveau le Consulat avec l'ID 1 pour le nouvel admin
            Consulat consulat = consulatRepository.findById(2L).orElseThrow(() -> new RuntimeException("Consulat with id 1 not found"));

            Admin newAdmin = new Admin(newUsername, newEncodedPassword, newEmail, consulat);
            adminRepository.save(newAdmin);
            System.out.println("Admin user 'MagibBa' created successfully.");
        } else {
            System.out.println("Admin user 'MagibBa' already exists. Skipping admin creation.");
        }
    }
}
