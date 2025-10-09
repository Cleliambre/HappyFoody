package com.example.happy_foody.controller;

import com.example.happy_foody.model.Partage;
import com.example.happy_foody.service.PartageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/partage")
@CrossOrigin
public class PartageController {
    private final PartageService partageService;


    @Autowired
    public PartageController(PartageService partageService) {this.partageService = partageService;}

    //SELECT
    @GetMapping("/all")
    public List<Partage> getPartages(){
        return partageService.getAllPartages();
    }

    //SELECT
    @GetMapping("/getPartageById/{id}")
    public Partage getPartageById(@PathVariable(value = "id") Long id){
        return partageService.getPartageById(id);
    }

    //INSERT
    @PostMapping("/createPartage")
    public Partage createPartage(@RequestBody Partage Partage){return partageService.createPartage(Partage);}

    //UPDATE
    @PutMapping("/updatePartage/{id}")
    public Partage updatePartage(@PathVariable(value = "id") Long id, @RequestBody Partage Partage){
        return partageService.updatePartage(id, Partage);
    }

    //DELETE
    @DeleteMapping("/deletePartage/{id}")
    public void deletePartage(@PathVariable(value = "id") Long id){
        partageService.deletePartage(id);
    }
}
