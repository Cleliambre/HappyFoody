package com.example.happy_foody.controller;

import com.example.happy_foody.model.Ingredient;
import com.example.happy_foody.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/ingredient")
@CrossOrigin
public class IngredientController {
    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService){
        this.ingredientService = ingredientService;
    }

    //SELECT
    @GetMapping("/all")
    public List<Ingredient> getIngredients(){
        return ingredientService.getAllIngredients();
    }

    //SELECT
    @GetMapping("/getIngredientById/{id}")
    public Ingredient getIngredientById(@PathVariable(value = "id") Long id){
        return ingredientService.getIngredientById(id);
    }

    //INSERT
    @PostMapping("/createIngredient")
    public Ingredient createIngredient(@RequestBody Ingredient Ingredient){return ingredientService.createIngredient(Ingredient);}

    //UPDATE
    @PutMapping("/updateIngredient/{id}")
    public Ingredient updateIngredient(@PathVariable(value = "id") Long id, @RequestBody Ingredient Ingredient){
        return ingredientService.updateIngredient(id, Ingredient);
    }

    //DELETE
    @DeleteMapping("/deleteIngredient/{id}")
    public void deleteIngredient(@PathVariable(value = "id") Long id){
        ingredientService.deleteIngredient(id);
    }

    @GetMapping("/getIngredientByRecette/{id_recette}")
    public List<Ingredient> getIngredientByRecette(@PathVariable(value = "id_recette") Long id_recette){
        return ingredientService.getIngredientByRecette(id_recette);
    }
}
