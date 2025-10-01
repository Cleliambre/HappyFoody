package com.example.happy_foody.service;


import com.example.happy_foody.model.Post;
import com.example.happy_foody.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    public Post getPostById(Long id) throws ResourceNotFoundException {
        Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        return post;
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public  Post updatePost(Long postId, Post postDetails) throws ResourceNotFoundException {
        Post post = postRepository.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post not found"));

        post.setAuteur(postDetails.getAuteur());
        post.setTitre(postDetails.getTitre());
        post.setContenu(postDetails.getContenu());
        post.setDate(postDetails.getDate());

        final Post updatedPost = postRepository.save(post);
        return updatedPost;

    }

    public void deletePost(Long postId) throws ResourceNotFoundException {
        Post post = postRepository.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post not found"));

        postRepository.delete(post);
    }
}
