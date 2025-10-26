package com.example.happy_foody.service;

import com.example.happy_foody.model.Recette;
import com.example.happy_foody.repository.RecetteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    public List<Recette> getRecettesByAuthor(Long id_auteur) {
        return recetteRepository.findByAuthor(id_auteur);
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


    public List<String> parserMots(String texte) {
        if (texte == null || texte.isBlank()) {
            return new ArrayList<>();
        }
        // Supprime les espaces multiples et découpe
        String[] mots = texte.trim().split("\\s+");
        return Arrays.asList(mots);
    }

    public List<Recette> getRecettebyTagsAndKeyWords(String keyWords, List<String> tags){
        List<String> keyWordsList = parserMots(keyWords);

        Set<Recette> recettesParMot = new HashSet<>();
        Set<Recette> recettesParTag = new HashSet<>();

        // ---- Recherche par mots-clés ----
        if (keyWordsList != null && !keyWordsList.isEmpty()) {
            // On récupère les recettes correspondant à CHAQUE mot
            List<Set<Recette>> setsParMot = keyWordsList.stream()
                    .map(mot -> new HashSet<>(recetteRepository.findByKeyWord(mot))) // méthode existante
                    .collect(Collectors.toList());

            // Intersection : on garde seulement celles qui contiennent TOUS les mots
            if (!setsParMot.isEmpty()) {
                recettesParMot = new HashSet<>(setsParMot.get(0));
                for (Set<Recette> set : setsParMot) {
                    recettesParMot.retainAll(set);
                }
            }
        } else {
            // Si aucun mot-clé donné → tout est valide
            recettesParMot.addAll(recetteRepository.findAll());
        }

        // ---- Recherche par tags ----
        if (tags != null && !tags.isEmpty()) {
            // On récupère les recettes correspondant à CHAQUE tag, puis on garde celles qui ont tous les tags
            List<Set<Recette>> setsParTag = tags.stream()
                    .map(tag -> new HashSet<>(recetteRepository.findByTag(tag))) // méthode existante
                    .collect(Collectors.toList());

            if (!setsParTag.isEmpty()) {
                recettesParTag = new HashSet<>(setsParTag.get(0));
                for (Set<Recette> set : setsParTag) {
                    recettesParTag.retainAll(set);
                }
            }
        } else {
            recettesParTag.addAll(recetteRepository.findAll());
        }

        // ---- Intersection finale ----
        recettesParMot.retainAll(recettesParTag);
        return new ArrayList<>(recettesParMot);

    }

}
