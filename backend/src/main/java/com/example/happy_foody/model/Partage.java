package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="partage")
public class Partage {
    private long idPartage;
    private String titre;

    private Compte auteur;

    private String description;
    private int nbPart;
    private Date dateExpiration;
    private Date datePublication;

    private TypePartage typePartage;

    public Partage() {}

    public Partage(String titre, Compte auteur, String description,
                   int nbPart, Date dateExpiration,  Date datePublication, TypePartage typePartage)
    {
        this.titre = titre;
        this.auteur = auteur;
        this.description = description;
        this.nbPart = nbPart;
        this.dateExpiration = dateExpiration;
        this.datePublication = datePublication;
        this.typePartage = typePartage;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdPartage() {return idPartage;}
    private void setIdPartage(long idPartage) {this.idPartage = idPartage;}

    @Column(name = "titre", nullable = false)
    public String getTitre() {return titre;}
    public void setTitre(String titre) {this.titre = titre;}

    @ManyToOne
    @JoinColumn(name = "id_auteur", nullable = false)
    public Compte getAuteur() {return auteur;}
    public void setAuteur(Compte auteur) {this.auteur = auteur;}

    @Column(name = "description", nullable = true)
    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    @Column(name = "nbPart", nullable = false)
    public int getNbPart() {return nbPart;}
    public void setNbPart(int nbPart) {this.nbPart = nbPart;}

    @Column(name = "dateExpiration", nullable = false)
    public Date getDateExpiration() {return dateExpiration;}
    public void setDateExpiration(Date dateExpiration) {this.dateExpiration = dateExpiration;}

    @Column(name = "datePublication", nullable = false)
    public Date getDatePublication() {return datePublication;}
    public void setDatePublication(Date datePublication) {this.datePublication = datePublication;}

    @Column(name = "typePartage", nullable = false)
    public TypePartage getTypePartage() {return typePartage;}
    public void setTypePartage(TypePartage typePartage) {this.typePartage = typePartage;}

}
