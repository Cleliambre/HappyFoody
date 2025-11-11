package com.example.happy_foody.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Unite {
    g("g"), kg("kg"), L("L"), mL("mL"),
    grandeCuilliere("cuillère à soupe"), petiteCuillere("cuillère à café"),
    bouquet("bouquet");
    String description;

    Unite(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

    @JsonCreator
    public static Unite fromDescription(String value) {
        for (Unite unite : Unite.values()) {
            if (unite.description.equalsIgnoreCase(value)) {
                return unite;
            }
        }
        throw new IllegalArgumentException("Unité inconnue : " + value);
    }
}
