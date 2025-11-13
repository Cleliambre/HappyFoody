package com.example.happy_foody.repository;

import com.example.happy_foody.model.CommentaireRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentaireRestaurantRepository extends JpaRepository<CommentaireRestaurant,Long> {
    @Query(value = """
    SELECT DISTINCT *
    FROM commentaire_restaurant cr
    JOIN commentaire c ON cr.id_commentaire = c.id_commentaire
    WHERE cr.id_restaurant = :id_restaurant
    """, nativeQuery = true)
    List<CommentaireRestaurant> findByRestaurant(@Param("id_restaurant") Long id_restaurant);

}
