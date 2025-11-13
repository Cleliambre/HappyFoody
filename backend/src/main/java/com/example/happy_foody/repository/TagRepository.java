package com.example.happy_foody.repository;

import com.example.happy_foody.model.Ingredient;
import com.example.happy_foody.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {

    @Query(value = """
    SELECT DISTINCT t.*
    FROM tag t
    JOIN recette_tag rt ON rt.id_tag = t.id_tag
    JOIN recette r ON rt.id_recette = r.id_recette
    WHERE r.id_recette = :id_recette
    """, nativeQuery = true)
    List<Tag> findByRecette(@Param("id_recette") Long id_recette);

    @Query(value= """
    SELECT DISTINCT t.*
    FROM tag t
    WHERE t.nom = :nom
    """, nativeQuery = true)
    Optional<Tag> findByNom(@Param("nom") String nom);
}
