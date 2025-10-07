package com.example.happy_foody.controller;


import com.example.happy_foody.model.Recette;
import com.example.happy_foody.service.RecetteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/recette")
@CrossOrigin
public class RecetteController {
    private final RecetteService recetteService;


    @Autowired
    public RecetteController(RecetteService recetteService) {this.recetteService = recetteService;}

    //SELECT
    @GetMapping("/all")
    public List<Recette> getRecettes(){
        return recetteService.getAllRecettes();
    }

    //SELECT
    @GetMapping("/getRecetteById/{id}")
    public Recette getRecetteById(@PathVariable(value = "id") Long id){
        return recetteService.getRecetteById(id);
    }

    //INSERT
    @PostMapping("/createRecette")
    public Recette createRecette(@RequestBody Recette Recette){return recetteService.createRecette(Recette);}

    //UPDATE
    @PutMapping("/updateRecette/{id}")
    public Recette updateRecette(@PathVariable(value = "id") Long id, @RequestBody Recette Recette){
        return recetteService.updateRecette(id, Recette);
    }

    //DELETE
    @DeleteMapping("/deleteRecette/{id}")
    public void deleteRecette(@PathVariable(value = "id") Long id){
        recetteService.deleteRecette(id);
    }
}