package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.io.Serial;


@Embeddable
public class InscriptionId implements java.io.Serializable  {
    /*serializable est nécessaire pour l'utiliser en clé primaire*/
    @Serial
    private static final long serialVersionUID = 1L;

    private Compte compte;
    private Partage partage;

    public InscriptionId() {}

    public InscriptionId(Compte compte, Partage partage) {
        this.compte = compte;
        this.partage = partage;
    }

    @ManyToOne
    @JoinColumn(name = "id_compte")
    public Compte getCompte() {
        return compte;
    }
    public void setCompte(Compte compte) {
        this.compte = compte;
    }

    @ManyToOne
    @JoinColumn(name = "id_partage")
    public Partage getPartage() {
        return partage;
    }
    public void setPartage(Partage partage) {
        this.partage = partage;
    }
}
