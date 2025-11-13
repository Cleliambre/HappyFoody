package com.example.happy_foody.service;

import com.example.happy_foody.model.CommentaireRestaurant;
import com.example.happy_foody.repository.CommentaireRestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaireRestaurantService {

    @Autowired
    private CommentaireRestaurantRepository commentaireRestaurantRepository;

    public List<CommentaireRestaurant> getAllCommentaireRestaurants() {
        return commentaireRestaurantRepository.findAll();
    }

    public CommentaireRestaurant getCommentaireRestaurantById(Long id) throws ResourceNotFoundException {
        CommentaireRestaurant commentaireRestaurant = commentaireRestaurantRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CommentaireRestaurant not found"));
        return commentaireRestaurant;
    }

    public List<CommentaireRestaurant> getCommentaireRestaurantByRestaurant(Long id) throws ResourceNotFoundException {
        return commentaireRestaurantRepository.findByRestaurant(id);
    }

    public CommentaireRestaurant createCommentaireRestaurant(CommentaireRestaurant commentaireRestaurant) {
        return commentaireRestaurantRepository.save(commentaireRestaurant);
    }

    public CommentaireRestaurant updateCommentaireRestaurant(Long commentaireRestaurantId, CommentaireRestaurant commentaireRestaurantDetails) throws ResourceNotFoundException {
        CommentaireRestaurant commentaireRestaurant = commentaireRestaurantRepository.findById(commentaireRestaurantId).orElseThrow(() -> new ResourceNotFoundException("CommentaireRestaurant not found"));

        commentaireRestaurant.setAuteur(commentaireRestaurantDetails.getAuteur());
        commentaireRestaurant.setContenu(commentaireRestaurantDetails.getContenu());
        commentaireRestaurant.setDate(commentaireRestaurantDetails.getDate());
        commentaireRestaurant.setCommRepondu(commentaireRestaurantDetails.getCommRepondu());
        commentaireRestaurant.setNoteHygiene(commentaireRestaurantDetails.getNoteHygiene());
        commentaireRestaurant.setNoteQualite(commentaireRestaurantDetails.getNoteQualite());
        commentaireRestaurant.setNoteRapidite(commentaireRestaurantDetails.getNoteRapidite());
        commentaireRestaurant.setNoteService(commentaireRestaurantDetails.getNoteService());
        commentaireRestaurant.setRestaurant(commentaireRestaurantDetails.getRestaurant());


        final CommentaireRestaurant updatedCommentaireRestaurant = commentaireRestaurantRepository.save(commentaireRestaurant);
        return updatedCommentaireRestaurant;
    }

    public void deleteCommentaireRestaurant(Long commentaireRestaurantId) throws ResourceNotFoundException {
        CommentaireRestaurant commentaireRestaurant = commentaireRestaurantRepository.findById(commentaireRestaurantId).orElseThrow(()->new ResourceNotFoundException("CommentaireRestaurant not found"));

        commentaireRestaurantRepository.delete(commentaireRestaurant);
    }
}