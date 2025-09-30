package com.example.happy_foody.repository;

import com.example.happy_foody.model.Recette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecetteRepository extends JpaRepository<Recette,Integer> {

}
