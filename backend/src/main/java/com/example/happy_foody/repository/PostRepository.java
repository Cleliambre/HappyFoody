package com.example.happy_foody.repository;

import com.example.happy_foody.model.Post;
import com.example.happy_foody.model.Restaurant;
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
    WHERE 
        LOWER(p.titre) LIKE LOWER(CONCAT('%', :motCle, '%'))
        OR LOWER(p.contenu) LIKE LOWER(CONCAT('%', :motCle, '%'))
    """, nativeQuery = true)
    List<Post> findByKeyWord(@Param("motCle") String motCle);

    @Query(value = """
    SELECT DISTINCT p.* 
    FROM post p
    JOIN post_tag pt ON p.id_post = pt.id_post
    JOIN tag t ON pt.id_tag = t.id_tag
    WHERE t.nom = :nom

    """, nativeQuery = true)
    List<Post> findByTag(@Param("nom") String nom);

}
