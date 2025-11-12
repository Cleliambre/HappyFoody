package com.example.happy_foody.controller;

import com.example.happy_foody.model.Ingredient;
import com.example.happy_foody.model.Tag;
import com.example.happy_foody.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/tag")
@CrossOrigin
public class TagController {
    private final TagService tagService;


    @Autowired
    public TagController(TagService tagService) {this.tagService = tagService;}

    //SELECT
    @GetMapping("/all")
    public List<Tag> getTags(){
        return tagService.getAllTags();
    }

    //SELECT
    @GetMapping("/getTagById/{id}")
    public Tag getTagById(@PathVariable(value = "id") Long id){
        return tagService.getTagById(id);
    }

    //INSERT
    @PostMapping("/createTag")
    public Tag createTag(@RequestBody Tag Tag){return tagService.createTag(Tag);}

    //UPDATE
    @PutMapping("/updateTag/{id}")
    public Tag updateTag(@PathVariable(value = "id") Long id, @RequestBody Tag Tag){
        return tagService.updateTag(id, Tag);
    }

    //DELETE
    @DeleteMapping("/deleteTag/{id}")
    public void deleteTag(@PathVariable(value = "id") Long id){
        tagService.deleteTag(id);
    }

    @GetMapping("/getTagByRecette/{id_recette}")
    public List<Tag> getIngredientByRecette(@PathVariable(value = "id_recette") Long id_recette){
        return tagService.getTagByRecette(id_recette);
    }
}
