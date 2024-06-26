package com.starterkit.model;

import javax.persistence.*;

@Entity
@Table(name = "profession")
public class Profession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "secteur_dactivites", nullable = false)
    private String secteurDactivites;

    // Default constructor
    public Profession() {
    }

    // Constructor with parameters
    public Profession(String secteurDactivites) {
        this.secteurDactivites = secteurDactivites;
    }

    public Long getId() {
        return id;
    }

    public String getSecteurDactivites() {
        return secteurDactivites;
    }

    public void setSecteurDactivites(String secteurDactivites) {
        this.secteurDactivites = secteurDactivites;
    }
}
