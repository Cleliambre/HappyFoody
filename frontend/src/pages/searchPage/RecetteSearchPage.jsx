import GenericSearchPage from "./GenericSearchPage";
import RecettesIcon from "@mui/icons-material/MenuBookOutlined";
import React, {useEffect, useState} from "react";
import RecetteAndRestoElement from "../../components/card_list/RecetteAndRestoElement";
import img0 from "../../images/default_img.png";
import GenericCard from "../../components/card_list/GenericCard";
import { searchRecettes } from "../../services/recetteService";
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


//Fonction associée à la page de recherche d'une ou plusieurs recettes
export default function RecetteSearchPage(){
    //Changement du titre de l'onglet de la page
    useEffect(() => {document.title = "Recettes - Happy Foody"}, [])

    //Déclaration des variables de gestion des erreurs
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //Déclaration de la variable gérant les tags de recherche
    const { tags, addTag, deleteTag } = useSearchPageTags([]);

    //Déclaration de la liste des cartes qui sera affiché sur la page
    const [cards, setCards] = React.useState([]);

    //Outil permettant de naviguer entre les pages web
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
            const data = await searchRecettes(keyWordsInput, tagNames);

            const idCompte = localStorage.getItem("idCompte");

            // ✅ Si l'utilisateur est connecté, on récupère les recettes qu'il a likées
            let likedIds = [];
            if (idCompte) {
                try {
                    const likedResponse = await fetch(`http://localhost:8080/api/compte/getLikedRecettes/${idCompte}`);
                    if (likedResponse.ok) {
                        const likedRecettes = await likedResponse.json();
                        console.log(likedRecettes);

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
                description: recette.description || "Aucune description",
                rate: recette.note_moyenne || 0,
                tags: recette.tags || [],
                thumbnail: recette.urlImage || img0,
                liked: recette.liked,
                likes: recette.nb_likes || 0,
            }));




            //Mise à jour de l’état global
            setCards(newCards);
            //setRecettes(recettesAvecInfos);

        } catch (err) {
            console.error(err);
            setError("Erreur de chargement des recettes");
        } finally {
            setLoading(false);
        }
    };


    const [pageDescription] = React.useState({
        title : "Recette",
        description : "Trouve ou découvre des recettes adaptées à tes envies et besoin ! \nTu peux aussi partager tes meilleures recettes !",
        logo : <RecettesIcon sx={{ fontSize: "150px" }} />
    });

    const [barInfo] = React.useState({
        barMessage : "Rechercher une recette",
        isPlus : true
    });





    const handleTag = (deletingTag)=> {
        deleteTag(deletingTag);
    }

    const handleClick = (card) => {
        navigate(`/recette/${card.id}`);
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
                newLiked ? "saveLikedRecette" : "deleteLikedRecette"
            }?compteId=${idCompte}&recetteId=${card.id}`;

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


    const handleCreate = ()=> {
        const idCompte = localStorage.getItem('idCompte');
        if (idCompte) {
            // ✅ Si l'utilisateur est déjà connecté, on le redirige vers le profil
            navigate('/connexion');
        }
        navigate('/createRecette');
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
                barInfo={barInfo}
                tags={tags}
                paginationSize={Math.ceil(cards.length / cardsPerPage)}
                onFilterClick={handleFilter}
                onSearchClick={handleSearch}
                onTagDelete={handleTag}
                onPlusClick={handleCreate}
                resultCount={cards.length}
                page={page}
                onPageChange={handlePageChange}
            >
                {paginatedCards.map((card) => (
                    <GenericCard
                        key={card.id}
                        card={{
                            ...card,
                            text: (
                                <RecetteAndRestoElement
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