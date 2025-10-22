package com.example.happy_foody.repository;

import com.example.happy_foody.model.Partage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartageRepository extends JpaRepository<Partage,Long> {

}
