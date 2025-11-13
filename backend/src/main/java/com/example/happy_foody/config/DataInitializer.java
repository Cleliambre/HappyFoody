package com.example.happy_foody.config;

import com.example.happy_foody.model.Restaurant;
import com.example.happy_foody.model.Tag;
import com.example.happy_foody.model.TypeTag;
import com.example.happy_foody.repository.RestaurantRepository;
import com.example.happy_foody.repository.TagRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Configuration
public class DataInitializer {
    @Bean
    public CommandLineRunner loadData(RestaurantRepository restaurantRepository, TagRepository tagRepository) {
        return args -> {

            // 1️⃣ Créer ou récupérer les tags
            Map<String, Tag> tagsMap = new HashMap<>();
            String[] tagNames = {"Française", "Thaï", "Italienne", "Américaine", "Japonaise", "Restauration rapide", "Universitaire"};
            for (String tagName : tagNames) {
                Tag tag = tagRepository.findByNom(tagName).orElseGet(() -> {
                    Tag t = new Tag(TypeTag.NOURRITURE, tagName);
                    return tagRepository.save(t);
                });
                tagsMap.put(tagName, tag);
            }

            // Vérifie si la table est vide pour éviter les doublons
            if (restaurantRepository.count() == 0) {
                Restaurant r1 = new Restaurant(
                        "Le Gramophone",
                        "Cuisine inventive dans ce bar-restaurant chic et vintage à l'ambiance jazzy, orné d'un vrai gramophone",
                        "+33 1 69 28 42 15",
                        "27 Bd Dubreuil, 91400 Orsay",
                        "lundi-vendredi : 12h00-14h00 et 17h30-22h00; samedi : 18h00-22h00",
                        "https://www.instagram.com/legramophone_orsay \n"+"https://www.facebook.com/legramophoneorsay",
                        "€€",
                        "",
                        "Change chaque semaine",
                        "https://le-gramophone-restaurant-orsay.eatbu.com/?lang=fr"
                );
                r1.setUrlImage("https://lh3.googleusercontent.com/gps-cs-s/AG0ilSx9ZqThiaiAYNoygCiZZLmVYsrygNLAfsHfxoou2D7oFfHaAIHD_SmXnA7KLn9HuSR5mq0hsWA_gbmEGXeM-YaEqnihdWNBGSMOH17bC9kaHcUb1LZuBsgStLwcdRIilTCSncsnXQEnkAo=w479-h240-k-no");
                r1.setLatitude(48.69810340968567);
                r1.setLongitude(2.18447063783343);
                r1.setTags(Set.of(tagsMap.get("Française")));

                Restaurant r2 = new Restaurant(
                        "Papaye Verte",
                        "Restaurant de spécialités thaïlandaises au cadre intimiste et à l'ambiance tamisée avec bougies.",
                        "01 69 29 93 02",
                        "4 bis rue Archange, 91400 Orsay",
                        "mardi-samedi : 12h00 - 14h30 et 19h - 22h00",
                        "https://www.facebook.com/papayeverteorsay",
                        "€€",
                        "https://www.papayeverte.net/copie-de-accueil",
                        "https://www.papayeverte.net/copie-de-entrees",
                        "https://www.papayeverte.net"
                );
                r2.setUrlImage("https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxHpD6f62YeIv3qSDTxVXgd9kyfuHX2OA8tRBMo2Rxmm8dJyBl8Zh201XZSkdyJc9MDWuF8r58cU8lTmjYEZ37gmKLriEMuIQs7wvA1pYNyhbcrZXzvyyBesBpyA65XQZsDtvlHSg=w426-h240-k-no");
                r2.setLatitude(48.69844331174174);
                r2.setLongitude(2.18685243947385);
                r2.setTags(Set.of(tagsMap.get("Thaï")));

                Restaurant r3 = new Restaurant(
                        "Brass & Co",
                        "Restaurant convivial.",
                        "01 22 33 44 55",
                        "24 - 26 Mail Pierre Potier, 91190 Gif-sur-Yvette",
                        "lundi-vendredi : 11h30-23h30",
                        null,
                        "€€",
                        null,
                        "https://www.brassandco.fr/la-carte-w1",
                        "https://www.brassandco.fr"
                );
                r3.setUrlImage("https://lh3.googleusercontent.com/p/AF1QipOl1ZZYsUik2zmolnx6OUtaU0iQ07Gv7b9c-Ish=w408-h544-k-no");
                r3.setLatitude(48.71128125207768);
                r3.setLongitude(2.164394397032294);
                r3.setTags(Set.of(tagsMap.get("Française")));

                Restaurant r4 = new Restaurant(
                        "McDonald's",
                        "Restaurant de la chaîne américaine très connue spécialisée dans les hamburgers.",
                        "01 64 50 46 58",
                        "27 Mail Pierre Potier, 91190 Gif-sur-Yvette",
                        "lundi-dimanche : 11h00–22h00",
                        null,
                        "€",
                        null,
                        "https://www.mcdonalds.fr/nos-produits/menus",
                        "https://www.mcdonalds.fr"
                );
                r4.setUrlImage("https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyHNQqWSyP4w1K9T8OpMD6TvQmQlQ8QzszB0T7PJOAtytl3978pLJGmPLI6FpkF-meEi8uI9QsOmjbaVlHKK7dwKSMBZU-hMn4TzTRIy-Am1aBMhU44WcIXQUk09sLQfRAo3tZdAA=w408-h408-k-no");
                r4.setLatitude(48.71087772109302);
                r4.setLongitude(2.163235682763669);
                r4.setTags(Set.of(tagsMap.get("Américaine"), tagsMap.get("Restauration rapide")));

                Restaurant r5 = new Restaurant(
                        "Restaurant CROUS Eiffel",
                        "Restaurant Universitaire peu cher, parfait pour les étudiants.",
                        null,
                        "8 Rue Joliot Curie, 91190 Gif-sur-Yvette",
                        "lundi-dimanche : 11h30–14:00 et 18:30–21h00",
                        null,
                        "€",
                        null,
                        "https://www.crous-versailles.fr/restaurant/ru-centralesupelec-eiffel-2/",
                        "https://www.crous-versailles.fr/restaurant/ru-centralesupelec-eiffel-2/"
                );
                r5.setUrlImage("https://lh3.googleusercontent.com/gps-cs-s/AG0ilSya6_-hzJEH9hXL0u8GLxTUL_06s0enPEnRRQv_gZubYzq5x6AL7hX9AM_Vq-yO6wkKVR9djHRms66MZy4mbQEGhW_T8aDtYHYncKfe2avmIB-V7fyghsxZ_gFEUP9WxzqMdNMj=w408-h271-k-no");
                r5.setLatitude(48.71052740329792);
                r5.setLongitude(2.1673793675868906);
                r5.setTags(Set.of(tagsMap.get("Universitaire")));

                Restaurant r6 = new Restaurant(
                        "Pizza CASA STREAT Gif-sur-Yvette",
                        "Pizzeria abordable.",
                        "06 31 31 56 37",
                        "Residence CESAL, 1 Rue Joliot Curie, 91190 Gif-sur-Yvette",
                        "lundi-vendredi et dimanche : 18h30–22h00",
                        "https://www.facebook.com/p/Casa-Streat-100045479931222/?locale=fr_FR \n"+"https://www.instagram.com/casa_streat",
                        "€",
                        null,
                        null,
                        null
                );
                r6.setUrlImage("https://lh3.googleusercontent.com/p/AF1QipPK5QqjESas988q8g3xtO89jVlTAFYklekRj76K=w408-h331-k-no");
                r6.setLatitude(48.70973680818658);
                r6.setLongitude(2.16219365399737);
                r6.setTags(Set.of(tagsMap.get("Italienne")));

                Restaurant r7 = new Restaurant(
                        "Bud's Deli",
                        "Sert une cuisine simple et gourmande, alliant recettes maison et produits frais, sur place ou à emporter.",
                        "07 82 90 83 78",
                        "9 Rue de Paris 91400 ORSAY",
                        "mardi-samedi : 11h45–14h00 et 19h00–22h00",
                        "https://www.facebook.com/BudsDeli \n"+"https://www.instagram.com/budsdeli",
                        "€",
                        null,
                        "https://www.budsdeli.fr/menu",
                        "http://budsdeli.fr/"
                );
                r7.setUrlImage("https://static.apidae-tourisme.com/filestore/objets-touristiques/images/111/45/25505135-diaporama.jpg");
                r7.setLatitude(48.69683868644372);
                r7.setLongitude(2.185403938054992);
                r7.setTags(Set.of(tagsMap.get("Française")));

                Restaurant r8 = new Restaurant(
                        "Los tacos",
                        "Restaurant de restauration rapide proposant tacos, sandwiches et burgers, à consommer sur place ou à emporter.",
                        "06 66 36 08 22",
                        "18 Rue de Paris, 91400 Orsay",
                        "lundi-samedi : 11h00-23h00; dimanche : 14:00 – 22:30",
                        null,
                        "€",
                        null,
                        null,
                        "https://lostacos.eatbu.com/?lang=fr"
                );
                r8.setUrlImage("https://lh3.googleusercontent.com/p/AF1QipO6zvM_qunPaVRb-W5rWI1j1ALD-i8jn70IxyOE=w426-h240-k-no");
                r8.setLatitude(48.69726396348837);
                r8.setLongitude(2.1874325885203754);
                r8.setTags(Set.of(tagsMap.get("Restauration rapide")));

                Restaurant r9 = new Restaurant(
                        "Osaka",
                        "Restaurant japonais proposant sushis, sashimis, tempuras et plats à emporter dans une atmosphère soignée.",
                        "01 64 46 18 02",
                        "2 Pl. de la République, 91400 Orsay",
                        "lundi-samedi : 11h00 - 14h00 et 18h00 - 22h00; dimanche : 18h00 – 22h00",
                        null,
                        "€€",
                        "https://www.osaka-orsay.fr/reservation.php",
                        "http://www.osaka-orsay.fr/",
                        "http://www.osaka-orsay.fr/"
                );
                r9.setUrlImage("https://lh3.googleusercontent.com/p/AF1QipM-JbSDRGv2GxpHgp8uw06Rx0oFj3CHLv0FDaX4=w408-h544-k-no");
                r9.setLatitude(48.69692711067227);
                r9.setLongitude(2.18470220361299);
                r9.setTags(Set.of(tagsMap.get("Japonaise")));

                Restaurant r10 = new Restaurant(
                        "Trattoria Belinda",
                        "Trattoria‑pizzeria accueillante proposant une cuisine italienne traditionnelle, pizzas au four à bois, sur place ou à emporter.",
                        "01 69 28 33 85",
                        "46 Rue de Paris, 91400 Orsay",
                        "mardi-jeudi : 12h00 - 13h45 et 18h00 - 21h30; vendredi-samedi : 12h00 - 13h45 et 18h00 - 21h45",
                        null,
                        "€€",
                        "01 69 28 33 85",
                        "http://www.trattoriabelinda.fr/la-carte/nos-plats/",
                        "http://www.trattoriabelinda.fr/"
                );
                r10.setUrlImage("https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxfsRyHUR_aQtqYZi9nKbO7s2w8cIRJLQ_IDKgYT1ZO1ax0MB7t8zUMUg9PbvFEjv3qtgA3n0ASjgJKJeYfY5Tcmw7hLQ43T3qPO8eE_F-BksCQPnlacq52_yE-LLbqGRvwO-iD=w408-h544-k-no");
                r10.setLatitude(48.69669468521522);
                r10.setLongitude(2.1894807442562594);
                r10.setTags(Set.of(tagsMap.get("Italienne")));

                restaurantRepository.saveAll(List.of(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10));

                System.out.println("✅ Données de restaurants par défaut ajoutées !");
            } else {
                System.out.println("ℹ️ Des restaurants existent déjà, aucun ajout effectué.");
            }
        };
    }
}
