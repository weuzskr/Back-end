package com.starterkit.model;

import javax.persistence.*;

@Entity
@Table(name = "famille")
public class Famille {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricule", unique = true)
    private String matricule;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "nom")
    private String nom;

    @Column(name = "age")
    private int age;

    @Column(name = "sexe")
    private String sexe;

    @Column(name = "type")
    private String type;

    @ManyToOne
    @JoinColumn(name = "citoyen_id", nullable = false)
    private Citoyen citoyen;

    // Constructeurs, getters et setters

    public Famille() {
    }

    public Famille(String matricule, String prenom, String nom, int age, String sexe, String type) {
        this.matricule = matricule;
        this.prenom = prenom;
        this.nom = nom;
        this.age = age;
        this.sexe = sexe;
        this.type = type;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Citoyen getCitoyen() {
        return citoyen;
    }

    public void setCitoyen(Citoyen citoyen) {
        this.citoyen = citoyen;
    }
}
