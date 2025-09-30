package com.example.happy_foody.controller;

import com.example.happy_foody.model.Compte;
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

    @GetMapping("/getUserById/{id}")
    public Compte getCompteById(@PathVariable(value = "id") int id){
        return compteService.getCompteById(id);
    }

    @PostMapping("/createUser")
    public Compte createCompte(@RequestBody Compte compte){return compteService.createCompte(compte);}
}
