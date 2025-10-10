package com.example.happy_foody.model;

public enum Unite {
    g("g"), kg("kg"), L("L"), mL("mL"),
    grandeCuilliere("cuillère à soupe"), petiteCuillere("cuillère à café"),
    bouquet("bouquet");
    String description;

    Unite(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
