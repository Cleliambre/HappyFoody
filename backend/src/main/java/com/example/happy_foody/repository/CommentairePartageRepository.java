package com.example.happy_foody.repository;

import com.example.happy_foody.model.CommentairePartage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentairePartageRepository extends JpaRepository<CommentairePartage,Long> {
}
