package com.example.happy_foody.controller;

import com.example.happy_foody.model.CommentairePartage;
import com.example.happy_foody.service.CommentairePartageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/commentairePartage")
@CrossOrigin
public class CommentairePartageController {
    private final CommentairePartageService commentairePartageService;


    @Autowired
    public CommentairePartageController(CommentairePartageService commentairePartageService) {this.commentairePartageService = commentairePartageService;}

    @GetMapping("/all")
    public List<CommentairePartage> getCommentairePartages(){
        return commentairePartageService.getAllCommentairePartages();
    }

    @GetMapping("/getCommentairePartageById/{id}")
    public CommentairePartage getCommentairePartageById(@PathVariable(value = "id") Long id){
        return commentairePartageService.getCommentairePartageById(id);
    }

    @PostMapping("/createCommentairePartage")
    public CommentairePartage createCommentairePartage(@RequestBody CommentairePartage commentairePartage){return commentairePartageService.createCommentairePartage(commentairePartage);}

    //UPDATE
    @PutMapping("/updateCommentairePartage/{id}")
    public CommentairePartage updateCommentairePartage(@PathVariable(value = "id") Long id, @RequestBody CommentairePartage CommentairePartage){
        return commentairePartageService.updateCommentairePartage(id, CommentairePartage);
    }

    //DELETE
    @DeleteMapping("/deleteCommentairePartage/{id}")
    public void deleteCommentairePartage(@PathVariable(value = "id") Long id) {
        commentairePartageService.deleteCommentairePartage(id);
    }
}
