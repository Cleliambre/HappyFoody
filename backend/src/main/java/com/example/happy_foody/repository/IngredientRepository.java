package com.example.happy_foody.repository;

import com.example.happy_foody.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient,Long> {

    @Query(value = """
    SELECT DISTINCT i.*
    FROM ingredient i
    JOIN quantite q ON q.id_ingredient = i.id_ingredient
    JOIN recette r ON q.id_recette = r.id_recette
    WHERE r.id_recette = :id_recette
    """, nativeQuery = true)
    List<Ingredient> findByRecette(@Param("id_recette") Long id_recette);

}
