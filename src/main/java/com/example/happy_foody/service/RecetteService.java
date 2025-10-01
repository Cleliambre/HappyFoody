package com.example.happy_foody.service;

import com.example.happy_foody.model.Recette;
import com.example.happy_foody.repository.RecetteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecetteService {

    @Autowired
    private RecetteRepository recetteRepository;

    public List<Recette> getAllRecettes() {
        return recetteRepository.findAll();
    }

    public Recette getRecetteById(Long id) throws ResourceNotFoundException {
        Recette recette = recetteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Recette not found"));
        return recette;
    }

    public Recette createRecette(Recette recette) {
        return recetteRepository.save(recette);
    }

    public Recette updateRecette(Long recetteId, Recette recetteDetails) throws ResourceNotFoundException {
        Recette recette = recetteRepository.findById(recetteId).orElseThrow(() -> new ResourceNotFoundException("Recette not found"));

        recette.setAuteur(recetteDetails.getAuteur());
        recette.setDescription(recetteDetails.getDescription());
        recette.setTitre(recetteDetails.getTitre());
        recette.setPortion(recetteDetails.getPortion());
        recette.setTemps(recetteDetails.getTemps());

        final Recette updatedRecette = recetteRepository.save(recette);
        return updatedRecette;
    }

    public void deleteRecette(Long recetteId) throws ResourceNotFoundException {
        Recette recette = recetteRepository.findById(recetteId).orElseThrow(()->new ResourceNotFoundException("Recette not found"));

        recetteRepository.delete(recette);
    }
}
