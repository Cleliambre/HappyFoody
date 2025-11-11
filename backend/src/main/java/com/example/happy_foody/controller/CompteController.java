package com.example.happy_foody.controller;

import com.example.happy_foody.model.*;
import com.example.happy_foody.service.CompteService;
import com.example.happy_foody.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path="api/compte")
@CrossOrigin
public class CompteController {
    private final CompteService compteService;
    private final JwtService jwtService;


    @Autowired
    public CompteController(CompteService compteService, JwtService jwtService) {
        this.compteService = compteService;
        this.jwtService = jwtService;
    }

    @GetMapping("/all")
    public List<Compte> getComptes(){
        return compteService.getAllComptes();
    }

    //SELECT
    @GetMapping("/getCompteById/{id}")
    public Compte getCompteById(@PathVariable(value = "id") Long id){
        return compteService.getCompteById(id);
    }

    @GetMapping("/getCompteByPseudo/{pseudo}")
    public ResponseEntity<?> getCompteByPseudo(@PathVariable(value = "pseudo") String pseudo) {
        Compte compte = compteService.getCompteByPseudo(pseudo);
        if (compte == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aucun compte trouvé pour ce pseudo");
        }
        return ResponseEntity.ok(compte);
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

    @PostMapping("/saveLikedRecette")
    public void createLikedRecette(@RequestParam Long compteId, @RequestParam Long recetteId){
        compteService.createLikedRecette(compteId, recetteId);
    }

    @PostMapping("/saveLikedRestaurant")
    public void createLikedRestaurant(@RequestParam Long compteId, @RequestParam Long restaurantId){
        compteService.createLikedRestaurant(compteId, restaurantId);
    }

    @PostMapping("/saveLikedPost")
    public void createLikedPost(@RequestParam Long compteId, @RequestParam Long postId){
        compteService.createLikedPost(compteId, postId);
    }

    @PostMapping("/saveLikedPartage")
    public void createLikedPartage(@RequestParam Long compteId, @RequestParam Long partageId){
        compteService.createLikedPartage(compteId, partageId);
    }

    @DeleteMapping("/deleteLikedRecette")
    public void deleteLikedRecette(@RequestParam Long compteId, @RequestParam Long recetteId){
        compteService.deleteLikedRecette(compteId, recetteId);
    }

    @DeleteMapping("/deleteLikedRestaurant")
    public void deleteLikedRestaurant(@RequestParam Long compteId, @RequestParam Long restaurantId){
        compteService.deleteLikedRestaurant(compteId, restaurantId);
    }

    @DeleteMapping("/deleteLikedPost")
    public void deleteLikedPost(@RequestParam Long compteId, @RequestParam Long postId){
        compteService.deleteLikedPost(compteId, postId);
    }

    @DeleteMapping("/deleteLikedPartage")
    public void deleteLikedPartage(@RequestParam Long compteId, @RequestParam Long partageId){
        compteService.deleteLikedPartage(compteId, partageId);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String mailOrPseudo = credentials.get("mailOrPseudo");
        String password = credentials.get("password");

        System.out.println(mailOrPseudo);
        System.out.println(password);

        // On cherche le compte
        Optional<Compte> compteOpt = compteService.getCompteByMailOrPseudo(mailOrPseudo, mailOrPseudo);


        if (compteOpt.isPresent()) {
            Compte compte = compteOpt.get();
            if (compte.getPassword().equals(password)) {
                // Génération du token JWT
                String token = jwtService.generateToken(compte);
                return ResponseEntity.ok(Map.of("token", token, "idCompte", compte.getIdCompte()));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Identifiants incorrects"));
    }



    @PutMapping("/updatePassword/{id}")
    public String updatePassword(
            @PathVariable(value = "id") Long id,
            @RequestBody Map<String, String> body) {

        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");

        boolean updated = compteService.updatePassword(id, oldPassword, newPassword);
        return updated ? "Mot de passe mis à jour avec succès" : "Ancien mot de passe incorrect";
    }

}

