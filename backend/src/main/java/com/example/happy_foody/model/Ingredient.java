package com.example.happy_foody.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ingrédient")
public class Ingredient {
    private long idIngredient;
    String nom;

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
}
