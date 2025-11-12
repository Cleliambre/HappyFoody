package com.example.happy_foody.repository;

import com.example.happy_foody.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value = """
    SELECT DISTINCT p.*
    FROM post p
    WHERE\s
        LOWER(p.titre) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(p.contenu) LIKE LOWER(CONCAT('%', :motCle, '%'))
   \s""", nativeQuery = true)
    List<Post> findByKeyWord(@Param("motCle") String motCle);

    @Query(value = """
    SELECT DISTINCT p.*
    FROM post p
    LEFT JOIN post_tag pt ON p.id_post = pt.id_post
    LEFT JOIN tag t ON pt.id_tag = t.id_tag
    WHERE t.nom = :nom

    """, nativeQuery = true)
    List<Post> findByTag(@Param("nom") String nom);

    @Query(value = """
    SELECT DISTINCT p.*
    FROM post p
    JOIN compte c ON p.id_auteur = c.id_compte
    WHERE p.id_auteur = :id_auteur
    """, nativeQuery = true)
    List<Post> findByAuthor(@Param("id_auteur") Long id_auteur);

}
