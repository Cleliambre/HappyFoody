package com.example.happy_foody.model;

import jakarta.persistence.*;


@Entity
@Table(name="etape")
public class Etape {

    private long idEtape;
    private Recette recette;
    private String txtEtape;

    public Etape() {}

    public Etape(Recette recette, String txtEtape)
    {
        this.recette = recette;
        this.txtEtape = txtEtape;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdEtape() {return idEtape;}
    private void setIdEtape(long idEtape) {this.idEtape = idEtape;}

    @ManyToOne
    @JoinColumn(name = "id_recette", nullable = false)
    public Recette getRecette() {return recette;}
    public void setRecette(Recette recette) {this.recette = recette;}

    @Column(name = "txtEtape", nullable = false, length = 10000)
    public String getTxtEtape() {return txtEtape;}
    public void setTxtEtape(String txtEtape) {this.txtEtape = txtEtape;}

}
