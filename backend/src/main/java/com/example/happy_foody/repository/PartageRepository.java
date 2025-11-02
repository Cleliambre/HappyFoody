package com.example.happy_foody.repository;

import com.example.happy_foody.model.Partage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartageRepository extends JpaRepository<Partage,Long> {

    @Query(value = """
    SELECT DISTINCT p.*
    FROM partage p
    WHERE
        LOWER(p.titre) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(p.description) LIKE LOWER(CONCAT('%', :motCle, '%'))
    """, nativeQuery = true)
    List<Partage> findByKeyWord(@Param("motCle") String motCle);

    @Query(value = """
    SELECT DISTINCT p.*
    FROM partage p
    JOIN partage_tag pt ON p.id_partage = pt.id_partage
    JOIN tag t ON pt.id_tag = t.id_tag
    WHERE t.nom = :nom

    """, nativeQuery = true)
    List<Partage> findByTag(@Param("nom") String nom);

    @Query(value = """
    SELECT DISTINCT p.*
    FROM partage p
    JOIN compte c ON p.id_auteur = c.id_compte
    WHERE p.id_auteur = :id_auteur
    """, nativeQuery = true)
    List<Partage> findByAuthor(@Param("id_auteur") Long id_auteur);
}
