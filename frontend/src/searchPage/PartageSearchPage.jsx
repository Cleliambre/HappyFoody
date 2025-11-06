import GenericSearchPage from "./GenericSearchPage";
import React from "react";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import PartageElement from "../card_list/PartageElement";
import img3 from "../images/poulet.jpg";
import GenericCard from "../card_list/GenericCard";

export default function PartageSearchPage(){
    const [pageDescription] = React.useState({
        title : "Partage",
        description : "Trop de nourriture préparée ? Donne-la ou partage-la autour d'un bon repas avec d'autres personnes !",
        logo : <VolunteerActivismOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo] = React.useState({
        barMessage : "Rechercher un partage",
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
            id: 3,
            title: 'Poulet rôti (Test Partage)',
            text: <PartageElement
                pseudo="necroDansLAme"
                confiance={3}
                description = "Vie fantomatique à partager, merci de me dm."
                tags_partage={ ["Partage",
                    <div style={{ textAlign: 'center', lineHeight: 1.0 }}>
                        <div>Publié le</div>
                        <div>16/09/2025</div>
                    </div>,
                    <div style={{ textAlign: 'center', lineHeight: 1.0 }}>
                        <div>Expire le</div>
                        <div>20/09/2025</div>
                    </div>]}
                tags_lieu={["Polytech Paris-Saclay, Orsay", "Gif-sur-Yvette", "Palaiseau", "Massy"]}
                tags_nourriture={["Chaud", "Salé", "Poulet", "Au four", "Herbe", "Viande"]}
            />,
            thumbnail: img3,
            liked: false,
            likes: 15400,
        },
        {
            id: 4,
            title: 'Poulet rôti (Test Partage)',
            text: <PartageElement
                pseudo="necroDansLAme"
                confiance={3}
                description = "Vie fantomatique à partager, merci de me dm."
                tags_partage={ ["Partage",
                    <div style={{ textAlign: 'center', lineHeight: 1.0 }}>
                        <div>Publié le</div>
                        <div>16/09/2025</div>
                    </div>,
                    <div style={{ textAlign: 'center', lineHeight: 1.0 }}>
                        <div>Expire le</div>
                        <div>20/09/2025</div>
                    </div>]}
                tags_lieu={["Polytech Paris-Saclay, Orsay", "Gif-sur-Yvette", "Palaiseau", "Massy"]}
                tags_nourriture={["Chaud", "Salé", "Poulet", "Au four", "Herbe", "Viande"]}
            />,
            thumbnail: img3,
            liked: false,
            likes: 15400,
        },
    ]);

    return (
        <GenericSearchPage
            pageDescr={pageDescription}
            barInfo={barInfo}
            paginationSize={30}
            tags={tags}
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