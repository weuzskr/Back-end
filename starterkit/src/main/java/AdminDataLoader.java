package com.starterkit;

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
        if (adminRepository.count() == 0) {
            String username = "admin";
            String rawPassword = "passe";
            String email = "admin@mirahtec.com";
            String encodedPassword = passwordEncoder.encode(rawPassword);

            Admin admin = new Admin(username, encodedPassword, email);
            adminRepository.save(admin);

            System.out.println("Admin user created successfully.");
        } else {
            System.out.println("Admin user already exists. Skipping admin creation.");
        }
    }
}
