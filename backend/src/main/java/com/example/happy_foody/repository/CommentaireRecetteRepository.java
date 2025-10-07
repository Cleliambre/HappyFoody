package com.example.happy_foody.repository;

import com.example.happy_foody.model.CommentaireRecette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentaireRecetteRepository extends JpaRepository<CommentaireRecette,Long> {

}
