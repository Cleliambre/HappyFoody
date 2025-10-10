package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "commentairePost")
@PrimaryKeyJoinColumn(name = "id_commentaire")
public class CommentairePost extends Commentaire{

    private Post post;

    public CommentairePost() {
        super();
    }

    public CommentairePost(Commentaire CommRepondu, Compte auteur, String contenu, Date date, Post post)
    {
        super(CommRepondu, auteur, contenu, date);
        this.post=post;
    }

    @ManyToOne
    @JoinColumn(name = "id_post", nullable = false)
    public Post getPost() {return post;}
    public void setPost(Post post) {this.post = post;}

}
