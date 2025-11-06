import GenericSearchPage from "./GenericSearchPage";
import React from "react";
import RestaurantOutlinedIcon from '@mui/icons-material/Restaurant';
import RecetteAndRestoElement from "../../components/card_list/RecetteAndRestoElement";
import img1 from "../../images/enfer.jpg";
import GenericCard from "../../components/card_list/GenericCard";


export default function RestaurantSearchPage(){
    const [pageDescription] = React.useState({
        title : "Restaurants",
        description : "Trouve ou découvre des restaurants proches de chez toi ! ",
        logo : <RestaurantOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo] = React.useState({
        barMessage : "Rechercher un restaurant",
        isPlus : false
    });

    const [tags, setTags] = React.useState([
        {name: "Végétarien", color: "success"},
        {name:"test"}
    ]);

    const handleTag = (deletingTag)=> {
        const newTags = tags.filter((description) => description.name !== deletingTag.name);
        setTags(newTags);
    }

    const handleClick = (card) => {
        alert(`Carte sélectionnée : ${card.title}`);
    };

    const handleLike = (card) => {
        setCards((prev) =>
            prev.map((c) =>
                c.id === card.id
                    ? {
                        ...c,
                        liked: !c.liked,
                        likes: c.liked ? c.likes - 1 : c.likes + 1,
                    }
                    : c
            )
        );
    };

    /*à remplir pour gérer le bouton filtre*/
    const handleFilter = ()=> {};

    /*à remplir pour gérer le bouton de recherche*/
    const handleSearch = ()=> {}

    const [cards, setCards] = React.useState([
        {
            id: 1,
            title: 'Wok Sushi (Test Restaurant)',
            text: <RecetteAndRestoElement
                rate={4.0}
                description="Le restaurant Wok & Sushi fusionne deux spécialités asiatiques.
                    WOK exprime les plats chauds du traiteur asiatique comme les Bobuns,
                    les nouilles sautés, les gambas et bien d'autre encore..
                    SUSHI vous fera découvrir le restaurant japonais avec certaines saveurs telles que des sushis,
                    des makis california, des sashimis et plus d'autre encore."
                tags_lieu={["Les Ulis, 91940"]}
                tags_nourriture={["Asiatique", "Wok", "Sushi"]}

            />,
            tags: [],
            thumbnail: img1,
            liked: false,
            likes: 97,
        }
    ]);

    return (
        <GenericSearchPage
            pageDescr={pageDescription}
            tags={tags}
            barInfo={barInfo}
            paginationSize={30}
            onFilterClick={handleFilter}
            onSearchClick={handleSearch}
            onTagDelete={handleTag}
        >
            {cards.map((card) => (
                <GenericCard
                card={card}
                onLike={handleLike}
                onClick={handleClick}
                />
            ))}
        </GenericSearchPage>
    );
}