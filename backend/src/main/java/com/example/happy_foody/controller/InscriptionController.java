package com.example.happy_foody.controller;

import com.example.happy_foody.model.Inscription;
import com.example.happy_foody.model.InscriptionId;
import com.example.happy_foody.service.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/inscription")
@CrossOrigin
public class InscriptionController {
    private final InscriptionService inscriptionService;


    @Autowired
    public InscriptionController(InscriptionService inscriptionService) {this.inscriptionService = inscriptionService;}

    //SELECT
    @GetMapping("/all")
    public List<Inscription> getInscriptions(){
        return inscriptionService.getAllInscriptions();
    }

    //SELECT
    @GetMapping("/getInscriptionById/{id}")
    public Inscription getInscriptionById(@PathVariable(value = "id") InscriptionId id){
        return inscriptionService.getInscriptionById(id);
    }

    //INSERT
    @PostMapping("/createInscription")
    public Inscription createInscription(@RequestBody Inscription Inscription){return inscriptionService.createInscription(Inscription);}

    //UPDATE
    @PutMapping("/updateInscription/{id}")
    public Inscription updateInscription(@PathVariable(value = "id") InscriptionId id, @RequestBody Inscription Inscription){
        return inscriptionService.updateInscription(id, Inscription);
    }

    //DELETE
    @DeleteMapping("/deleteInscription/{id}")
    public void deleteInscription(@PathVariable(value = "id") InscriptionId id){
        inscriptionService.deleteInscription(id);
    }
}
