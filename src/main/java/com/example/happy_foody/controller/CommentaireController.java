package com.example.happy_foody.controller;

import com.example.happy_foody.model.Commentaire;
import com.example.happy_foody.service.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/commentaire")
@CrossOrigin
public class CommentaireController {
    private final CommentaireService commentaireService;


    @Autowired
    public CommentaireController(CommentaireService commentaireService) {this.commentaireService = commentaireService;}

    @GetMapping("/all")
    public List<Commentaire> getCommentaires(){
        return commentaireService.getAllCommentaires();
    }

    @GetMapping("/getCommentaireById/{id}")
    public Commentaire getCommentaireById(@PathVariable(value = "id") Long id){
        return commentaireService.getCommentaireById(id);
    }

    @PostMapping("/createCommentaire")
    public Commentaire createCommentaire(@RequestBody Commentaire commentaire){return commentaireService.createCommentaire(commentaire);}

    //UPDATE
    @PutMapping("/updateCommentaire/{id}")
    public Commentaire updateCommentaire(@PathVariable(value = "id") Long id, @RequestBody Commentaire Commentaire){
        return commentaireService.updateCommentaire(id, Commentaire);
    }

    //DELETE
    @DeleteMapping("/deleteCommentaire/{id}")
    public void deleteCommentaire(@PathVariable(value = "id") Long id) {
        commentaireService.deleteCommentaire(id);
    }
}
