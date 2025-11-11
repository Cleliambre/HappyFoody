package com.example.happy_foody.service;

import com.example.happy_foody.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import com.example.happy_foody.model.Ingredient;

import java.util.List;

@Service
public class IngredientService {
    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    public Ingredient getIngredientById(Long id) throws ResourceNotFoundException {
        Ingredient ingredient = ingredientRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Ingredient not found"));
        return ingredient;
    }

    public Ingredient createIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public Ingredient updateIngredient(Long ingredientId, Ingredient ingredientDetails) throws ResourceNotFoundException {
        Ingredient ingredient = ingredientRepository.findById(ingredientId).orElseThrow(() -> new ResourceNotFoundException("Ingredient not found"));

        ingredient.setNom(ingredientDetails.getNom());
        final Ingredient updatedIngredient = ingredientRepository.save(ingredient);
        return updatedIngredient;
    }

    public void deleteIngredient(Long ingredientId) throws ResourceNotFoundException {
        Ingredient ingredient = ingredientRepository.findById(ingredientId).orElseThrow(()->new ResourceNotFoundException("Ingredient not found"));

        ingredientRepository.delete(ingredient);
    }

    public List<Ingredient> getIngredientByRecette(Long id_recette) throws ResourceNotFoundException {
        return ingredientRepository.findByRecette(id_recette);
    }
}
