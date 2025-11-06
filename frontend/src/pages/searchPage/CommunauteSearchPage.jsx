import GenericSearchPage from "./GenericSearchPage";
import React from "react";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GenericCard from "../../components/card_list/GenericCard";
import PostElement from "../../components/card_list/PostElement";
import img2 from "../../images/taboule_crame.png";

export default function CommunauteSearchPage(){
    const [pageDescription] = React.useState({
        title : "Communauté",
        description : "Des questions ? Des astuces ? Des réussites ? Vous êtes au bon endroit !",
        logo : <PeopleAltOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo] = React.useState({
        barMessage : "Rechercher un forum",
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
            id: 2,
            title: 'Aide Taboulé cramé (Test Post)',
            text: <PostElement
                delai={8}
                unite="heure"
                description = "Bonjour, je viens de cramer du taboulé.
                    Vous pensez que je peux encore le manger ?
                    J’aime pas mangé froid du coup je l’ai un peu chauffé..."
                nbCommentaire={15000}
            />,
            thumbnail: img2,
            liked: true,
            likes: 1000000,
        },
        {
            id: 3,
            title: 'Aide Taboulé cramé (Test Post)',
            text: <PostElement
                delai={8}
                unite="heure"
                description = "Bonjour, je viens de cramer du taboulé.
                    Vous pensez que je peux encore le manger ?
                    J’aime pas mangé froid du coup je l’ai un peu chauffé..."
                nbCommentaire={15000}
            />,
            thumbnail: img2,
            liked: true,
            likes: 1000000,
        }
    ]);


    return (
        <GenericSearchPage
            pageDescr={pageDescription}
            barInfo={barInfo}
            tags={tags}
            paginationSize={30}
            onPlusClick={handleCreate}
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