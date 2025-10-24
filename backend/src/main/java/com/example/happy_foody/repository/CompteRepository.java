package com.example.happy_foody.repository;

import com.example.happy_foody.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompteRepository extends JpaRepository<Compte,Long> {

    @Query(value = """
    SELECT DISTINCT r.* 
    FROM recette r
    JOIN compte_recette cr ON cr.id_recette = r.id_recette
    JOIN compte c ON c.id_compte = rc.id_compte
    WHERE c.id_compte = :id_compte
    """, nativeQuery = true)
    List<Recette> findLikedRecettes(@Param("id_compte") Long idCompte);

    @Query(value = """
    SELECT DISTINCT r.* 
    FROM restaurant r
    JOIN compte_restaurant cr ON cr.id_restaurant = r.id_restaurant
    JOIN compte c ON c.id_compte = rc.id_compte
    WHERE c.id_compte = :id_compte
    """, nativeQuery = true)
    List<Restaurant> findLikedRestaurants(@Param("id_compte") Long idCompte);

    @Query(value = """
    SELECT DISTINCT r.* 
    FROM post r
    JOIN compte_post cr ON cr.id_post = r.id_post
    JOIN compte c ON c.id_compte = rc.id_compte
    WHERE c.id_compte = :id_compte
    """, nativeQuery = true)
    List<Post> findLikedPosts(@Param("id_compte") Long idCompte);

    @Query(value = """
    SELECT DISTINCT r.* 
    FROM partage r
    JOIN compte_partage cr ON cr.id_partage = r.id_partage
    JOIN compte c ON c.id_compte = rc.id_compte
    WHERE c.id_compte = :id_compte
    """, nativeQuery = true)
    List<Partage> findLikedPartages(@Param("id_compte") Long idCompte);






}
