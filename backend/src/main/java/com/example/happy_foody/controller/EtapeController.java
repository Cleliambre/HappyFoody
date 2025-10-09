package com.example.happy_foody.controller;

import com.example.happy_foody.model.Etape;
import com.example.happy_foody.service.EtapeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/etape")
@CrossOrigin
public class EtapeController {
    private final EtapeService etapeService;


    @Autowired
    public EtapeController(EtapeService etapeService) {this.etapeService = etapeService;}

    //SELECT
    @GetMapping("/all")
    public List<Etape> getEtapes(){
        return etapeService.getAllEtapes();
    }

    //SELECT
    @GetMapping("/getEtapeById/{id}")
    public Etape getEtapeById(@PathVariable(value = "id") Long id){
        return etapeService.getEtapeById(id);
    }

    //INSERT
    @PostMapping("/createEtape")
    public Etape createEtape(@RequestBody Etape Etape){return etapeService.createEtape(Etape);}

    //UPDATE
    @PutMapping("/updateEtape/{id}")
    public Etape updateEtape(@PathVariable(value = "id") Long id, @RequestBody Etape Etape){
        return etapeService.updateEtape(id, Etape);
    }

    //DELETE
    @DeleteMapping("/deleteEtape/{id}")
    public void deleteEtape(@PathVariable(value = "id") Long id){
        etapeService.deleteEtape(id);
    }
}
