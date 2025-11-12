package com.example.happy_foody.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
public class CompteControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCreateCompte() throws Exception {
        String newCompte = """
        {
          "description": "Compte de test"
          "mail": "compte.test@gmail.com"
          "password": "comptetest1234"
          "pseudo": "compteTest",
          "score_confiance": 1,
          "url_image" : "https://avatar.png"
        }
    """;

        mockMvc.perform(post("/api/compte")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newCompte))
                .andExpect(status().isOk()) // ou isCreated() si 201
                .andExpect(jsonPath("$.pseudo").value("compteTest"));
    }

}
