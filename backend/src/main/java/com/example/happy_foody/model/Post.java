package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name="post")
public class Post {
    private long idPost;
    private String titre;
    private Compte auteur;
    private String contenu;
    private Date date;

    private Set<Tag> tags;

    public Post() {}

    public Post(String titre, Compte auteur, String contenu, Date date) {
        this.titre = titre;
        this.auteur = auteur;
        this.contenu = contenu;
        this.date = date;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdPost() {return idPost;}
    private void setIdPost(long idPost) {this.idPost = idPost;}

    @Column(name = "titre", nullable = false)
    public String getTitre() {return titre;}
    public void setTitre(String titre) {this.titre = titre;}

    @ManyToOne
    @JoinColumn(name = "id_auteur", nullable = false)
    public Compte getAuteur() {return auteur;}
    public void setAuteur(Compte auteur) {
        this.auteur = auteur;
    }

    @Column(name = "contenu", nullable = false)
    public String getContenu() {return contenu;}
    public void setContenu(String contenu) {this.contenu = contenu;}

    @Column(name = "date", nullable = false)
    public Date getDate() {return date;}
    public void setDate(Date date) {this.date = date;}

    @ManyToMany
    @JoinTable(
            name = "post_tag",
            joinColumns = @JoinColumn(name = "id_post"),
            inverseJoinColumns = @JoinColumn(name = "id_tag")
    )
    public Set<Tag> getTags() {return tags;}
    public void setTags(Set<Tag> tags) {this.tags = tags;}
}
