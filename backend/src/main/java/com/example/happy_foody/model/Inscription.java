package com.example.happy_foody.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "quantite")
public class Inscription {
    private InscriptionId pk;
    private int nbPart;

    public Inscription() {}

    public Inscription(InscriptionId pk, int nbPart) {
        this.pk = pk;
        this.nbPart = nbPart;
    }

    @Id
    public InscriptionId getPk() {
        return pk;
    }
    public void setPk(InscriptionId pk) {
        this.pk = pk;
    }

    @Column(name = "nbPart", nullable = false)
    public int getNbPart() {return nbPart;}
    public void setNbPart(int nbPart) {this.nbPart = nbPart;}


}