package com.example.happy_foody.service;

import com.example.happy_foody.model.CommentairePartage;
import com.example.happy_foody.repository.CommentairePartageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentairePartageService {

    @Autowired
    private CommentairePartageRepository commentairePartageRepository;

    public List<CommentairePartage> getAllCommentairePartages() {
        return commentairePartageRepository.findAll();
    }

    public CommentairePartage getCommentairePartageById(Long id) throws ResourceNotFoundException {
        CommentairePartage commentairePartage = commentairePartageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CommentairePartage not found"));
        return commentairePartage;
    }

    public CommentairePartage createCommentairePartage(CommentairePartage commentairePartage) {
        return commentairePartageRepository.save(commentairePartage);
    }

    public CommentairePartage updateCommentairePartage(Long commentairePartageId, CommentairePartage commentairePartageDetails) throws ResourceNotFoundException {
        CommentairePartage commentairePartage = commentairePartageRepository.findById(commentairePartageId).orElseThrow(() -> new ResourceNotFoundException("CommentairePartage not found"));

        commentairePartage.setAuteur(commentairePartageDetails.getAuteur());
        commentairePartage.setContenu(commentairePartageDetails.getContenu());
        commentairePartage.setDate(commentairePartageDetails.getDate());
        commentairePartage.setCommRepondu(commentairePartageDetails.getCommRepondu());
        commentairePartage.setPartage(commentairePartageDetails.getPartage());


        final CommentairePartage updatedCommentairePartage = commentairePartageRepository.save(commentairePartage);
        return updatedCommentairePartage;
    }

    public void deleteCommentairePartage(Long commentairePartageId) throws ResourceNotFoundException {
        CommentairePartage commentairePartage = commentairePartageRepository.findById(commentairePartageId).orElseThrow(()->new ResourceNotFoundException("CommentairePartage not found"));

        commentairePartageRepository.delete(commentairePartage);
    }
}
