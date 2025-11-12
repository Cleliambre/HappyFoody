package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.io.Serial;
import java.util.Objects;

//Création d'un composant pour les clés primaires de l'association Quantité
@Embeddable
public class QuantiteId implements java.io.Serializable  {
    /*serializable est nécessaire pour l'utiliser en clé primaire*/
    @Serial
    private static final long serialVersionUID = 1L;

    private Long idRecette;
    private Long idIngredient;

    public QuantiteId() {}

    public QuantiteId(Long idRecette, Long idIngredient) {
        this.idRecette = idRecette;
        this.idIngredient = idIngredient;
    }

    public Long getIdRecette() {
        return idRecette;
    }

    public void setIdRecette(Long idRecette) {
        this.idRecette = idRecette;
    }

    public Long getIdIngredient() {
        return idIngredient;
    }

    public void setIdIngredient(Long idIngredient) {
        this.idIngredient = idIngredient;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof QuantiteId that)) return false;
        return Objects.equals(idRecette, that.idRecette) &&
                Objects.equals(idIngredient, that.idIngredient);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRecette, idIngredient);
    }
}
