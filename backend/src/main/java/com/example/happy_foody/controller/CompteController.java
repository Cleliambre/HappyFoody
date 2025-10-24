package com.example.happy_foody.controller;

import com.example.happy_foody.model.*;
import com.example.happy_foody.service.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/compte")
@CrossOrigin
public class CompteController {
    private final CompteService compteService;


    @Autowired
    public CompteController(CompteService compteService) {this.compteService = compteService;}

    @GetMapping("/all")
    public List<Compte> getComptes(){
        return compteService.getAllComptes();
    }

    @GetMapping("/getCompteById/{id}")
    public Compte getCompteById(@PathVariable(value = "id") Long id){
        return compteService.getCompteById(id);
    }

    @PostMapping("/createCompte")
    public Compte createCompte(@RequestBody Compte compte){return compteService.createCompte(compte);}

    //UPDATE
    @PutMapping("/updateCompte/{id}")
    public Compte updateCompte(@PathVariable(value = "id") Long id, @RequestBody Compte Compte){
        return compteService.updateCompte(id, Compte);
    }

    //DELETE
    @DeleteMapping("/deleteCompte/{id}")
    public void deleteCompte(@PathVariable(value = "id") Long id) {
        compteService.deleteCompte(id);
    }

    @GetMapping("/getLikedRecettes/{id}")
    public List<Recette> getLikedRecettes(@PathVariable(value = "id") Long id){
        return compteService.getLikedRecettes(id);
    }

    @GetMapping("/getLikedRestaurants/{id}")
    public List<Restaurant> getLikedRestaurants(@PathVariable(value = "id") Long id){
        return compteService.getLikedRestaurants(id);
    }

    @GetMapping("/getLikedPosts/{id}")
    public List<Post> getLikedPosts(@PathVariable(value = "id") Long id){
        return compteService.getLikedPosts(id);
    }

    @GetMapping("/getLikedPartages/{id}")
    public List<Partage> getLikedPartages(@PathVariable(value = "id") Long id){
        return compteService.getLikedPartages(id);
    }

}
