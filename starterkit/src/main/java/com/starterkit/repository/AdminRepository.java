package com.starterkit.repository;

import com.starterkit.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    boolean existsByUsername(String username);
    Optional<Admin> findByUsername(String username);
    Optional<Admin> findByEmail(String email);
}
