package com.example.happy_foody.repository;

import com.example.happy_foody.model.Recette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecetteRepository extends JpaRepository<Recette,Long> {

    @Query(value = """
    SELECT DISTINCT r.*
    FROM recette r
    LEFT JOIN compte c ON c.id_compte = r.id_auteur
    LEFT JOIN quantite q ON q.id_recette = r.id_recette
    LEFT JOIN ingredient i ON i.id_ingredient = q.id_ingredient
    LEFT JOIN etape e ON e.id_recette = r.id_recette
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
    LEFT JOIN recette_tag rt ON r.id_recette = rt.id_recette
    LEFT JOIN tag t ON rt.id_tag = t.id_tag
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

    @Query(value = """
    SELECT AVG(cr.note)
    FROM commentaire_recette cr
    JOIN recette r ON cr.id_recette = r.id_recette
    WHERE r.id_recette = :id_recette
    """, nativeQuery = true)
    Long findNoteMoyenneById(@Param("id_recette") Long id_recette);

    @Query(value = """
    SELECT COUNT(cr.id_compte)
    FROM compte_recette cr
    JOIN recette r ON cr.id_recette = r.id_recette
    WHERE r.id_recette = :id_recette
    """, nativeQuery = true)
    Long findNombreLikesById(@Param("id_recette") Long id_recette);

    @Modifying
    @Query(value = """
    INSERT INTO recette_tag(id_recette, id_tag)
    VALUES (:id_recette, :id_tag)
    """, nativeQuery = true)
    int associerRecetteTag(@Param("id_recette") Long idRecette, @Param("id_tag") Long idTag);


}
