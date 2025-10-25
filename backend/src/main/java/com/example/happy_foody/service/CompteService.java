package com.example.happy_foody.service;

import com.example.happy_foody.model.*;
import com.example.happy_foody.repository.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompteService {

    @Autowired
    private CompteRepository compteRepository;

    public List<Compte> getAllComptes() {
        return compteRepository.findAll();
    }

    public Compte getCompteById(Long id) throws ResourceNotFoundException {
        Compte compte = compteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Compte not found"));
        return compte;
    }

    public Compte createCompte(Compte compte) {
        return compteRepository.save(compte);
    }

    public Compte updateCompte(Long compteId, Compte compteDetails) throws ResourceNotFoundException {
        Compte compte = compteRepository.findById(compteId).orElseThrow(() -> new ResourceNotFoundException("Compte not found"));

        compte.setPseudo(compteDetails.getPseudo());
        compte.setPassword(compteDetails.getPassword());
        compte.setDescription(compteDetails.getDescription());
        compte.setMail(compteDetails.getMail());
        compte.setUrlImage(compteDetails.getUrlImage());
        compte.setScoreConfiance(compteDetails.getScoreConfiance());

        final Compte updatedCompte = compteRepository.save(compte);
        return updatedCompte;
    }

    public void deleteCompte(Long compteId) throws ResourceNotFoundException {
        Compte compte = compteRepository.findById(compteId).orElseThrow(()->new ResourceNotFoundException("Compte not found"));

        compteRepository.delete(compte);
    }

    public List<Recette> getLikedRecettes(Long compteId) {
        return compteRepository.findLikedRecettes(compteId);
    }

    public List<Restaurant> getLikedRestaurants(Long compteId) {
        return compteRepository.findLikedRestaurants(compteId);
    }

    public List<Post> getLikedPosts(Long compteId) {
        return compteRepository.findLikedPosts(compteId);
    }

    public List<Partage> getLikedPartages(Long compteId) {
        return compteRepository.findLikedPartages(compteId);
    }

    public boolean createLikedRecette(Long compteId, Long recetteId) {
        int rows = compteRepository.saveLikedRecette(compteId, recetteId);
        return rows>0;
    }

    public boolean createLikedRestaurant(Long compteId, Long restaurantId) {
        int rows = compteRepository.saveLikedRestaurant(compteId, restaurantId);
        return rows>0;
    }

    public boolean createLikedPost(Long compteId, Long postId) {
        int rows = compteRepository.saveLikedPost(compteId, postId);
        return rows>0;
    }

    public boolean createLikedPartage(Long compteId, Long partageId) {
        int rows = compteRepository.saveLikedPartage(compteId, partageId);
        return rows>0;
    }
}
