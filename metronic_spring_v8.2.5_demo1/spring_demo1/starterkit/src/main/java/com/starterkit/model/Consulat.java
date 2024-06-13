package com.starterkit.model;

import javax.persistence.*;

@Entity
@Table(name = "consulat")
public class Consulat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "statut")
    private String statut;


    @OneToOne
    @JoinColumn(name = "poste_id", unique = true)
    private Poste poste;

    // Constructeurs, getters et setters

    public Consulat() {
    }

    public Consulat(String nom, Poste poste) {
        this.nom = nom;
        this.poste = poste;
    }
    public Consulat(String nom, Poste poste, String statut) {
        this.nom = nom;
        this.poste = poste;
        this.statut = statut;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Poste getPoste() {
        return poste;
    }

    public void setPoste(Poste poste) {
        this.poste = poste;
    }
}
