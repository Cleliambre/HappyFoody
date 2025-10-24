package com.example.happy_foody.service;


import com.example.happy_foody.model.Post;
import com.example.happy_foody.model.Restaurant;
import com.example.happy_foody.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    public Post getPostById(Long id) throws ResourceNotFoundException {
        Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        return post;
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public  Post updatePost(Long postId, Post postDetails) throws ResourceNotFoundException {
        Post post = postRepository.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post not found"));

        post.setAuteur(postDetails.getAuteur());
        post.setTitre(postDetails.getTitre());
        post.setContenu(postDetails.getContenu());
        post.setDate(postDetails.getDate());

        final Post updatedPost = postRepository.save(post);
        return updatedPost;

    }

    public void deletePost(Long postId) throws ResourceNotFoundException {
        Post post = postRepository.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post not found"));

        postRepository.delete(post);
    }

    public List<String> parserMots(String texte) {
        if (texte == null || texte.isBlank()) {
            return new ArrayList<>();
        }
        // Supprime les espaces multiples et découpe
        String[] mots = texte.trim().split("\\s+");
        return Arrays.asList(mots);
    }

    public List<Post> getPostbyTagsAndKeyWords(String keyWords, List<String> tags){
        List<String> keyWordsList = parserMots(keyWords);

        Set<Post> postsParMot = new HashSet<>();
        Set<Post> postsParTag = new HashSet<>();

        // ---- Recherche par mots-clés ----
        if (keyWordsList != null && !keyWordsList.isEmpty()) {
            // On récupère les posts correspondant à CHAQUE mot
            List<Set<Post>> setsParMot = keyWordsList.stream()
                    .map(mot -> new HashSet<>(postRepository.findByKeyWord(mot))) // méthode existante
                    .collect(Collectors.toList());

            // Intersection : on garde seulement celles qui contiennent TOUS les mots
            if (!setsParMot.isEmpty()) {
                postsParMot = new HashSet<>(setsParMot.get(0));
                for (Set<Post> set : setsParMot) {
                    postsParMot.retainAll(set);
                }
            }
        } else {
            // Si aucun mot-clé donné → tout est valide
            postsParMot.addAll(postRepository.findAll());
        }

        // ---- Recherche par tags ----
        if (tags != null && !tags.isEmpty()) {
            // On récupère les posts correspondant à CHAQUE tag, puis on garde celles qui ont tous les tags
            List<Set<Post>> setsParTag = tags.stream()
                    .map(tag -> new HashSet<>(postRepository.findByTag(tag))) // méthode existante
                    .collect(Collectors.toList());

            if (!setsParTag.isEmpty()) {
                postsParTag = new HashSet<>(setsParTag.get(0));
                for (Set<Post> set : setsParTag) {
                    postsParTag.retainAll(set);
                }
            }
        } else {
            postsParTag.addAll(postRepository.findAll());
        }

        // ---- Intersection finale ----
        postsParMot.retainAll(postsParTag);
        return new ArrayList<>(postsParMot);

    }
}
