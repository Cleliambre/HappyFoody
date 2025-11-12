package com.example.happy_foody;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HappyFoodyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HappyFoodyApplication.class, args);
	}

    @PostConstruct
    public void convertDatabaseUrl() {
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl != null && databaseUrl.startsWith("postgres://")) {
            String jdbcUrl = "jdbc:postgresql://" + databaseUrl.substring("postgres://".length());
            System.setProperty("spring.datasource.url", jdbcUrl);
        }
    }

}
