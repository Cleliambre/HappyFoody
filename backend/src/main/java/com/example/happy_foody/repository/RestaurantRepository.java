package com.example.happy_foody.repository;

import com.example.happy_foody.model.Recette;
import com.example.happy_foody.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {

    @Query(value = """
    SELECT DISTINCT r.* 
    FROM restaurant r
    WHERE 
        LOWER(r.nom) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(r.description) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(r.adresse) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(r.reseaux) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(r.site) LIKE LOWER(CONCAT('%', :motCle, '%'))
    """, nativeQuery = true)
    List<Restaurant> findByKeyWord(@Param("motCle") String motCle);

    @Query(value = """
    SELECT DISTINCT r.* 
    FROM restaurant r
    JOIN restaurant_tag rt ON r.id_restaurant = rt.id_restaurant
    JOIN tag t ON rt.id_tag = t.id_tag
    WHERE t.nom = :nom

    """, nativeQuery = true)
    List<Restaurant> findByTag(@Param("nom") String nom);

}
