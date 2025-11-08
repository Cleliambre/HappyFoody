package com.example.happy_foody.repository;

import com.example.happy_foody.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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

    @Modifying
    @Query(value = """
    INSERT INTO compte_recette VALUES
    (:id_compte,:id_recette)
    """, nativeQuery = true)
    int saveLikedRecette(@Param("id_compte") Long idCompte, @Param("id_recette") Long idRecette);

    @Modifying
    @Query(value = """
    INSERT INTO compte_restaurant VALUES
    (:id_compte,:id_restaurant)
    """, nativeQuery = true)
    int saveLikedRestaurant(@Param("id_compte") Long idCompte, @Param("id_restaurant") Long idRestaurant);

    @Modifying
    @Query(value = """
    INSERT INTO compte_post VALUES
    (:id_compte,:id_post)
    """, nativeQuery = true)
    int saveLikedPost(@Param("id_compte") Long idCompte, @Param("id_post") Long idPost);

    @Modifying
    @Query(value = """
    INSERT INTO compte_partage VALUES
    (:id_compte,:id_partage)
    """, nativeQuery = true)
    int saveLikedPartage(@Param("id_compte") Long idCompte, @Param("id_partage") Long idPartage);


    @Modifying
    @Query(value = """
    DELETE FROM compte_recette cr
    WHERE cr.id_compte = :id_compte AND cr.id_recette = :id_recette
    """, nativeQuery = true)
    int deleteLikedRecette(@Param("id_compte") Long idCompte, @Param("id_recette") Long idRecette);

    @Modifying
    @Query(value = """
    DELETE FROM compte_restaurant cr
    WHERE cr.id_compte = :id_compte AND cr.id_restaurant = :id_restaurant
    """, nativeQuery = true)
    int deleteLikedRestaurant(@Param("id_compte") Long idCompte, @Param("id_restaurant") Long idRestaurant);

    @Modifying
    @Query(value = """
    DELETE FROM compte_post cp
    WHERE cp.id_compte = :id_compte AND cp.id_post = :id_post
    """, nativeQuery = true)
    int deleteLikedPost(@Param("id_compte") Long idCompte, @Param("id_post") Long idPost);

    @Modifying
    @Query(value = """
    DELETE FROM compte_partage cp
    WHERE cp.id_compte = :id_compte AND cp.id_partage = :id_partage
    """, nativeQuery = true)
    int deleteLikedPartage(@Param("id_compte") Long idCompte, @Param("id_partage") Long idPartage);

    @Query(value = """
    SELECT DISTINCT c.*
    FROM compte c
    WHERE c.mail = :mail OR c.pseudo = :pseudo
    """, nativeQuery = true)
    Optional<Compte> findByMailOrPseudo(@Param("mail") String mail, @Param("pseudo") String pseudo);

    @Query(value = """
    SELECT DISTINCT c.*
    FROM compte c
    WHERE c.pseudo = :pseudo
    """, nativeQuery = true)
    Compte findByPseudo(@Param("pseudo") String pseudo);

}


