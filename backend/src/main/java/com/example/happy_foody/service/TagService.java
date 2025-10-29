package com.example.happy_foody.service;

import com.example.happy_foody.model.Tag;
import com.example.happy_foody.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Tag getTagById(Long id) throws ResourceNotFoundException {
        Tag tag = tagRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tag not found"));
        return tag;
    }

    public Tag createTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public Tag updateTag(Long tagId, Tag tagDetails) throws ResourceNotFoundException {
        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new ResourceNotFoundException("Tag not found"));

        tag.setTypeTag(tagDetails.getTypeTag());
        tag.setNom(tagDetails.getNom());

        final Tag updatedTag = tagRepository.save(tag);
        return updatedTag;
    }

    public void deleteTag(Long tagId) throws ResourceNotFoundException {
        Tag tag = tagRepository.findById(tagId).orElseThrow(()->new ResourceNotFoundException("Tag not found"));

        tagRepository.delete(tag);
    }
}
