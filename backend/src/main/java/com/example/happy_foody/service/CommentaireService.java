package com.example.happy_foody.service;

import com.example.happy_foody.model.Commentaire;
import com.example.happy_foody.repository.CommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;

    public List<Commentaire> getAllCommentaires() {
        return commentaireRepository.findAll();
    }

    public Commentaire getCommentaireById(Long id) throws ResourceNotFoundException {
        Commentaire commentaire = commentaireRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Commentaire not found"));
        return commentaire;
    }

    public List<Commentaire> getCommentaireResponsesByRestaurant(Long id) throws ResourceNotFoundException {
        return commentaireRepository.findResponsesByRestaurant(id);
    }

    public Commentaire createCommentaire(Commentaire commentaire) {
        return commentaireRepository.save(commentaire);
    }

    public Commentaire updateCommentaire(Long commentaireId, Commentaire commentaireDetails) throws ResourceNotFoundException {
        Commentaire commentaire = commentaireRepository.findById(commentaireId).orElseThrow(() -> new ResourceNotFoundException("Commentaire not found"));

        commentaire.setAuteur(commentaireDetails.getAuteur());
        commentaire.setContenu(commentaireDetails.getContenu());
        commentaire.setDate(commentaireDetails.getDate());
        commentaire.setCommRepondu(commentaireDetails.getCommRepondu());


        final Commentaire updatedCommentaire = commentaireRepository.save(commentaire);
        return updatedCommentaire;
    }

    public void deleteCommentaire(Long commentaireId) throws ResourceNotFoundException {
        Commentaire commentaire = commentaireRepository.findById(commentaireId).orElseThrow(()->new ResourceNotFoundException("Commentaire not found"));

        commentaireRepository.delete(commentaire);
    }
}