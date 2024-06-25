package com.starterkit.model;

import javax.persistence.*;

@Entity
@Table(name = "attacher_familliale")
public class AttacherFamilliale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricule", nullable = false)
    private String matricule;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "nom", nullable = false)
    private String nom;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "numero_de_telephone", nullable = false)
    private String numeroDeTelephone;

    @Column(name = "lien_de_parente", nullable = false)
    private String lienDeParente;

    @Column(name = "adresse", nullable = false)
    private String adresse;

    public AttacherFamilliale() {}

    public AttacherFamilliale(String matricule, String prenom, String nom, String numeroDeTelephone, String lienDeParente, String adresse) {
        this.matricule = matricule;
        this.prenom = prenom;
        this.nom = nom;
        this.numeroDeTelephone = numeroDeTelephone;
        this.lienDeParente = lienDeParente;
        this.adresse = adresse;
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
}
