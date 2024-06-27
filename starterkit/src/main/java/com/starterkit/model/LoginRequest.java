
package com.starterkit.model;

public class LoginRequest {
    private String username;
    private String password;
    private String email;

    public LoginRequest(String username,String email, String password) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter pour password
    public String getPassword() {
        return password;
    }
}
