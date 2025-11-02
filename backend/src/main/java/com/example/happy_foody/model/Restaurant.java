package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="restaurant")
public class Restaurant {
    private long idRestaurant;
    private String nom;
    private String description;
    private String tel;
    private String adresse;
    private String horaire;
    private String reseaux;
    private String prix;
    private String reserver;
    private String menu;
    private String site;

    private Set<Tag> tags;

    public Restaurant() {}

    public Restaurant(String nom, String description,
                      String tel,
                      String adresse,
                      String horaire,
                      String reseaux,
                      String prix,
                      String reserver,
                      String menu,
                      String site)
    {
        this.nom = nom; this.description = description;
        this.tel = tel;
        this.adresse = adresse;
        this.horaire = horaire;
        this.reseaux = reseaux;
        this.prix = prix;
        this.reserver = reserver;
        this.menu = menu;
        this.site = site;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdRestaurant() {return idRestaurant;}
    public void setIdRestaurant(long idRestaurant) {this.idRestaurant = idRestaurant;}


    @Column(name = "nom", nullable = false)
    public String getNom() {return nom;}
    public void setNom(String nom) {this.nom = nom;}

    @Column(name = "description", nullable = true)
    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    @Column (name = "tel", nullable = true)
    public String getTel() {return tel;}
    public void setTel(String tel) {this.tel = tel;}

    @Column (name = "adresse", nullable = true)
    public String getAdresse() {return adresse;}
    public void setAdresse(String adresse) {this.adresse = adresse;}

    @Column (name = "horaire", nullable = true)
    public String getHoraire() {return horaire;}
    public void setHoraire(String horaire) {this.horaire = horaire;}

    @Column (name = "reseaux", nullable = true)
    public String getReseaux() {return reseaux;}
    public void setReseaux(String reseaux) {this.reseaux = reseaux;}

    @Column (name = "prix", nullable = true)
    public String getPrix() {return prix;}
    public void setPrix(String prix) {this.prix = prix;}

    @Column (name = "reserver", nullable = true)
    public String getReserver() {return reserver;}
    public void setReserver(String reserver) {this.reserver = reserver;}

    @Column (name = "menu", nullable = true)
    public String getMenu() {return menu;}
    public void setMenu(String menu) {this.menu = menu;}

    @Column (name = "site", nullable = true)
    public String getSite() {return site;}
    public void setSite(String site) {this.site = site;}

    @ManyToMany
    @JoinTable(
            name = "restaurant_tag",
            joinColumns = @JoinColumn(name = "id_restaurant"),
            inverseJoinColumns = @JoinColumn(name = "id_tag")
    )
    public Set<Tag> getTags() {return tags;}
    public void setTags(Set<Tag> tags) {this.tags = tags;}
}
