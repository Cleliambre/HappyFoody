package com.example.happy_foody.service;

import com.example.happy_foody.model.CommentaireRecette;
import com.example.happy_foody.repository.CommentaireRecetteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaireRecetteService {

    @Autowired
    private CommentaireRecetteRepository commentaireRecetteRepository;

    public List<CommentaireRecette> getAllCommentaireRecettes() {
        return commentaireRecetteRepository.findAll();
    }

    public CommentaireRecette getCommentaireRecetteById(Long id) throws ResourceNotFoundException {
        CommentaireRecette commentaireRecette = commentaireRecetteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CommentaireRecette not found"));
        return commentaireRecette;
    }

    public CommentaireRecette createCommentaireRecette(CommentaireRecette commentaireRecette) {
        return commentaireRecetteRepository.save(commentaireRecette);
    }

    public CommentaireRecette updateCommentaireRecette(Long commentaireRecetteId, CommentaireRecette commentaireRecetteDetails) throws ResourceNotFoundException {
        CommentaireRecette commentaireRecette = commentaireRecetteRepository.findById(commentaireRecetteId).orElseThrow(() -> new ResourceNotFoundException("CommentaireRecette not found"));

        commentaireRecette.setAuteur(commentaireRecetteDetails.getAuteur());
        commentaireRecette.setContenu(commentaireRecetteDetails.getContenu());
        commentaireRecette.setDate(commentaireRecetteDetails.getDate());
        commentaireRecette.setCommRepondu(commentaireRecetteDetails.getCommRepondu());
        commentaireRecette.setNote(commentaireRecetteDetails.getNote());
        commentaireRecette.setRecette(commentaireRecetteDetails.getRecette());


        final CommentaireRecette updatedCommentaireRecette = commentaireRecetteRepository.save(commentaireRecette);
        return updatedCommentaireRecette;
    }

    public void deleteCommentaireRecette(Long commentaireRecetteId) throws ResourceNotFoundException {
        CommentaireRecette commentaireRecette = commentaireRecetteRepository.findById(commentaireRecetteId).orElseThrow(()->new ResourceNotFoundException("CommentaireRecette not found"));

        commentaireRecetteRepository.delete(commentaireRecette);
    }
}
