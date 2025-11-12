package com.example.happy_foody.controller;

import com.example.happy_foody.model.Quantite;
import com.example.happy_foody.model.QuantiteId;
import com.example.happy_foody.service.QuantiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/quantite")
@CrossOrigin
public class QuantiteController {
    private final QuantiteService quantiteService;


    @Autowired
    public QuantiteController(QuantiteService quantiteService) {this.quantiteService = quantiteService;}

    //SELECT
    @GetMapping("/all")
    public List<Quantite> getQuantites(){
        return quantiteService.getAllQuantites();
    }

    //SELECT
    @GetMapping("/getQuantiteById/{idRecette}/{idIngredient}")
    public Quantite getQuantiteById(
            @PathVariable Long idRecette,
            @PathVariable Long idIngredient) {
        QuantiteId id = new QuantiteId(idRecette, idIngredient);
        return quantiteService.getQuantiteById(id);
    }


    //INSERT
    @PostMapping("/createQuantite")
    public Quantite createQuantite(@RequestBody Quantite Quantite){return quantiteService.createQuantite(Quantite);}

    //UPDATE
    @PutMapping("/updateQuantite/{id}")
    public Quantite updateQuantite(@PathVariable(value = "id") QuantiteId id, @RequestBody Quantite Quantite){
        return quantiteService.updateQuantite(id, Quantite);
    }

    //DELETE
    @DeleteMapping("/deleteQuantite/{id}")
    public void deleteQuantite(@PathVariable(value = "id") QuantiteId id){
        quantiteService.deleteQuantite(id);
    }
}
