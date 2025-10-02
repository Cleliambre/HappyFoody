package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ingrédient")
public class Ingredient {
    private long idIngredient;
    String nom;

    private Set<Quantite> quantites = new HashSet<Quantite>();

    public Ingredient () {}

    public Ingredient (String nom) {
        this.nom = nom;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdIngredient() {return idIngredient;}
    private void setIdIngredient(long idIngredient) {this.idIngredient = idIngredient;}

    @Column(name = "nom", nullable = false, unique = true)
    public String getNom() {return nom;}
    public void setNom(String nom) {this.nom = nom;}

    //sert à ce que le lien entre Ingredient et Quantite soit bidirectionnelle
    @OneToMany(mappedBy = "pk.ingredient")
    public Set<Quantite> getQuantites() {return quantites;}
    public void setQuantites(Set<Quantite> quantites) {
        this.quantites = quantites;
    }
}
