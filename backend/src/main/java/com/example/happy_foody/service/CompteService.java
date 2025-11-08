package com.example.happy_foody.service;

import com.example.happy_foody.model.*;
import com.example.happy_foody.repository.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
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

    public void createLikedRecette(Long compteId, Long recetteId) {
        int rows = compteRepository.saveLikedRecette(compteId, recetteId);
    }

    public void createLikedRestaurant(Long compteId, Long restaurantId) {
        int rows = compteRepository.saveLikedRestaurant(compteId, restaurantId);
    }

    public void createLikedPost(Long compteId, Long postId) {
        int rows = compteRepository.saveLikedPost(compteId, postId);
    }

    public void createLikedPartage(Long compteId, Long partageId) {
        int rows = compteRepository.saveLikedPartage(compteId, partageId);
    }

    public void deleteLikedRecette(Long compteId, Long recetteId) {
        int rows = compteRepository.deleteLikedRecette(compteId, recetteId);
    }

    public void deleteLikedRestaurant(Long compteId, Long restaurantId) {
        int rows = compteRepository.deleteLikedRestaurant(compteId, restaurantId);
    }

    public void deleteLikedPost(Long compteId, Long postId) {
        int rows = compteRepository.deleteLikedPost(compteId, postId);
    }

    public void deleteLikedPartage(Long compteId, Long partageId) {
        int rows = compteRepository.deleteLikedPartage(compteId, partageId);
    }

    public Optional<Compte> getCompteByMailOrPseudo(String mail, String pseudo){
        return compteRepository.findByMailOrPseudo(mail, pseudo);
    }

    public boolean updatePassword(Long id, String oldPassword, String newPassword) {
        Optional<Compte> compteOpt = compteRepository.findById(id);
        if (compteOpt.isEmpty()) {
            return false;
        }

        Compte compte = compteOpt.get();

        // Vérifie l'ancien mot de passe
        if (!compte.getPassword().equals(oldPassword)) {
            return false;
        }

        // Met à jour le mot de passe
        compte.setPassword(newPassword);
        compteRepository.save(compte);
        return true;
    }

}
