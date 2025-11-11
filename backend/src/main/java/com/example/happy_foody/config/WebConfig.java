package com.example.happy_foody.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Permet à /uploads/** d'accéder au dossier "uploads" du projet
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}

