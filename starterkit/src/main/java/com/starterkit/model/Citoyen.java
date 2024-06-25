package com.starterkit.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "citoyen")
public class Citoyen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricule", nullable = false, unique = true)
    private String matricule;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "date_de_naissance", nullable = false)
    private LocalDate dateDeNaissance;

    @Column(name = "lieu_de_naissance", nullable = false)
    private String lieuDeNaissance;

    @Column(name = "pays_de_naissance", nullable = false)
    private String paysDeNaissance;

    @Column(name = "sexe", nullable = false)
    private String sexe;

    @Column(name = "taille")
    private Float taille;

    @Column(name = "numero_de_telephone", nullable = false)
    private String numeroDeTelephone;

    @Column(name = "photo")
    private String photo;

    @Column(name = "signature")
    private String signature;

    @Column(name = "lieu_dactivites")
    private String lieuDactivites;

    @Column(name = "empreinte_digitale")
    private String empreinteDigitale;

    @Column(name = "situation_matrimoniale", nullable = false)
    private String situationMatrimoniale;

    @ManyToOne
    @JoinColumn(name = "profession_id")
    private Profession profession;

    @OneToMany(mappedBy = "citoyen", cascade = CascadeType.ALL)
    private List<AttacherFamilliale> attacherFamilliales;

    @OneToMany(mappedBy = "citoyen", cascade = CascadeType.ALL)
    private List<Famille> familles;


    // Constructeur par défaut
    public Citoyen() {
    }
    @ManyToOne
    @JoinColumn(name = "consulat_id")
    private Consulat consulat;

    // Constructeur avec de nombreux paramètres
    public Citoyen(String matricule, String nom, String prenom, LocalDate dateDeNaissance,
                   String lieuDeNaissance, String paysDeNaissance, String sexe, Float taille,
                   String numeroDeTelephone, String photo, String signature, String lieuDactivites,
                   String empreinteDigitale, String situationMatrimoniale, Profession profession,
                   List<AttacherFamilliale> attacherFamilliales, List<Famille> familles, Consulat consulat) {
        this.matricule = matricule;
        this.nom = nom;
        this.prenom = prenom;
        this.dateDeNaissance = dateDeNaissance;
        this.lieuDeNaissance = lieuDeNaissance;
        this.paysDeNaissance = paysDeNaissance;
        this.sexe = sexe;
        this.taille = taille;
        this.numeroDeTelephone = numeroDeTelephone;
        this.photo = photo;
        this.signature = signature;
        this.lieuDactivites = lieuDactivites;
        this.empreinteDigitale = empreinteDigitale;
        this.situationMatrimoniale = situationMatrimoniale;
        this.profession = profession;
        this.attacherFamilliales = attacherFamilliales;
        this.familles = familles;
        this.consulat = consulat;
    }

    // Getters and setters
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

    public LocalDate getDateDeNaissance() {
        return dateDeNaissance;
    }

    public void setDateDeNaissance(LocalDate dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
    }

    public String getLieuDeNaissance() {
        return lieuDeNaissance;
    }

    public void setLieuDeNaissance(String lieuDeNaissance) {
        this.lieuDeNaissance = lieuDeNaissance;
    }

    public String getPaysDeNaissance() {
        return paysDeNaissance;
    }

    public void setPaysDeNaissance(String paysDeNaissance) {
        this.paysDeNaissance = paysDeNaissance;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public Float getTaille() {
        return taille;
    }

    public void setTaille(Float taille) {
        this.taille = taille;
    }

    public String getNumeroDeTelephone() {
        return numeroDeTelephone;
    }

    public void setNumeroDeTelephone(String numeroDeTelephone) {
        this.numeroDeTelephone = numeroDeTelephone;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getLieuDactivites() {
        return lieuDactivites;
    }

    public void setLieuDactivites(String lieuDactivites) {
        this.lieuDactivites = lieuDactivites;
    }

    public String getEmpreinteDigitale() {
        return empreinteDigitale;
    }

    public void setEmpreinteDigitale(String empreinteDigitale) {
        this.empreinteDigitale = empreinteDigitale;
    }

    public String getSituationMatrimoniale() {
        return situationMatrimoniale;
    }

    public void setSituationMatrimoniale(String situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
    }

    public Profession getProfession() {
        return profession;
    }

    public void setProfession(Profession profession) {
        this.profession = profession;
    }

    public List<AttacherFamilliale> getAttacherFamilliales() {
        return attacherFamilliales;
    }

    public void setAttacherFamilliales(List<AttacherFamilliale> attacherFamilliales) {
        this.attacherFamilliales = attacherFamilliales;
    }

    public List<Famille> getFamilles() {
        return familles;
    }

    public void setFamilles(List<Famille> familles) {
        this.familles = familles;
    }

    public Consulat getConsulat() {
        return consulat;
    }

    public void setConsulat(Consulat consulat) {
        this.consulat = consulat;
    }
}
