package com.starterkit.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany
    @JoinTable(name = "consulat_region",
            joinColumns = @JoinColumn(name = "consulat_id"),
            inverseJoinColumns = @JoinColumn(name = "region_id"))
    private Set<Region> regions;

    /*@ManyToMany
    @JoinTable(
            name = "consulat_departement",
            joinColumns = @JoinColumn(name = "consulat_id"),
            inverseJoinColumns = @JoinColumn(name = "departement_id")
    )
    private Set<Departement> departements = new HashSet<>();*/

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

    public Set<Region> getRegions() {
        return regions;
    }

    public void setRegions(Set<Region> regions) {
        this.regions = regions;
    }
  /* public Set<Departement> getDepartements() {
       return departements;
   }

    public void setDepartements(Set<Departement> departements) {
        this.departements = departements;
    }*/
}
