package com.example.happy_foody.service;

import com.example.happy_foody.model.Inscription;
import com.example.happy_foody.model.InscriptionId;
import com.example.happy_foody.repository.InscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InscriptionService {
    @Autowired
    private InscriptionRepository inscriptionRepository;

    public List<Inscription> getAllInscriptions() {
        return inscriptionRepository.findAll();
    }

    public Inscription getInscriptionById(InscriptionId id) throws ResourceNotFoundException {
        Inscription inscription = inscriptionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Quantité not found"));
        return inscription;
    }

    public Inscription createInscription(Inscription inscription) {
        return inscriptionRepository.save(inscription);
    }

    public Inscription updateInscription(InscriptionId inscriptionId, Inscription inscriptionDetails) throws ResourceNotFoundException {
        Inscription inscription = inscriptionRepository.findById(inscriptionId).orElseThrow(() -> new ResourceNotFoundException("Inscription not found"));

        inscription.setNbPart(inscriptionDetails.getNbPart());

        final Inscription updatedInscription = inscriptionRepository.save(inscription);
        return updatedInscription;
    }

    public void deleteInscription(InscriptionId inscriptionId) throws ResourceNotFoundException {
        Inscription inscription = inscriptionRepository.findById(inscriptionId).orElseThrow(()->new ResourceNotFoundException("Inscription not found"));

        inscriptionRepository.delete(inscription);
    }
}
