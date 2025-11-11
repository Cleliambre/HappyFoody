package com.example.happy_foody.service;

import com.example.happy_foody.model.Restaurant;
import com.example.happy_foody.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(Long id) throws ResourceNotFoundException {
        Restaurant restaurant = restaurantRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
        return restaurant;
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Long restaurantId, Restaurant restaurantDetails) throws ResourceNotFoundException {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        restaurant.setNom(restaurantDetails.getNom());
        restaurant.setDescription(restaurantDetails.getDescription());
        restaurant.setTel(restaurantDetails.getTel());
        restaurant.setAdresse(restaurantDetails.getAdresse());
        restaurant.setHoraire(restaurantDetails.getHoraire());
        restaurant.setReseaux(restaurantDetails.getReseaux());
        restaurant.setPrix(restaurantDetails.getPrix());
        restaurant.setReserver(restaurantDetails.getReserver());
        restaurant.setMenu(restaurantDetails.getMenu());
        restaurant.setSite(restaurantDetails.getSite());
        restaurant.setUrlImage(restaurantDetails.getUrlImage());
        restaurant.setLatitude(restaurantDetails.getLatitude());
        restaurant.setLongitude(restaurantDetails.getLongitude());

        final Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
        return updatedRestaurant;
    }

    public void deleteRestaurant(Long restaurantId) throws ResourceNotFoundException {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(()->new ResourceNotFoundException("Restaurant not found"));

        restaurantRepository.delete(restaurant);
    }

    public List<String> parserMots(String texte) {
        if (texte == null || texte.isBlank()) {
            return new ArrayList<>();
        }
        // Supprime les espaces multiples et découpe
        String[] mots = texte.trim().split("\\s+");
        return Arrays.asList(mots);
    }

    public List<Restaurant> getRestaurantbyTagsAndKeyWords(String keyWords, List<String> tags){
        List<String> keyWordsList = parserMots(keyWords);

        Set<Restaurant> restaurantsParMot = new HashSet<>();
        Set<Restaurant> restaurantsParTag = new HashSet<>();

        // ---- Recherche par mots-clés ----
        if (keyWordsList != null && !keyWordsList.isEmpty()) {
            // On récupère les restaurants correspondant à CHAQUE mot
            List<Set<Restaurant>> setsParMot = keyWordsList.stream()
                    .map(mot -> new HashSet<>(restaurantRepository.findByKeyWord(mot))) // méthode existante
                    .collect(Collectors.toList());

            // Intersection : on garde seulement celles qui contiennent TOUS les mots
            if (!setsParMot.isEmpty()) {
                restaurantsParMot = new HashSet<>(setsParMot.get(0));
                for (Set<Restaurant> set : setsParMot) {
                    restaurantsParMot.retainAll(set);
                }
            }
        } else {
            // Si aucun mot-clé donné → tout est valide
            restaurantsParMot.addAll(restaurantRepository.findAll());
        }

        // ---- Recherche par tags ----
        if (tags != null && !tags.isEmpty()) {
            // On récupère les restaurants correspondant à CHAQUE tag, puis on garde celles qui ont tous les tags
            List<Set<Restaurant>> setsParTag = tags.stream()
                    .map(tag -> new HashSet<>(restaurantRepository.findByTag(tag))) // méthode existante
                    .collect(Collectors.toList());

            if (!setsParTag.isEmpty()) {
                restaurantsParTag = new HashSet<>(setsParTag.get(0));
                for (Set<Restaurant> set : setsParTag) {
                    restaurantsParTag.retainAll(set);
                }
            }
        } else {
            restaurantsParTag.addAll(restaurantRepository.findAll());
        }

        // ---- Intersection finale ----
        restaurantsParMot.retainAll(restaurantsParTag);
        return new ArrayList<>(restaurantsParMot);

    }

    public Long getNoteMoyenneById(Long id){
        Long noteHygiene = restaurantRepository.findNoteHygieneMoyenneById(id);
        Long noteQualite = restaurantRepository.findNoteQualiteMoyenneById(id);
        Long noteRapidite = restaurantRepository.findNoteRapiditeMoyenneById(id);
        Long noteService = restaurantRepository.findNoteServiceMoyenneById(id);

        // Remplacer les null par 0
        noteHygiene = (noteHygiene != null) ? noteHygiene : 0L;
        noteQualite = (noteQualite != null) ? noteQualite : 0L;
        noteRapidite = (noteRapidite != null) ? noteRapidite : 0L;
        noteService = (noteService != null) ? noteService : 0L;

        return (noteService + noteHygiene + noteQualite + noteRapidite) / 4;
    }


    public Long getNombreLikesById(Long id){
        return restaurantRepository.findNombreLikesById(id);
    }

    public void associerRestaurantTag(Long idRestaurant, Long idTag){
        restaurantRepository.associerRestaurantTag(idRestaurant,idTag);
    }

}
