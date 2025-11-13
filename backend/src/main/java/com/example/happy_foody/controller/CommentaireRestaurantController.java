package com.example.happy_foody.controller;

import com.example.happy_foody.model.CommentaireRestaurant;
import com.example.happy_foody.service.CommentaireRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/commentaireRestaurant")
@CrossOrigin
public class CommentaireRestaurantController {
    private final CommentaireRestaurantService commentaireRestaurantService;


    @Autowired
    public CommentaireRestaurantController(CommentaireRestaurantService commentaireRestaurantService) {this.commentaireRestaurantService = commentaireRestaurantService;}

    @GetMapping("/all")
    public List<CommentaireRestaurant> getCommentaireRestaurants(){
        return commentaireRestaurantService.getAllCommentaireRestaurants();
    }

    @GetMapping("/getCommentaireRestaurantById/{id}")
    public CommentaireRestaurant getCommentaireRestaurantById(@PathVariable(value = "id") Long id){
        return commentaireRestaurantService.getCommentaireRestaurantById(id);
    }

    @GetMapping("/getCommentaireRestaurantByRestaurant/{id}")
    public List<CommentaireRestaurant> getCommentaireRestaurantByRestaurant(@PathVariable(value = "id") Long id){
        return commentaireRestaurantService.getCommentaireRestaurantByRestaurant(id);
    }

    @PostMapping("/createCommentaireRestaurant")
    public CommentaireRestaurant createCommentaireRestaurant(@RequestBody CommentaireRestaurant commentaireRestaurant){return commentaireRestaurantService.createCommentaireRestaurant(commentaireRestaurant);}

    //UPDATE
    @PutMapping("/updateCommentaireRestaurant/{id}")
    public CommentaireRestaurant updateCommentaireRestaurant(@PathVariable(value = "id") Long id, @RequestBody CommentaireRestaurant CommentaireRestaurant){
        return commentaireRestaurantService.updateCommentaireRestaurant(id, CommentaireRestaurant);
    }

    //DELETE
    @DeleteMapping("/deleteCommentaireRestaurant/{id}")
    public void deleteCommentaireRestaurant(@PathVariable(value = "id") Long id) {
        commentaireRestaurantService.deleteCommentaireRestaurant(id);
    }
}
