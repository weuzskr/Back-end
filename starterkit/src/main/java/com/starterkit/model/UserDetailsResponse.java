package com.starterkit.model;

public class UserDetailsResponse {
    private String role;
    private String email;
    private String username;

    public UserDetailsResponse() {
    }

    public UserDetailsResponse(String role, String email, String username) {
        this.role = role;
        this.email = email;
        this.username = username;
    }

    // Getters et setters
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
