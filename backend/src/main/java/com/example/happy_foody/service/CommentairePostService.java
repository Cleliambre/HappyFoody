package com.example.happy_foody.service;

import com.example.happy_foody.model.CommentairePost;
import com.example.happy_foody.repository.CommentairePostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentairePostService {

    @Autowired
    private CommentairePostRepository commentairePostRepository;

    public List<CommentairePost> getAllCommentairePosts() {
        return commentairePostRepository.findAll();
    }

    public CommentairePost getCommentairePostById(Long id) throws ResourceNotFoundException {
        CommentairePost commentairePost = commentairePostRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CommentairePost not found"));
        return commentairePost;
    }

    public CommentairePost createCommentairePost(CommentairePost commentairePost) {
        return commentairePostRepository.save(commentairePost);
    }

    public CommentairePost updateCommentairePost(Long commentairePostId, CommentairePost commentairePostDetails) throws ResourceNotFoundException {
        CommentairePost commentairePost = commentairePostRepository.findById(commentairePostId).orElseThrow(() -> new ResourceNotFoundException("CommentairePost not found"));

        commentairePost.setPost(commentairePostDetails.getPost());

        final CommentairePost updatedCommentairePost = commentairePostRepository.save(commentairePost);
        return updatedCommentairePost;
    }

    public void deleteCommentairePost(Long commentairePostId) throws ResourceNotFoundException {
        CommentairePost commentairePost = commentairePostRepository.findById(commentairePostId).orElseThrow(()->new ResourceNotFoundException("CommentairePost not found"));

        commentairePostRepository.delete(commentairePost);
    }
}
