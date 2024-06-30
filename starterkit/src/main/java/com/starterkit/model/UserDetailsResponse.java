/*
package com.starterkit.model;

public class UserDetailsResponse {
    private String role;
    private String email;
    private String username;
    private Long consulatId;
    private String nom;
    private String prenom;
    private String adresse;
    private String status;

    public Long getConsulatId() {
        return consulatId;
    }

    public void setConsulatId(Long consulatId) {
        this.consulatId = consulatId;
    }

    public UserDetailsResponse(Long consulatId) {
        this.consulatId = consulatId;
    }

    public UserDetailsResponse(String role, String email, String username, Long consulatId
     , String nom, String prenom, String adresse, String status) {
        this.role = role;
        this.email = email;
        this.username = username;
        this.consulatId = consulatId;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.status = status;
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
*/

package com.starterkit.model;

public class UserDetailsResponse {
    private String role;
    private String email;
    private String username;
    private Long consulatId;
    private String nom;
    private String prenom;
    private String adresse;
    private String status;

    // Constructors
    public UserDetailsResponse() {}

    public UserDetailsResponse(Long consulatId) {
        this.consulatId = consulatId;
    }

    public UserDetailsResponse(String role, String email, String username, Long consulatId, String nom, String prenom, String adresse, String status) {
        this.role = role;
        this.email = email;
        this.username = username;
        this.consulatId = consulatId;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.status = status;
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

    public Long getConsulatId() {
        return consulatId;
    }

    public void setConsulatId(Long consulatId) {
        this.consulatId = consulatId;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
