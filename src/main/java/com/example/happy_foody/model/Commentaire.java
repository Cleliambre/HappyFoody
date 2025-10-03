package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="commentaire")
public class Commentaire {
    private long idCommentaire;
    private Commentaire CommRepondu;
    private Compte auteur;
    private String contenu;
    private Date date;


    public Commentaire() {}

    public Commentaire(Commentaire CommRepondu, Compte auteur, String contenu, Date date)
    {
        this.date = date;
        this.contenu = contenu;
        this.CommRepondu = CommRepondu;
        this.auteur = auteur;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdCommentaire() {return idCommentaire;}
    private void setIdCommentaire(long idCommentaire) {this.idCommentaire = idCommentaire;}

    @Column(name = "contenu", nullable = false)
    public String getContenu() {return contenu;}
    public void setContenu(String contenu) {this.contenu = contenu;}

    @Column(name = "date", nullable = false)
    public Date getDate() {return date;}
    public void setDate(Date date) {this.date = date;}

    @ManyToOne
    @JoinColumn(name = "id_auteur", nullable = false)
    public Compte getAuteur() {return auteur;}
    public void setAuteur(Compte auteur) {this.auteur = auteur;}

    @ManyToOne
    @JoinColumn(name = "id_commRepondu", nullable = true)
    public Commentaire getCommRepondu() {return CommRepondu;}
    public void setCommRepondu(Commentaire CommRepondu) {this.CommRepondu = CommRepondu;}

}

