package com.starterkit.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    private Set<Role> roles;

    @OneToOne
    @JoinColumn(name = "consulat_id", unique = true)
    private Consulat consulat;

    // Constructors, getters, and setters
    public Admin() {}

    public Admin(String username, String password, String email, Consulat consulat) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.consulat = consulat;
    }

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

    public Consulat getConsulat() {
        return consulat;
    }

    public void setConsulat(Consulat consulat) {
        this.consulat = consulat;
    }
}
