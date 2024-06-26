package com.starterkit.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    @Column(name = "numero_de_telephone", nullable = false)
    private String numeroDeTelephone;

    @Column(name = "lien_de_parente", nullable = false)
    private String lienDeParente;

    @Column(name = "adresse", nullable = false)
    private String adresse;

    @ManyToOne
    @JoinColumn(name = "citoyen_id", nullable = false)
    @JsonIgnoreProperties("attacherFamilliales")
    private Citoyen citoyen;

    public AttacherFamilliale() {}

    public AttacherFamilliale(String matricule, String prenom, String nom, String numeroDeTelephone, String lienDeParente, String adresse) {
        this.matricule = matricule;
        this.prenom = prenom;
        this.nom = nom;
        this.numeroDeTelephone = numeroDeTelephone;
        this.lienDeParente = lienDeParente;
        this.adresse = adresse;
    }

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

    public String getNumeroDeTelephone() {
        return numeroDeTelephone;
    }

    public void setNumeroDeTelephone(String numeroDeTelephone) {
        this.numeroDeTelephone = numeroDeTelephone;
    }

    public String getLienDeParente() {
        return lienDeParente;
    }

    public void setLienDeParente(String lienDeParente) {
        this.lienDeParente = lienDeParente;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Citoyen getCitoyen() {
        return citoyen;
    }

    public void setCitoyen(Citoyen citoyen) {
        this.citoyen = citoyen;
    }
}
