package com.example.happy_foody.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quantite")
public class Quantite {
    private QuantiteId pk;

    private Recette recette;
    private Ingredient ingredient;

    private float portion;
    private Unite unite;

    public Quantite() {}

    public Quantite(Recette recette, Ingredient ingredient, float portion, Unite unite) {
        this.pk = new QuantiteId(recette.getIdRecette(),  ingredient.getIdIngredient());
        this.recette = recette;
        this.ingredient = ingredient;
        this.portion = portion;
        this.unite = unite;
    }

    @EmbeddedId
    public QuantiteId getPk() {
        return pk;
    }
    public void setPk(QuantiteId pk) {
        this.pk = pk;
    }

    @ManyToOne
    @MapsId("idRecette") // correspond au champ de QuantiteId
    @JoinColumn(name = "id_recette")
    public Recette getRecette() { return recette; }
    public void setRecette(Recette recette) { this.recette = recette; }

    @ManyToOne
    @MapsId("idIngredient") // correspond au champ de QuantiteId
    @JoinColumn(name = "id_ingredient")
    public Ingredient getIngredient() { return ingredient; }
    public void setIngredient(Ingredient ingredient) { this.ingredient = ingredient; }

    @Column(name = "portion", nullable = false)
    public float getPortion() {
        return portion;
    }
    public void setPortion(float portion) {
        this.portion = portion;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "unite")
    public Unite getUnite() {
        return unite;
    }
    public void setUnite(Unite unite) {
        this.unite = unite;
    }

}
