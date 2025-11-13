package com.example.happy_foody.repository;

import com.example.happy_foody.model.Commentaire;
import com.example.happy_foody.model.CommentaireRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire,Long> {

    @Query("""
    SELECT c
    FROM Commentaire c
    JOIN CommentaireRestaurant cr ON c.commRepondu = cr
    WHERE cr.restaurant.idRestaurant = :idRestaurant
    """)
    List<Commentaire> findResponsesByRestaurant(@Param("idRestaurant") Long idRestaurant);

}
