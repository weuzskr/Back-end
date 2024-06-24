package com.starterkit.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResponse {
    @JsonProperty("message")
    private String message;

    @JsonProperty("user")
    private UserDetailsResponse user;

    public AuthResponse() {
        // Constructeur par défaut requis par Jackson
    }

    public AuthResponse(String message, UserDetailsResponse user) {
        this.message = message;
        this.user = user;
    }

    // Getters et Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserDetailsResponse getUser() {
        return user;
    }

    public void setUser(UserDetailsResponse user) {
        this.user = user;
    }
}
