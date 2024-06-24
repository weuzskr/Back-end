package com.starterkit.controller;

import com.starterkit.model.UserDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import com.starterkit.model.AuthResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api")
public class RestLoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Récupérer les détails de l'utilisateur authentifié
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().iterator().next().getAuthority();
            String email = userDetails.getUsername(); // Assuming username is the email

            // Créer l'objet de réponse utilisateur
            UserDetailsResponse userDetailsResponse = new UserDetailsResponse(role, email, username);

            // Créer l'objet de réponse global
            AuthResponse authResponse = new AuthResponse("Login successful", userDetailsResponse);

            // Retourner la réponse avec le statut HTTP 200 OK
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            // En cas d'échec d'authentification, retourner une réponse avec un code d'erreur approprié
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
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
