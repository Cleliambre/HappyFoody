package com.example.happy_foody.repository;

import com.example.happy_foody.model.Inscription;
import com.example.happy_foody.model.InscriptionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, InscriptionId> {
}
