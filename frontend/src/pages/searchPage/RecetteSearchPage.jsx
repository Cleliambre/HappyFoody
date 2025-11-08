import GenericSearchPage from "./GenericSearchPage";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import React, {useEffect, useState} from "react";
import RecetteAndRestoElement from "../../components/card_list/RecetteAndRestoElement";
import img0 from "../../images/taboule.png";
import GenericCard from "../../components/card_list/GenericCard";
import { searchRecettes } from "../../services/recetteService";
import useSearchPageTags from "./useSearchPageTags";
import {useNavigate} from "react-router-dom";

export default function RecetteSearchPage(){

    useEffect(() => {document.title = "Recettes - Happy Foody"}, [])

    const [recettes, setRecettes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { tags, addTag, deleteTag } = useSearchPageTags([]);

    const [cards, setCards] = React.useState([]);

    const navigate = useNavigate();

    const handleSearch = async (keyWordsInput) => {
        try {
            setLoading(true);
            setError("");

            //Récupération des recettes correspondant à la recherche
            const tagNames = tags.map(t => t.name);
            const data = await searchRecettes(keyWordsInput, tagNames);

            const idCompte = localStorage.getItem("idCompte");

            // ✅ Si l'utilisateur est connecté, on récupère les recettes qu'il a likées
            let likedIds = [];
            if (idCompte) {
                try {
                    const likedResponse = await fetch(`http://localhost:8080/api/compte/getLikedRecettes/${idCompte}`);
                    if (likedResponse.ok) {
                        const likedRecettes = await likedResponse.json();

                        // Ton backend renvoie une liste d'objets Recette → on extrait les IDs
                        likedIds = likedRecettes.map(r => r.idRecette);
                    }
                } catch (e) {
                    console.warn("Impossible de charger les likes de l'utilisateur :", e);
                }
            }


            //Récupération, pour chaque recette, de la note moyenne et du nombre de likes
            const recettesAvecInfos = await Promise.all(
                data.map(async (recette) => {
                    try {
                        const [noteResponse, likesResponse] = await Promise.all([
                            fetch(`http://localhost:8080/api/recette/noteMoyenne/${recette.idRecette}`),
                            fetch(`http://localhost:8080/api/recette/nombreLikes/${recette.idRecette}`)
                        ]);

                        const safeJson = async (response, defaultValue = 0) => {
                            try {
                                if (!response.ok) return defaultValue;
                                const text = await response.text();
                                return text ? JSON.parse(text) : defaultValue;
                            } catch {
                                return defaultValue;
                            }
                        };

                        const note_moyenne = await safeJson(noteResponse, 0);
                        const nb_likes = await safeJson(likesResponse, 0);

                        return {
                            ...recette,
                            note_moyenne,
                            nb_likes,
                            id: recette.idRecette,
                            liked : likedIds.includes(recette.idRecette)
                        };
                    } catch (err) {
                        console.error(`Erreur lors du chargement des infos pour la recette ${recette.idRecette}`, err);
                        return {
                            ...recette,
                            note_moyenne: 0,
                            nb_likes: 0,
                            id: recette.idRecette,
                            liked: likedIds.includes(recette.idRecette),
                        };
                    }
                })
            );


            //On transforme chaque recette en une "card" pour affichage :
            const newCards = recettesAvecInfos.map((recette) => ({
                id: recette.idRecette,
                title: recette.titre || "Recette sans nom",
                text: (
                    <RecetteAndRestoElement
                        rate={recette.note_moyenne || 0}
                        description={recette.description || "Aucune description"}
                        tags_nourriture={recette.tags || []}
                    />
                ),
                tags: recette.tags || [],
                thumbnail: recette.urlImage || img0,
                liked: recette.liked,
                likes: recette.nb_likes || 0,
            }));

            //Mise à jour de l’état global
            setCards(newCards);
            setRecettes(recettesAvecInfos);

        } catch (err) {
            console.error(err);
            setError("Erreur de chargement des recettes");
        } finally {
            setLoading(false);
        }
    };


    const [pageDescription] = React.useState({
        title : "Recettes",
        description : "Trouve ou découvre des recettes adaptées à tes envies et besoin ! \nTu peux aussi partager tes meilleures recettes !",
        logo : <AutoStoriesOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo] = React.useState({
        barMessage : "Rechercher une recette",
        isPlus : true
    });

    /*
    const [tags, setTags] = React.useState([
        {name: "Végétarien", color: "success"},
        {name:"test"}
    ]);

     */


    const handleTag = (deletingTag)=> {
        //const newTags = tags.filter((description) => description.name !== deletingTag.name);
        deleteTag(deletingTag);
    }

    const handleClick = (card) => {
        alert(`Carte sélectionnée : ${card.title}`);
    };

    const handleLike = async (card) => {
        const idCompte = localStorage.getItem("idCompte"); // récupère l’utilisateur connecté
        if (!idCompte) {
            alert("Vous devez être connecté pour liker une recette !");
            return;
        }

        // ✅ Mise à jour optimiste : on change l’état local immédiatement
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

        try{
            // ✅ Appel au backend selon l’état actuel
            const url = `http://localhost:8080/api/compte/${card.liked ? "deleteLikedRecette" : "saveLikedRecette"}?compteId=${idCompte}&recetteId=${card.id}`;
            const method = card.liked ? "DELETE" : "POST";

            const response = await fetch(url, { method });

            if (!response.ok) {
                throw new Error("Erreur réseau");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du like :", error);

            // ❌ En cas d’échec, on restaure l’état initial
            setCards((prev) =>
                prev.map((c) =>
                    c.id === card.id
                        ? {
                            ...c,
                            liked: card.liked,
                            likes: card.liked ? card.likes + 1 : card.likes - 1,
                        }
                        : c
                )
            );

            alert("Impossible de mettre à jour le like. Veuillez réessayer.");
        }
    };

    /*à remplir pour gérer le bouton filtre*/
    const handleFilter = ()=> {};


    const handleCreate = ()=> {
        const idCompte = localStorage.getItem('idCompte');
        if (idCompte) {
            // ✅ Si l'utilisateur est déjà connecté, on le redirige vers le profil
            navigate('/connexion');
        }
        navigate('/createRecette');
    };

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