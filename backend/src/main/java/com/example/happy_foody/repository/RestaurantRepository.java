package com.example.happy_foody.repository;

import com.example.happy_foody.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    @Query(value = """
    SELECT AVG(cr.note_hygiene)
    FROM commentaire_restaurant cr
    JOIN restaurant r ON cr.id_restaurant = r.id_restaurant
    WHERE r.id_restaurant = :id_restaurant AND cr.note_hygiene >= 1
    """, nativeQuery = true)
    Double findNoteHygieneMoyenneById(@Param("id_restaurant") Long id_restaurant);

    @Query(value = """
    SELECT AVG(cr.note_qualite)
    FROM commentaire_restaurant cr
    JOIN restaurant r ON cr.id_restaurant = r.id_restaurant
    WHERE r.id_restaurant = :id_restaurant AND cr.note_qualite>=1
    """, nativeQuery = true)
    Double findNoteQualiteMoyenneById(@Param("id_restaurant") Long id_restaurant);

    @Query(value = """
    SELECT AVG(cr.note_rapidite)
    FROM commentaire_restaurant cr
    JOIN restaurant r ON cr.id_restaurant = r.id_restaurant
    WHERE r.id_restaurant = :id_restaurant AND cr.note_rapidite>=1
    """, nativeQuery = true)
    Double findNoteRapiditeMoyenneById(@Param("id_restaurant") Long id_restaurant);

    @Query(value = """
    SELECT AVG(cr.note_service)
    FROM commentaire_restaurant cr
    JOIN restaurant r ON cr.id_restaurant = r.id_restaurant
    WHERE r.id_restaurant = :id_restaurant AND cr.note_service>=1
    """, nativeQuery = true)
    Double findNoteServiceMoyenneById(@Param("id_restaurant") Long id_restaurant);

    @Query(value = """
    SELECT COUNT(cr.id_compte)
    FROM compte_restaurant cr
    JOIN restaurant r ON cr.id_restaurant = r.id_restaurant
    WHERE r.id_restaurant = :id_restaurant
    """, nativeQuery = true)
    Long findNombreLikesById(@Param("id_restaurant") Long id_restaurant);

    @Modifying
    @Query(value = """
    INSERT INTO restaurant_tag(id_restaurant, id_tag)
    VALUES (:id_restaurant, :id_tag)
    """, nativeQuery = true)
    int associerRestaurantTag(@Param("id_restaurant") Long idRestaurant, @Param("id_tag") Long idTag);

}
