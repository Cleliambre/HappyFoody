package com.example.happy_foody.controller;

import com.example.happy_foody.model.Restaurant;
import com.example.happy_foody.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/restaurant")
@CrossOrigin
public class RestaurantController {
    private final RestaurantService restaurantService;


    @Autowired
    public RestaurantController(RestaurantService restaurantService) {this.restaurantService = restaurantService;}

    @GetMapping("/all")
    public List<Restaurant> getRestaurants(){return restaurantService.getAllRestaurants();}

    @GetMapping("/getRestaurantById/{id}")
    public Restaurant getCompteById(@PathVariable(value = "id") Long id){
        return restaurantService.getRestaurantById(id);
    }

    @PostMapping("/createRestaurant")
    public Restaurant createCompte(@RequestBody Restaurant restaurant){return restaurantService.createRestaurant(restaurant);}

    @PutMapping("/updateRestaurant/{id}")
    public Restaurant updateRestaurant(@PathVariable(value = "id") Long id, @RequestBody Restaurant Restaurant){
        return restaurantService.updateRestaurant(id, Restaurant);
    }

    @DeleteMapping("/deleteRestaurant/{id}")
    public void deleteRestaurant(@PathVariable(value = "id") Long id){
        restaurantService.deleteRestaurant(id);
    }

    /**
     * Exemple d’appel :
     * GET /api/restaurant/search?keyWords=poulet curry&tags=1,2,3
     */
    @GetMapping("/search")
    public List<Restaurant> searchRestaurants(
            @RequestParam(required = false) String keyWords,
            @RequestParam(required = false) List<String> tags
    ) {
        return restaurantService.getRestaurantbyTagsAndKeyWords(keyWords, tags);
    }

    @GetMapping("/noteMoyenne/{id}")
    public Double getNoteMoyenneById(@PathVariable(value = "id") Long id)
    {
        //logger.info(restaurantService.getNoteMoyenneById(id).toString());
        return restaurantService.getNoteMoyenneById(id);
    }

    @GetMapping("/noteRapiditeMoyenne/{id}")
    public Double getNoteRapiditeMoyenneById(@PathVariable(value = "id") Long id)
    {
        return restaurantService.getNoteRapiditeMoyenneById(id);
    }

    @GetMapping("/noteQualiteMoyenne/{id}")
    public Double getNoteQualiteMoyenneById(@PathVariable(value = "id") Long id)
    {
        return restaurantService.getNoteQualiteMoyenneById(id);
    }

    @GetMapping("/noteServiceMoyenne/{id}")
    public Double getNoteServiceMoyenneById(@PathVariable(value = "id") Long id)
    {
        return restaurantService.getNoteServiceMoyenneById(id);
    }

    @GetMapping("/noteHygieneMoyenne/{id}")
    public Double getNoteHygieneMoyenneById(@PathVariable(value = "id") Long id)
    {
        return restaurantService.getNoteHygieneMoyenneById(id);
    }

    @GetMapping("/nombreLikes/{id}")
    public Long getNombreLikesById(@PathVariable(value = "id") Long id)
    {
        return restaurantService.getNombreLikesById(id);
    }

    @PostMapping("/associerTagARestaurant")
    public void associerTagARestaurant(@RequestParam Long restaurantId, @RequestParam Long tagId){
        restaurantService.associerRestaurantTag(restaurantId, tagId);
    }


}
