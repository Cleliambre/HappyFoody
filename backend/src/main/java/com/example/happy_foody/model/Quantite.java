package com.example.happy_foody.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quantite")
public class Quantite {
    private QuantiteId pk;
    private float portion;
    private Unite unite;

    public Quantite() {}

    public Quantite(QuantiteId pk, float portion, Unite unite) {
        this.pk = pk;
        this.portion = portion;
        this.unite = unite;
    }

    @Id
    public QuantiteId getPk() {
        return pk;
    }
    public void setPk(QuantiteId pk) {
        this.pk = pk;
    }

    @Column(name = "portion", nullable = false)
    public float getPortion() {
        return portion;
    }
    public void setPortion(float portion) {
        this.portion = portion;
    }

    @Column(name = "unité")
    public Unite getUnite() {
        return unite;
    }
    public void setUnite(Unite unite) {
        this.unite = unite;
    }

}
