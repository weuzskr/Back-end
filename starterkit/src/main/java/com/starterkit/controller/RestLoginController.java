package com.starterkit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
            return "Login successful";
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
