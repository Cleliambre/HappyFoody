package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.io.Serial;

//Création d'un composant pour les clés primaires de l'association Quantité
@Embeddable
public class QuantiteId implements java.io.Serializable  {
    /*serializable est nécessaire pour l'utiliser en clé primaire*/
    @Serial
    private static final long serialVersionUID = 1L;

    private Recette recette;
    private Ingredient ingredient;

    public QuantiteId() {}

    public QuantiteId(Recette recette, Ingredient ingredient) {
        this.recette = recette;
        this.ingredient = ingredient;
    }

    @ManyToOne
    @JoinColumn(name = "id_recette")
    public Recette getRecette() {
        return recette;
    }
    public void setRecette(Recette recette) {
        this.recette = recette;
    }

    @ManyToOne
    @JoinColumn(name = "id_ingredient")
    public Ingredient getIngredient() {
        return ingredient;
    }
    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }
}
