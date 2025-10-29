package com.example.happy_foody.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="message")
public class Message {
    private long idMessage;
    private String contenu;


    private Compte emetteur;
    private Compte recepteur;

    private Date dateEnvoi;
    private boolean messageLu;

    public Message() {}

    public Message(String contenu, Compte emetteur, Compte recepteur, Date dateEnvoi, boolean messageLu)
    {
        this.contenu=contenu;
        this.dateEnvoi=dateEnvoi;
        this.emetteur=emetteur;
        this.recepteur=recepteur;
        this.messageLu=messageLu;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdMessage() {return idMessage;}
    private void setIdMessage(long idMessage) {this.idMessage = idMessage;}

    @Column(name = "contenu", nullable = false)
    public String getContenu() {return contenu;}
    public void setContenu(String contenu) {this.contenu = contenu;}

    @ManyToOne
    @JoinColumn(name = "emetteur", nullable = false)
    public Compte getEmetteur() {return emetteur;}
    public void setEmetteur(Compte emetteur) {this.emetteur = emetteur;}

    @ManyToOne
    @JoinColumn(name = "recepteur", nullable = false)
    public Compte getRecepteur() {return recepteur;}
    public void setRecepteur(Compte recepteur) {this.recepteur = recepteur;}


    @Column(name = "dateEnvoi", nullable = false)
    public Date getDateEnvoi() {return dateEnvoi;}
    public void setDateEnvoi(Date dateEnvoi) {this.dateEnvoi = dateEnvoi;}

    @Column(name = "messageLu", nullable = false)
    public boolean getMessageLu() {return messageLu;}
    public void setMessageLu(boolean messageLu) {this.messageLu = messageLu;}

}
