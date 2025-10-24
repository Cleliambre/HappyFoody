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
    JOIN compte c ON c.id_compte = cr.id_compte
    WHERE c.id_compte = :id_compte
    """, nativeQuery = true)
    List<Recette> findLikedRecettes(@Param("id_compte") Long idCompte);

    @Query(value = """
    SELECT DISTINCT r.* 
    FROM restaurant r
    JOIN compte_restaurant cr ON cr.id_restaurant = r.id_restaurant
    JOIN compte c ON c.id_compte = cr.id_compte
    WHERE c.id_compte = :id_compte
    """, nativeQuery = true)
    List<Restaurant> findLikedRestaurants(@Param("id_compte") Long idCompte);

    @Query(value = """
    SELECT DISTINCT p.* 
    FROM post p
    JOIN compte_post cp ON cp.id_post = p.id_post
    JOIN compte c ON c.id_compte = cp.id_compte
    WHERE c.id_compte = :id_compte
    """, nativeQuery = true)
    List<Post> findLikedPosts(@Param("id_compte") Long idCompte);

    @Query(value = """
    SELECT DISTINCT p.* 
    FROM partage p
    JOIN compte_partage cp ON cp.id_partage = p.id_partage
    JOIN compte c ON c.id_compte = cp.id_compte
    WHERE c.id_compte = :id_compte
    """, nativeQuery = true)
    List<Partage> findLikedPartages(@Param("id_compte") Long idCompte);






}
