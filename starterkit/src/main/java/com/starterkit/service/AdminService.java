package com.starterkit.service;

import com.starterkit.model.Admin;
import com.starterkit.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

   public Optional<Admin> findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
   public Optional<Admin> findByEmail(String email) {
       return adminRepository.findByEmail(email);
   }
}
