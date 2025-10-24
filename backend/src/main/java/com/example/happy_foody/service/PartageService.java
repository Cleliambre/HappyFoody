package com.example.happy_foody.service;

import com.example.happy_foody.model.Partage;
import com.example.happy_foody.repository.PartageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PartageService {

    @Autowired
    private PartageRepository partageRepository;

    public List<Partage> getAllPartages() {
        return partageRepository.findAll();
    }

    public Partage getPartageById(Long id) throws ResourceNotFoundException {
        Partage partage = partageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Partage not found"));
        return partage;
    }

    public Partage createPartage(Partage partage) {
        return partageRepository.save(partage);
    }

    public Partage updatePartage(Long partageId, Partage partageDetails) throws ResourceNotFoundException {
        Partage partage = partageRepository.findById(partageId).orElseThrow(() -> new ResourceNotFoundException("Partage not found"));

        partage.setAuteur(partageDetails.getAuteur());
        partage.setDescription(partageDetails.getDescription());
        partage.setTitre(partageDetails.getTitre());
        partage.setTypePartage(partageDetails.getTypePartage());
        partage.setDateExpiration(partageDetails.getDateExpiration());
        partage.setDatePublication(partageDetails.getDatePublication());
        partage.setNbPart(partageDetails.getNbPart());

        final Partage updatedPartage = partageRepository.save(partage);
        return updatedPartage;
    }

    public void deletePartage(Long partageId) throws ResourceNotFoundException {
        Partage partage = partageRepository.findById(partageId).orElseThrow(()->new ResourceNotFoundException("Partage not found"));

        partageRepository.delete(partage);
    }

    public List<String> parserMots(String texte) {
        if (texte == null || texte.isBlank()) {
            return new ArrayList<>();
        }
        // Supprime les espaces multiples et découpe
        String[] mots = texte.trim().split("\\s+");
        return Arrays.asList(mots);
    }

    public List<Partage> getPartagebyTagsAndKeyWords(String keyWords, List<String> tags){
        List<String> keyWordsList = parserMots(keyWords);

        Set<Partage> partagesParMot = new HashSet<>();
        Set<Partage> partagesParTag = new HashSet<>();

        // ---- Recherche par mots-clés ----
        if (keyWordsList != null && !keyWordsList.isEmpty()) {
            // On récupère les partages correspondant à CHAQUE mot
            List<Set<Partage>> setsParMot = keyWordsList.stream()
                    .map(mot -> new HashSet<>(partageRepository.findByKeyWord(mot))) // méthode existante
                    .collect(Collectors.toList());

            // Intersection : on garde seulement celles qui contiennent TOUS les mots
            if (!setsParMot.isEmpty()) {
                partagesParMot = new HashSet<>(setsParMot.get(0));
                for (Set<Partage> set : setsParMot) {
                    partagesParMot.retainAll(set);
                }
            }
        } else {
            // Si aucun mot-clé donné → tout est valide
            partagesParMot.addAll(partageRepository.findAll());
        }

        // ---- Recherche par tags ----
        if (tags != null && !tags.isEmpty()) {
            // On récupère les partages correspondant à CHAQUE tag, puis on garde celles qui ont tous les tags
            List<Set<Partage>> setsParTag = tags.stream()
                    .map(tag -> new HashSet<>(partageRepository.findByTag(tag))) // méthode existante
                    .collect(Collectors.toList());

            if (!setsParTag.isEmpty()) {
                partagesParTag = new HashSet<>(setsParTag.get(0));
                for (Set<Partage> set : setsParTag) {
                    partagesParTag.retainAll(set);
                }
            }
        } else {
            partagesParTag.addAll(partageRepository.findAll());
        }

        // ---- Intersection finale ----
        partagesParMot.retainAll(partagesParTag);
        return new ArrayList<>(partagesParMot);

    }
}
