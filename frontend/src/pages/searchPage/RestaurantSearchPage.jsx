import GenericSearchPage from "./GenericSearchPage";
import RestaurantOutlinedIcon from '@mui/icons-material/Restaurant';
import React, {useEffect, useState} from "react";
import RecetteElement from "../../components/card_list/RecetteElement";
import defaultImage from "../../images/default_img.png";
import restoImage from "../../images/wok_sushi.png";
import GenericCard from "../../components/card_list/GenericCard";
import { searchRestaurants } from "../../services/restaurantService";
import useSearchPageTags from "./useSearchPageTags";
import {useNavigate} from "react-router-dom";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Select,
    MenuItem,
    Typography
} from "@mui/material";
import RestoElement from "../../components/card_list/RestoElement";

export default function RestaurantSearchPage(){
    //Changement du titre de l'onglet de la page
    useEffect(() => {document.title = "Restaurant - Happy Foody"}, [])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {tags, addTag, deleteTag } = useSearchPageTags([]);

    const [cards, setCards] = React.useState([]);

    // Exemple
    /*
    const [cards, setCards] = React.useState([
        {
            id: 1,
            title: 'Wok Sushi (Test Restaurant)',
            rate:0,
            text: <RecetteElement
                rate={4.0}
                description="Le restaurant Wok & Sushi fusionne deux spécialités asiatiques.
                    WOK exprime les plats chauds du traiteur asiatique comme les Bobuns,
                    les nouilles sautés, les gambas et bien d'autre encore..
                    SUSHI vous fera découvrir le restaurant japonais avec certaines saveurs telles que des sushis,
                    des makis california, des sashimis et plus d'autre encore."
                tags_lieu={["Les Ulis, 91940"]}
                tags_nourriture={["Asiatique", "Wok", "Sushi"]}
            />,
            thumbnail: restoImage,
            liked: false,
            likes: 97,
        }
    ]);*/

    const navigate = useNavigate();

    //Fonction appelée lors de l'appui sur le bouton "Rechercher" de la barre de recherche
    //Prend en paramètre une liste de mots clés
    const handleSearch = async (keyWordsInput) => {
        try {
            //Mise à jour de la gestion des erreurs
            setLoading(true);
            setError("");

            //Récupération des tags ajoutés
            const tagNames = tags.map(t => t.name);

            //Récupération des recettes répondant aux critères de recherche
            const data = await searchRestaurants(keyWordsInput, tagNames);

            const idCompte = localStorage.getItem("idCompte");

            // ✅ Si l'utilisateur est connecté, on récupère les recettes qu'il a likées
            let likedIds = [];
            if (idCompte) {
                try {
                    const likedResponse = await fetch(`http://localhost:8080/api/compte/getLikedRestaurants/${idCompte}`);
                    if (likedResponse.ok) {
                        const likedRestaurants = await likedResponse.json();
                        console.log(likedRestaurants);

                        // Ton backend renvoie une liste d'objets Recette → on extrait les IDs
                        likedIds = likedRestaurants.map(r => r.idRestaurant);
                    }
                } catch (e) {
                    console.warn("Impossible de charger les likes de l'utilisateur :", e);
                }
            }

            //Récupération, pour chaque recette, de la note moyenne et du nombre de likes
            const restaurantsAvecInfos = await Promise.all(
                data.map(async (restaurant) => {
                    try {
                        const [noteResponse, likesResponse] = await Promise.all([
                            fetch(`http://localhost:8080/api/restaurant/noteMoyenne/${restaurant.idRestaurant}`),
                            fetch(`http://localhost:8080/api/restaurant/nombreLikes/${restaurant.idRestaurant}`)
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
                            ...restaurant,
                            note_moyenne,
                            nb_likes,
                            id: restaurant.idRestaurant,
                            liked : likedIds.includes(restaurant.idRestaurant)
                        };
                    } catch (err) {
                        console.error(`Erreur lors du chargement des infos pour le restaurant ${restaurant.idRestaurant}`, err);
                        return {
                            ...restaurant,
                            note_moyenne: 0,
                            nb_likes: 0,
                            id: restaurant.idRestaurant,
                            liked: likedIds.includes(restaurant.idRestaurant),
                        };
                    }
                })
            );

            //On transforme chaque recette en une "card" pour affichage :
            const newCards = restaurantsAvecInfos.map((restaurant) => ({
                id: restaurant.idRestaurant,
                title: restaurant.nom,
                description : restaurant.description,
                rate: restaurant.note_moyenne || 0,
                tags: restaurant.tags || [],
                thumbnail: restaurant.urlImage || defaultImage,
                liked: restaurant.liked,
                likes: restaurant.nb_likes || 0,
            }));


            //Mise à jour de l’état global
            setCards(newCards);
            //setRecettes(recettesAvecInfos);

        } catch (err) {
            console.error(err);
            setError("Erreur de chargement des restaurants");
        } finally {
            setLoading(false);
        }
    };

    const [pageDescription] = React.useState({
        title : "Restaurant",
        description : "Trouve ou découvre des restaurants proches de chez toi ! ",
        logo : <RestaurantOutlinedIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo] = React.useState({
        barMessage : "Rechercher un restaurant",
        isPlus : false
    });

    const handleTag = (deletingTag)=> {
        deleteTag(deletingTag);
    }

    const handleClick = (card) => {
        navigate(`/restaurant/${card.id}`);
    };

    const handleLike = async (card) => {
        const idCompte = localStorage.getItem("idCompte");
        if (!idCompte) {
            alert("Vous devez être connecté pour liker une recette !");
            return;
        }

        const newLiked = !card.liked;

        // ✅ Mise à jour optimiste
        setCards(prevCards =>
            prevCards.map(c =>
                c.id === card.id
                    ? { ...c, liked: newLiked, likes: Math.max(0, c.likes + (newLiked ? 1 : -1)) }
                    : c
            )
        );

        try {

            const url = `http://localhost:8080/api/compte/${
                newLiked ? "saveLikedRestaurant" : "deleteLikedRestaurant"
            }?compteId=${idCompte}&restaurantId=${card.id}`;

            const method = newLiked ? "POST" : "DELETE";

            const response = await fetch(url, { method });

            if (!response.ok) throw new Error("Erreur réseau");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du like :", error);

            // ❌ Annule le changement local si erreur
            setCards(prevCards =>
                prevCards.map(c =>
                    c.id === card.id
                        ? {
                            ...c,
                            // 🔥 rollback basé sur la version locale complète (c)
                            liked: !newLiked,
                            likes: Math.max(0, c.likes + (newLiked ? -1 : 1))
                        }
                        : c
                )
            );

            alert("Impossible de mettre à jour le like. Veuillez réessayer.");
        }
    };

    // ---- États pour la boîte de dialogue de filtre ----
    const [openFilter, setOpenFilter] = useState(false);
    const [tagSelected, setTagSelected] = useState("");

    //Récupération des tags existants dans la base de données
    const [tagsPossibles, setTagsPossibles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/tag/all`)
            .then(res => res.json())
            .then(data => {setTagsPossibles(data);});

    }, [navigate]);

    /*à remplir pour gérer le bouton filtre*/
    const handleFilter = ()=> {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleConfirmFilter = () => {
        if (tagSelected) {
            addTag({ name: tagSelected, color: "success" });
        }
        setOpenFilter(false);
        setTagSelected("");
    };

    // ---- Pagination ----
    const [page, setPage] = useState(1);
    const cardsPerPage = 4;

    // Calcule les cartes à afficher pour la page actuelle
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const paginatedCards = cards.slice(startIndex, endIndex);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        handleSearch("");
    }, []);

    return (
        <GenericSearchPage
            pageDescr={pageDescription}
            tags={tags}
            barInfo={barInfo}
            paginationSize={Math.ceil(cards.length / cardsPerPage)}
            onFilterClick={handleFilter}
            onSearchClick={handleSearch}
            onTagDelete={handleTag}
            resultCount={cards.length}
            page={page}
            onPageChange={handlePageChange}
        >
            {paginatedCards.map((card) => (
                <GenericCard
                //card={card}
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
                onLike={handleLike}
                onClick={handleClick}
                />
            ))}


            {/* --- Boîte de dialogue pour les filtres --- */}
            <Dialog open={openFilter} onClose={handleCloseFilter}>
                <DialogTitle>Filtrer les recettes par tag</DialogTitle>
                <DialogContent sx={{ minWidth: 300 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Sélectionne un tag à ajouter à ta recherche :
                    </Typography>
                    <Select
                        variant="standard"
                        fullWidth
                        value={tagSelected}
                        onChange={(e) => setTagSelected(e.target.value)}
                    >
                        {tagsPossibles.map((tag) => (
                            <MenuItem key={tag.idTag} value={tag.nom}>
                                {tag.nom}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFilter} color="error">
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmFilter} variant="contained" color="success">
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        </GenericSearchPage>
    );
}