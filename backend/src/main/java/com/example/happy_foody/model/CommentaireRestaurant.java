package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "commentaireRestaurant")
@PrimaryKeyJoinColumn(name = "id_commentaire")
public class CommentaireRestaurant extends Commentaire{

    private int noteRapidite;
    private int noteService;
    private int noteQualite;
    private int noteHygiene;

    private Restaurant restaurant;

    public CommentaireRestaurant() {
        super();
    }

    public CommentaireRestaurant(Commentaire CommRepondu, Compte auteur, String contenu, Date date, int noteRapidite, int noteService, int noteQualite, int noteHygiene, Restaurant restaurant)
    {
        super(CommRepondu, auteur, contenu, date);
        this.noteRapidite = noteRapidite;
        this.noteService = noteService;
        this.noteQualite = noteQualite;
        this.noteHygiene = noteHygiene;
        this.restaurant = restaurant;
    }

    @Column(name = "noteRapidite", nullable = false)
    public int getNoteRapidite() {return noteRapidite;}
    public void setNoteRapidite(int noteRapidite) {this.noteRapidite = noteRapidite; }

    @Column(name = "noteService", nullable = false)
    public int getNoteService() {return noteService;}
    public void setNoteService(int noteService) {this.noteService = noteService;}

    @Column(name = "noteQualite", nullable = false)
    public int getNoteQualite() {return noteQualite;}
    public void setNoteQualite(int noteQualite) {this.noteQualite = noteQualite; }

    @Column(name = "noteHygiene", nullable = false)
    public int getNoteHygiene() {return noteHygiene;}
    public void setNoteHygiene(int noteHygiene) {this.noteHygiene = noteHygiene; }

    @ManyToOne
    @JoinColumn(name = "id_restaurant", nullable = false)
    public Restaurant getRestaurant() {return restaurant;}
    public void setRestaurant(Restaurant restaurant) {this.restaurant = restaurant;}

}
