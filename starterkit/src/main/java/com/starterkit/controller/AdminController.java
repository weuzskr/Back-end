package com.starterkit.controller;

import com.starterkit.model.Admin;
import com.starterkit.repository.AdminRepository;
import com.starterkit.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminRepository adminRepository;
    @Autowired
    private AdminService adminService;

    @Autowired
    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminRepository.findAll();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }
    /**
     * Récuperer les Admin par role id.
     *
     * a list of admins with the specified role id
     */
    @GetMapping("/by-role")
    public List<Admin> getAdminsByRoleId() {
        return adminService.getAdminsByRoleId();
    }
}
