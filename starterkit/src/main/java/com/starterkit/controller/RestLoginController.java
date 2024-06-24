package com.starterkit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api")
public class RestLoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")

    public String login(@RequestParam String username, @RequestParam String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Récupérer les rôles de l'utilisateur authentifié
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            String role = authorities.iterator().next().getAuthority(); // Prend le premier rôle

            // Récupérer l'email de l'utilisateur
            String email = authentication.getName(); // C'est l'email de l'utilisateur

            // Renvoyer le rôle, l'email et le nom de l'utilisateur
            return "Login successful. Role: " + role + ", Email: " + email + ", Username: " + username;
        } catch (AuthenticationException e) {
            return "Login failed: " + e.getMessage();
        }
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }
}
