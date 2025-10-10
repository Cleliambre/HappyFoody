package com.example.happy_foody.service;

import com.example.happy_foody.model.Restaurant;
import com.example.happy_foody.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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

        final Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
        return updatedRestaurant;
    }

    public void deleteRestaurant(Long restaurantId) throws ResourceNotFoundException {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(()->new ResourceNotFoundException("Restaurant not found"));

        restaurantRepository.delete(restaurant);
    }
}
