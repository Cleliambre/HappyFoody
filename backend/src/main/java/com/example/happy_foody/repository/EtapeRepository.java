package com.example.happy_foody.repository;

import com.example.happy_foody.model.Etape;
import com.example.happy_foody.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EtapeRepository extends JpaRepository<Etape,Long> {

    @Query(value = """
    SELECT DISTINCT e.*
    FROM etape e
    JOIN recette r ON e.id_recette = r.id_recette
    WHERE r.id_recette = :id_recette
    """, nativeQuery = true)
    List<Etape> findByRecette(@Param("id_recette") Long id_recette);
}