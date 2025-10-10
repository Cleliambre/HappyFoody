package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "commentaireRecette")
@PrimaryKeyJoinColumn(name = "id_commentaire")
public class CommentaireRecette extends Commentaire{

    private int note;
    private Recette recette;

    public CommentaireRecette() {
        super();
    }

    public CommentaireRecette(Commentaire CommRepondu, Compte auteur, String contenu, Date date, int note, Recette recette)
    {
        super(CommRepondu, auteur, contenu, date);
        this.note = note;
        this.recette = recette;
    }

    @Column(name = "note", nullable = false)
    public int getNote() {return note;}
    public void setNote(int note) {this.note = note;}

    @ManyToOne
    @JoinColumn(name = "id_recette", nullable = false)
    public Recette getRecette() {return recette;}
    public void setRecette(Recette recette) {this.recette = recette;}

}
