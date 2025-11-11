package com.example.happy_foody.service;

import com.example.happy_foody.model.Etape;
import com.example.happy_foody.model.Ingredient;
import com.example.happy_foody.repository.EtapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EtapeService {

    @Autowired
    private EtapeRepository etapeRepository;

    public List<Etape> getAllEtapes() {
        return etapeRepository.findAll();
    }

    public Etape getEtapeById(Long id) throws ResourceNotFoundException {
        Etape etape = etapeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Etape not found"));
        return etape;
    }

    public Etape createEtape(Etape etape) {
        return etapeRepository.save(etape);
    }

    public Etape updateEtape(Long etapeId, Etape etapeDetails) throws ResourceNotFoundException {
        Etape etape = etapeRepository.findById(etapeId).orElseThrow(() -> new ResourceNotFoundException("Etape not found"));

        etape.setTxtEtape(etapeDetails.getTxtEtape());
        etape.setRecette(etapeDetails.getRecette());

        final Etape updatedEtape = etapeRepository.save(etape);
        return updatedEtape;
    }

    public void deleteEtape(Long etapeId) throws ResourceNotFoundException {
        Etape etape = etapeRepository.findById(etapeId).orElseThrow(()->new ResourceNotFoundException("Etape not found"));

        etapeRepository.delete(etape);
    }

    public List<Etape> getEtapeByRecette(Long id_recette) throws ResourceNotFoundException {
        return etapeRepository.findByRecette(id_recette);
    }

}
