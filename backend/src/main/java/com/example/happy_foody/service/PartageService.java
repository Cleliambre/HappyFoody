package com.example.happy_foody.service;

import com.example.happy_foody.model.Partage;
import com.example.happy_foody.repository.PartageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartageService {

    @Autowired
    private PartageRepository partageRepository;

    public List<Partage> getAllPartages() {
        return partageRepository.findAll();
    }

    public Partage getPartageById(Long id) throws ResourceNotFoundException {
        Partage partage = partageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Partage not found"));
        return partage;
    }

    public Partage createPartage(Partage partage) {
        return partageRepository.save(partage);
    }

    public Partage updatePartage(Long partageId, Partage partageDetails) throws ResourceNotFoundException {
        Partage partage = partageRepository.findById(partageId).orElseThrow(() -> new ResourceNotFoundException("Partage not found"));

        partage.setAuteur(partageDetails.getAuteur());
        partage.setDescription(partageDetails.getDescription());
        partage.setTitre(partageDetails.getTitre());
        partage.setTypePartage(partageDetails.getTypePartage());
        partage.setDateExpiration(partageDetails.getDateExpiration());
        partage.setDatePublication(partageDetails.getDatePublication());
        partage.setNbPart(partageDetails.getNbPart());

        final Partage updatedPartage = partageRepository.save(partage);
        return updatedPartage;
    }

    public void deletePartage(Long partageId) throws ResourceNotFoundException {
        Partage partage = partageRepository.findById(partageId).orElseThrow(()->new ResourceNotFoundException("Partage not found"));

        partageRepository.delete(partage);
    }
}
