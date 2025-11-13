import RestoElement from "../../../components/card_list/RestoElement";
import React from "react";
import GenericCard from "../../../components/card_list/GenericCard";
import restoImage from "../../../images/wok_sushi.png";


function TestResto(){
    const card =
        {
            id: 1,
            title: 'Wok Sushi (Test Restaurant)',
            rate:5,

            description : "Le restaurant Wok & Sushi fusionne deux spécialités asiatiques.\n\n" +
                "WOK exprime les plats chauds du traiteur asiatique comme les Bobuns, les nouilles sautés, les gambas et bien d'autre encore...\n\n" +
                "SUSHI vous fera découvrir le restaurant japonais avec certaines saveurs telles que des sushis, des makis california, des sashimis et plus d'autre encore.",

            tags_nourriture:["Asiatique", "Wok", "Sushi"],
            tags_lieu:["Les Ulis, 91940"],
            thumbnail: restoImage,
            liked: false,
            likes: 97,
        };

    return <GenericCard
                key={card.id}
                card={{
                    ...card,
                    text: (
                        <RestoElement
                            rate={card.rate}
                            description={card.description}
                            tags_nourriture={card.tags}
                        />
                    )
                }}
                onLike={() => {}}
                onClick={() => {}}
            />;
}

export default TestResto
