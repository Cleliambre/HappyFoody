package com.example.happy_foody.model;

import jakarta.persistence.*;


import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="recette")
public class Recette {
    private long idRecette;
    private String titre;
    private String urlImage;
    private Compte auteur;

    private Set<Tag> tags;


    private String description;
    private int temps;
    private int portion;

    //private Set<Quantite> quantites = new HashSet<Quantite>();

    public Recette() {}

    public Recette(String titre, Compte auteur, String description, String urlImage, int temps, int portion)
    {
        this.titre = titre;
        this.auteur = auteur;
        this.description = description;
        this.urlImage = urlImage;
        this.temps = temps;
        this.portion = portion;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdRecette() {return idRecette;}
    private void setIdRecette(long idRecette) {this.idRecette = idRecette;}

    @Column(name = "titre", nullable = false)
    public String getTitre() {return titre;}
    public void setTitre(String titre) {this.titre = titre;}

    @ManyToOne
    @JoinColumn(name = "id_auteur", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"recettesLiked", "restaurantsLiked", "postsLiked", "partagesLiked"})
    public Compte getAuteur() {return auteur;}
    public void setAuteur(Compte auteur) {this.auteur = auteur;}

    @Column(name = "description", nullable = true)
    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    @Column(name = "urlImage", nullable = true)
    public String getUrlImage() {return urlImage;}
    public void setUrlImage(String urlImage) {this.urlImage = urlImage;}

    @Column(name = "temps", nullable = false)
    public int getTemps() {return temps;}
    public void setTemps(int temps) {this.temps = temps;}

    @Column(name = "portion", nullable = false)
    public int getPortion() {return portion;}
    public void setPortion(int portion) {this.portion = portion;}

    @ManyToMany
    @JoinTable(
            name = "recette_tag",
            joinColumns = @JoinColumn(name = "id_recette"),
            inverseJoinColumns = @JoinColumn(name = "id_tag")
    )
    public Set<Tag> getTags() {return tags;}
    public void setTags(Set<Tag> tags) {this.tags = tags;}

    //sert à ce que le lien entre Recette et Quantite soit bidirectionnel
    /*@OneToMany(mappedBy = "pk.recette")
    public Set<Quantite> getQuantites() {return quantites;}
    public void setQuantites(Set<Quantite> quantites) {
        this.quantites = quantites;
    }*/
}

