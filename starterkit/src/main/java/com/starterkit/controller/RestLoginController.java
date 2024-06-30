/*

package com.starterkit.controller;

import com.starterkit.model.Admin;
import com.starterkit.model.UserDetailsResponse;
import com.starterkit.model.AuthResponse;
import com.starterkit.model.LoginRequest;
import com.starterkit.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RestLoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AdminService adminService; // Ajoutez le service pour récupérer Admin

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Récupérer les détails de l'utilisateur authentifié
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().iterator().next().getAuthority();
            String email = userDetails.getUsername();

            // Récupérer l'objet Admin en utilisant l'email
            Optional<Admin> admin = adminService.findByEmail(userDetails.getUsername());
            Long consulatId = (admin.isPresent() && admin.get().getConsulat() != null) ? admin.get().getConsulat().getId() : null;

            // Créer l'objet de réponse utilisateur
            UserDetailsResponse userDetailsResponse = new UserDetailsResponse(role, email, admin.get().getUsername(), consulatId);

            // Créer l'objet de réponse global
            AuthResponse authResponse = new AuthResponse("Login successful", userDetailsResponse);

            // Retourner la réponse avec le statut HTTP 200 OK
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            // En cas d'échec d'authentification, renvoyer une réponse avec un code d'erreur approprié
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }
}
*/
package com.starterkit.controller;

import com.starterkit.model.Admin;
import com.starterkit.model.UserDetailsResponse;
import com.starterkit.model.AuthResponse;
import com.starterkit.model.LoginRequest;
import com.starterkit.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RestLoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AdminService adminService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Récupérer les détails de l'utilisateur authentifié
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().iterator().next().getAuthority();
            String email = userDetails.getUsername();

            // Récupérer l'objet Admin en utilisant l'email
            Optional<Admin> adminOptional = adminService.findByEmail(userDetails.getUsername());
            if (!adminOptional.isPresent()) {
                return ResponseEntity.badRequest().body("Admin not found");
            }

            Admin admin = adminOptional.get();
            Long consulatId = (admin.getConsulat() != null) ? admin.getConsulat().getId() : null;

            // Créer l'objet de réponse utilisateur avec les nouveaux champs
            UserDetailsResponse userDetailsResponse = new UserDetailsResponse(
                    role,
                    email,
                    admin.getUsername(),
                    consulatId,
                    admin.getNom(),
                    admin.getPrenom(),
                    admin.getAdresse(),
                    admin.getStatus()
            );

            // Créer l'objet de réponse global
            AuthResponse authResponse = new AuthResponse("Login successful", userDetailsResponse);

            // Retourner la réponse avec le statut HTTP 200 OK
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            // En cas d'échec d'authentification, renvoyer une réponse avec un code d'erreur approprié
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }
}
