import GenericSearchPage from "./GenericSearchPage";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import React from "react";
import RecetteAndRestoElement from "../../components/card_list/RecetteAndRestoElement";
import img0 from "../../images/taboule.png";
import GenericCard from "../../components/card_list/GenericCard";

export default function RecetteSearchPage(){

    const [pageDescription] = React.useState({
        title : "Recettes",
        description : "Trouve ou découvre des recettes adaptées à tes envies et besoin ! \nTu peux aussi partager tes meilleures recettes !",
        logo : <AutoStoriesOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo] = React.useState({
        barMessage : "Rechercher une recette",
        isPlus : true
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

    /*à compléter pour gérer le bouton de création de recette*/
    const handleCreate = ()=> {};

    const [cards, setCards] = React.useState([
        {
            id: 0,
            title: 'Taboulé (Test Recette)',
            text: <RecetteAndRestoElement
                rate={3.5}
                description="Un très bon taboulé, très frais et aérien."
                tags_nourriture={["Végétarien"]}
            />,
            tags: [],
            thumbnail: img0,
            liked: false,
            likes: 119,
        }
    ]);

    return (
        <GenericSearchPage
            pageDescr={pageDescription}
            barInfo={barInfo}
            tags={tags}
            paginationSize={30}
            onFilterClick={handleFilter}
            onSearchClick={handleSearch}
            onTagDelete={handleTag}
            onPlusClick={handleCreate}
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