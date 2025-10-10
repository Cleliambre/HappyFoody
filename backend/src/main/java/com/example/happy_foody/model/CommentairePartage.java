package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "commentairePartage")
@PrimaryKeyJoinColumn(name = "id_commentaire")
public class CommentairePartage extends Commentaire{

    private Partage partage;

    public CommentairePartage() {
        super();
    }

    public CommentairePartage(Commentaire CommRepondu, Compte auteur, String contenu, Date date, Partage partage)
    {
        super(CommRepondu, auteur, contenu, date);
        this.partage = partage;
    }

    @ManyToOne
    @JoinColumn(name = "id_partage", nullable = false)
    public Partage getPartage() {return partage;}
    public void setPartage(Partage partage) {this.partage = partage;}

}
