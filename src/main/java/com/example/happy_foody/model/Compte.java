package com.example.happy_foody.model;

import jakarta.persistence.*;

@Entity
@Table(name="compte")
public class Compte {
    private long idCompte;
    private String pseudo;
    private String urlImage;
    private String description;
    private String mail;
    private String password;
    private int scoreConfiance;

    public Compte() {}

    public Compte(String pseudo, String urlImage, String description,
                  String mail, String password, String scoreConfiance)
    {
        this.pseudo = pseudo;
        this.urlImage = urlImage;
        this.description = description;
        this.mail = mail;
        this.password = password;
        this.scoreConfiance = Integer.parseInt(scoreConfiance);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdCompte() {return idCompte;}
    public void setIdCompte(long idCompte) {this.idCompte = idCompte;}

    @Column(name = "pseudo", nullable = false)
    public String getPseudo() {return pseudo;}
    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    @Column(name = "urlImage", nullable = true)
    public String getUrlImage() {return urlImage;}
    public void setUrlImage(String urlImage) {this.urlImage = urlImage;}

    @Column(name = "description", nullable = true)
    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    @Column(name = "mail", nullable = false)
    public String getMail() {return mail;}
    public void setMail(String mail) {this.mail = mail;}

    @Column(name = "password", nullable = false)
    public String getPassword() {return password;}
    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name="scoreConfiance",nullable = true)
    public int getScoreConfiance() {return scoreConfiance;}
    public void setScoreConfiance(int scoreConfiance) {
        this.scoreConfiance = scoreConfiance;
    }
}

