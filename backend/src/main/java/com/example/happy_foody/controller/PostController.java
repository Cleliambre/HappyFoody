package com.example.happy_foody.controller;

import com.example.happy_foody.model.Post;
import com.example.happy_foody.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/post")
@CrossOrigin
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService){
        this.postService = postService;
    }

    //SELECT
    @GetMapping("/all")
    public List<Post> getPosts(){
        return postService.getAllPosts();
    }

    //SELECT
    @GetMapping("/getPostById/{id}")
    public Post getPostById(@PathVariable(value = "id") Long id){
        return postService.getPostById(id);
    }

    //INSERT
    @PostMapping("/createPost")
    public Post createPost(@RequestBody Post Post){return postService.createPost(Post);}

    //UPDATE
    @PutMapping("/updatePost/{id}")
    public Post updatePost(@PathVariable(value = "id") Long id, @RequestBody Post Post){
        return postService.updatePost(id, Post);
    }

    //DELETE
    @DeleteMapping("/deletePost/{id}")
    public void deletePost(@PathVariable(value = "id") Long id){
        postService.deletePost(id);
    }
}
