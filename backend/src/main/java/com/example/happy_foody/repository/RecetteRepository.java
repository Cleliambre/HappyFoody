package com.example.happy_foody.repository;

import com.example.happy_foody.model.Recette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecetteRepository extends JpaRepository<Recette,Long> {

    @Query(value = """
    SELECT DISTINCT r.*
    FROM recette r
    JOIN compte c ON c.id_compte = r.id_auteur
    JOIN quantite q ON q.id_recette = r.id_recette
    JOIN ingrédient i ON i.id_ingredient = q.id_ingredient
    JOIN etape e ON e.id_recette = r.id_recette
    WHERE
        LOWER(c.pseudo) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(i.nom) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(e.txt_etape) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(r.description) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(r.titre) LIKE LOWER(CONCAT('%', :motCle, '%'))
    """, nativeQuery = true)
    List<Recette> findByKeyWord(@Param("motCle") String motCle);

    @Query(value = """
    SELECT DISTINCT r.*
    FROM recette r
    JOIN recette_tag rt ON r.id_recette = rt.id_recette
    JOIN tag t ON rt.id_tag = t.id_tag
    WHERE t.nom = :nom

    """, nativeQuery = true)
    List<Recette> findByTag(@Param("nom") String nom);

    @Query(value = """
    SELECT DISTINCT r.*
    FROM recette r
    JOIN compte c ON r.id_auteur = c.id_compte
    WHERE r.id_auteur = :id_auteur
    """, nativeQuery = true)
    List<Recette> findByAuthor(@Param("id_auteur") Long id_auteur);
}
