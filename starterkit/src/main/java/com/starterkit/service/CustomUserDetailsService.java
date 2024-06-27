package com.starterkit.service;

import com.starterkit.model.Admin;
import com.starterkit.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Admin> optionalAdmin = adminRepository.findByEmail(email);
        if (optionalAdmin.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        Admin admin = optionalAdmin.get();

        Set<GrantedAuthority> grantedAuthorities = admin.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(admin.getEmail(), admin.getPassword(), grantedAuthorities);
    }
}
