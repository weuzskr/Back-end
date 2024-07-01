package com.starterkit.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Random;
import java.util.Set;

@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricule", nullable = false, unique = true)
    private String matricule;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "adresse", nullable = false)
    private String adresse;

    @Column(name = "statut", nullable = false)
    private String statut;

    @Column(unique = true)
    private String username;

    private String password;

    @Column(unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "admin_roles",
            joinColumns = @JoinColumn(name = "admin_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    @JsonManagedReference
    private Set<Role> roles;

    @OneToOne
    @JoinColumn(name = "consulat_id", unique = true)
    private Consulat consulat;

    // Constructors, getters, and setters
    public Admin() {}

    public Admin(String username, String password, String email, String nom, String prenom, String adresse, String statut, Consulat consulat) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.statut = statut;
        this.consulat = consulat;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @JsonIgnore
    public Consulat getConsulat() {
        return consulat;
    }

    public void setConsulat(Consulat consulat) {
        this.consulat = consulat;
    }

    @PrePersist
    private void generateMatricule() {
        // Générer un matricule aléatoire de format "ADMIN-XXXXX-SN"
        Random random = new Random();
        int matriculeNumber = random.nextInt(90000) + 10000; // Pour générer un nombre aléatoire à 5 chiffres
        this.matricule = "DIP-" + matriculeNumber + "-SN";
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
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

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getStatus() {
        return statut;
    }

    public void setStatus(String status) {
        this.statut = status;
    }
}
