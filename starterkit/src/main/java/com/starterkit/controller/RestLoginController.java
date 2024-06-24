package com.starterkit.controller;

import com.starterkit.model.UserDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import com.starterkit.model.AuthResponse;
import com.starterkit.model.LoginRequest;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api")
public class RestLoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Récupérer les détails de l'utilisateur authentifié
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().iterator().next().getAuthority();
            String email = userDetails.getUsername(); // Assuming username is the email

            // Créer l'objet de réponse utilisateur
            UserDetailsResponse userDetailsResponse = new UserDetailsResponse(role, email, loginRequest.getUsername());

            // Créer l'objet de réponse global
            AuthResponse authResponse = new AuthResponse("Login successful", userDetailsResponse);

            // Retourner la réponse avec le statut HTTP 200 OK
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            // En cas d'échec d'authentification, renvoyer une réponse avec un code d'erreur
            // approprié
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    // ...
}