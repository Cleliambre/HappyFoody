package com.example.happy_foody.repository;

import com.example.happy_foody.model.CommentaireRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentaireRestaurantRepository extends JpaRepository<CommentaireRestaurant,Long> {

}
