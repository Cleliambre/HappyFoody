package com.example.happy_foody.model;

import jakarta.persistence.*;

@Entity
@Table(name="tag")
public class Tag {
    private long idTag;
    private TypeTag typeTag;
    private String nom;


    public Tag() {}

    public Tag(TypeTag typeTag, String nom)
    {
        this.nom=nom;
        this.typeTag=typeTag;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdTag() {return idTag;}
    private void setIdTag(long idTag) {this.idTag = idTag;}

    @Column(name = "typeTag", nullable = false)
    public TypeTag getTypeTag(){return typeTag;}
    public void setTypeTag(TypeTag typeTag){this.typeTag=typeTag;}

    @Column(name = "nom", nullable = false)
    public String getNom(){return nom;}
    public void setNom(String nom){this.nom=nom;}

}

