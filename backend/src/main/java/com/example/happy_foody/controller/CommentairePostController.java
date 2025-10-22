package com.example.happy_foody.controller;

import com.example.happy_foody.model.CommentairePost;
import com.example.happy_foody.service.CommentairePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/commentairePost")
@CrossOrigin
public class CommentairePostController {
    private final CommentairePostService commentairePostService;


    @Autowired
    public CommentairePostController(CommentairePostService commentairePostService) {this.commentairePostService = commentairePostService;}

    @GetMapping("/all")
    public List<CommentairePost> getCommentairePosts(){
        return commentairePostService.getAllCommentairePosts();
    }

    @GetMapping("/getCommentairePostById/{id}")
    public CommentairePost getCommentairePostById(@PathVariable(value = "id") Long id){
        return commentairePostService.getCommentairePostById(id);
    }

    @PostMapping("/createCommentairePost")
    public CommentairePost createCommentairePost(@RequestBody CommentairePost commentairePost){return commentairePostService.createCommentairePost(commentairePost);}

    //UPDATE
    @PutMapping("/updateCommentairePost/{id}")
    public CommentairePost updateCommentairePost(@PathVariable(value = "id") Long id, @RequestBody CommentairePost CommentairePost){
        return commentairePostService.updateCommentairePost(id, CommentairePost);
    }

    //DELETE
    @DeleteMapping("/deleteCommentairePost/{id}")
    public void deleteCommentairePost(@PathVariable(value = "id") Long id) {
        commentairePostService.deleteCommentairePost(id);
    }
}
