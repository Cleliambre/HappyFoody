package com.example.happy_foody.service;

import com.example.happy_foody.model.Quantite;
import com.example.happy_foody.model.QuantiteId;
import com.example.happy_foody.repository.QuantiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuantiteService {
    @Autowired
    private QuantiteRepository quantiteRepository;

    public List<Quantite> getAllQuantites() {
        return quantiteRepository.findAll();
    }

    public Quantite getQuantiteById(QuantiteId id) throws ResourceNotFoundException {
        Quantite quantite = quantiteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Quantité not found"));
        return quantite;
    }

    public Quantite createQuantite(Quantite quantite) {
        return quantiteRepository.save(quantite);
    }

    public Quantite updateQuantite(QuantiteId quantiteId, Quantite quantiteDetails) throws ResourceNotFoundException {
        Quantite quantite = quantiteRepository.findById(quantiteId).orElseThrow(() -> new ResourceNotFoundException("Quantité not found"));

        quantite.setPortion(quantiteDetails.getPortion());
        quantite.setUnite(quantiteDetails.getUnite());

        final Quantite updatedQuantite = quantiteRepository.save(quantite);
        return updatedQuantite;
    }

    public void deleteQuantite(QuantiteId quantiteId) throws ResourceNotFoundException {
        Quantite quantite = quantiteRepository.findById(quantiteId).orElseThrow(()->new ResourceNotFoundException("Quantité not found"));

        quantiteRepository.delete(quantite);
    }
}
