package com.example.happy_foody.repository;

import com.example.happy_foody.model.Quantite;
import com.example.happy_foody.model.QuantiteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuantiteRepository  extends JpaRepository<Quantite, QuantiteId> {
}
