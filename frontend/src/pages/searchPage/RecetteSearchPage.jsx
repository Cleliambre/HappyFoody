import GenericSearchPage from "./GenericSearchPage";
import RecettesIcon from "@mui/icons-material/MenuBookOutlined";
import React, {useEffect} from "react";
import RecetteAndRestoElement from "../../components/card_list/RecetteAndRestoElement";
import img0 from "../../images/taboule.png";
import GenericCard from "../../components/card_list/GenericCard";
import {useNavigate} from "react-router-dom";

export default function RecetteSearchPage(){
    useEffect(() => {document.title = "Recherche Recette - Happy Foody"}, [])

    const [pageDescription] = React.useState({
        title : "Recette",
        description : "Trouve ou découvre des recettes adaptées à tes envies et besoin ! \nTu peux aussi partager tes meilleures recettes !",
        logo : <RecettesIcon sx={{ fontSize: "150px" }} />
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

    const navigate = useNavigate();
    const handleClick = (card) => {
        navigate(`/recette/${card.id}`);
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