package com.example.happy_foody.controller;

import com.example.happy_foody.model.CommentaireRecette;
import com.example.happy_foody.service.CommentaireRecetteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/commentaireRecette")
@CrossOrigin
public class CommentaireRecetteController {
    private final CommentaireRecetteService commentaireRecetteService;


    @Autowired
    public CommentaireRecetteController(CommentaireRecetteService commentaireRecetteService) {this.commentaireRecetteService = commentaireRecetteService;}

    @GetMapping("/all")
    public List<CommentaireRecette> getCommentaireRecettes(){
        return commentaireRecetteService.getAllCommentaireRecettes();
    }

    @GetMapping("/getCommentaireRecetteById/{id}")
    public CommentaireRecette getCommentaireRecetteById(@PathVariable(value = "id") Long id){
        return commentaireRecetteService.getCommentaireRecetteById(id);
    }

    @PostMapping("/createCommentaireRecette")
    public CommentaireRecette createCommentaireRecette(@RequestBody CommentaireRecette commentaireRecette){return commentaireRecetteService.createCommentaireRecette(commentaireRecette);}

    //UPDATE
    @PutMapping("/updateCommentaireRecette/{id}")
    public CommentaireRecette updateCommentaireRecette(@PathVariable(value = "id") Long id, @RequestBody CommentaireRecette CommentaireRecette){
        return commentaireRecetteService.updateCommentaireRecette(id, CommentaireRecette);
    }

    //DELETE
    @DeleteMapping("/deleteCommentaireRecette/{id}")
    public void deleteCommentaireRecette(@PathVariable(value = "id") Long id) {
        commentaireRecetteService.deleteCommentaireRecette(id);
    }
}
