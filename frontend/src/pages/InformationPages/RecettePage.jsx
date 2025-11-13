import {
    Stack,
    Typography,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText, Box, Divider
} from "@mui/material";
import { Link } from "react-router-dom";

import taboule from "../../images/default_img.png";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import React, { useEffect, useState } from "react";
import CardDescription from "./CardDescription";
import ButtonReturn from "../../components/ButtonReturn";
import { useParams, useNavigate } from "react-router-dom";
import ColorAvatar from "../../components/ColorAvatar";
import CreationComm from "../../components/commentaires/CreationComm";
import Titre from "../../components/Titre";

export default function RecettePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // =========================
    // États principaux
    // =========================
    const [compte, setCompte] = useState(null);
    const [auteur, setAuteur] = useState(null);
    const [recette, setRecette] = useState(null);
    const [tags, setTags] = useState([]);
    const [temps, setTemps] = useState(null);
    const [portion, setPortion] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [etapes, setEtapes] = useState([]);
    const [like, setLike] = useState({liked : false, nb : 0});
    const [noteMoyenne, setNoteMoyenne] = useState(0);

    // =========================
    // Chargement du compte connecté
    // =========================
    useEffect(() => {
        const idCompte = localStorage.getItem("idCompte");
        if (idCompte) {
            fetch(`http://localhost:8080/api/compte/getCompteById/${idCompte}`)
                .then(res => res.json())
                .then(data => setCompte(data))
                .catch(err => console.error("Erreur de récupération du compte :", err));
        }
    }, []);

    // =========================
    // Chargement de la recette
    // =========================
    useEffect(() => {
        fetch(`http://localhost:8080/api/recette/getRecetteById/${id}`)
            .then(async res => {
                const text = await res.text();
                return text ? JSON.parse(text) : null;
            })
            .then(data => {
                setRecette(data);
                if (data) {
                    setTemps(data.temps);
                    setPortion(data.portion);
                }
            })
            .catch(err => console.error("Erreur de récupération de la recette :", err));
    }, [id]);


    // 🧱 Titre de l'onglet
    useEffect(() => {
        if(!recette) return ;
        document.title = recette.titre + " - Happy Foody";
    }, [recette]);

    // =========================
    // Chargement des données dépendantes de la recette
    // =========================
    const fetchIngredient = async () => {
        if (!recette) return;
        try {
            const ingredientResponse = await fetch(`http://localhost:8080/api/ingredient/getIngredientByRecette/${recette.idRecette}`);
            if (ingredientResponse.ok) {
                const ingredientList = await ingredientResponse.json();

                const ingredientsWithQuantite = await Promise.all(
                    ingredientList.map(async ingredient => {
                        const quantiteResponse = await fetch(
                            `http://localhost:8080/api/quantite/getQuantiteById/${recette.idRecette}/${ingredient.idIngredient}`
                        );
                        if (quantiteResponse.ok) {
                            const quantite = await quantiteResponse.json();
                            ingredient.quantite = quantite.portion;
                            ingredient.unite = quantite.unite;
                        }
                        return ingredient;
                    })
                );

                setIngredients(ingredientsWithQuantite);
            }
        } catch (e) {
            console.warn("Impossible de charger les ingrédients de la recette :", e);
        }
    };


    useEffect(() => {
        if (!recette) return;

        // Auteur
        setAuteur(recette.auteur);

        // Ingrédients
        fetchIngredient(recette);

        // Étapes
        fetch(`http://localhost:8080/api/etape/getEtapeByRecette/${recette.idRecette}`)
            .then(res => res.json())
            .then(data => setEtapes(data))
            .catch(err => console.error("Erreur de récupération des étapes :", err));

        // Tags
        fetch(`http://localhost:8080/api/tag/getTagByRecette/${recette.idRecette}`)
            .then(res => res.json())
            .then(data => {
                setTags(data);})
            .catch(err => console.error("Erreur de récupération des tags :", err));

    }, [recette]);

    // =========================
    // Note moyenne et likes
    // =========================
    useEffect(() => {
        if (!recette) return;

        fetch(`http://localhost:8080/api/recette/noteMoyenne/${recette.idRecette}`)
            .then(async res => {
                const text = await res.text();
                return text ? JSON.parse(text) : 0; // si vide → 0
            })
            .then(data => setNoteMoyenne(data))
            .catch(err => console.error("Erreur de récupération de la note moyenne :", err));

    }, [recette]);

    useEffect(() => {
        if (!recette) return;

        fetch(`http://localhost:8080/api/recette/nombreLikes/${recette.idRecette}`)
            .then(res => res.json())
            .then(data => setLike(prev => ({ liked: prev.liked, nb: data })))
            .catch(err => console.error("Erreur de récupération du nombre de likes :", err));
    }, [recette]);

    // =========================
    // Vérification du like de l'utilisateur
    // =========================
    const fetchLikes = async () => {
        if (!compte || !recette) return;
        try {
            const likedResponse = await fetch(
                `http://localhost:8080/api/compte/getLikedRecettes/${compte.idCompte}`
            );
            if (likedResponse.ok) {
                const likedRecettes = await likedResponse.json();
                if (likedRecettes.map(r => r.idRecette).includes(recette.idRecette)) {
                    setLike(prev => ({ nb : prev.nb, liked: true }));
                }
            }
        } catch (e) {
            console.warn("Impossible de charger les likes de l'utilisateur :", e);
        }
    };


    useEffect(() => {
        if (compte && recette) {
            fetchLikes();
        }
    }, [compte, recette]);


    const handleLike = async () => {
        if (!compte) {
            alert("Vous devez être connecté pour liker une recette !");
            return;
        }

        const newLiked = !like.liked;

        setLike({liked : !like.liked,
            nb : like.liked ? like.nb-1:like.nb+1});

        try {

            const url = `http://localhost:8080/api/compte/${
                newLiked ? "saveLikedRecette" : "deleteLikedRecette"
            }?compteId=${compte.idCompte}&recetteId=${recette.idRecette}`;

            const method = newLiked ? "POST" : "DELETE";

            const response = await fetch(url, { method });

            if (!response.ok) throw new Error("Erreur réseau");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du like :", error);

            setLike({liked : like.liked,
                nb : like.liked ? like.nb+1:like.nb-1});

            alert("Impossible de mettre à jour le like. Veuillez réessayer.");
        }
    };

    // =========================
    // Fonctions utilitaires
    // =========================
    const formatTemps = (temps) => {
        if (!temps && temps !== 0) return "";
        const heures = Math.floor(temps / 3600);
        const minutes = Math.floor((temps % 3600) / 60);
        return `${heures}h${minutes.toString().padStart(2, '0')}`;
    };

    // =========================
    // Rendu (avec garde)
    // =========================
    if (!recette) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Chargement de la recette...
            </Typography>
        );
    }

    return (
        <Stack direction="column" spacing={2} alignItems="center" padding={2}>
            {/* Bouton + carte de description */}
            <Stack alignItems="start" width={"80%"} maxWidth="900px" spacing={1}>

                {/* Description brève de la recette */}
                <CardDescription
                    image={recette.urlImage || taboule}
                    tags={tags}
                    titre={recette.titre}
                    texteDescription={recette.description}
                    like={like}
                    setLike={setLike}
                    handleLike={handleLike}
                >
                    {/* Auteur et note */}
                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton onClick={()=>{navigate(`/profil/${auteur?.pseudo}`)}}>
                                <ColorAvatar src={auteur?.urlImage || ""} name={auteur?.pseudo || ""} />
                            </IconButton>
                            <Typography variant="body2">
                                <Link component="button" color="inherit" underline="none" onClick={() => navigate(`/profil/${auteur?.pseudo}`)}>
                                    {auteur ? auteur.pseudo : "Auteur inconnu"}
                                </Link>
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={3}>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <Typography variant="body2">
                                    {noteMoyenne == null || noteMoyenne === 0 ? "-.-" : noteMoyenne.toFixed(1)}
                                </Typography>
                                <StarOutlinedIcon fontSize="small" sx={{ color: "gold" }} />
                            </Stack>
                            {/* Corriger le lien */}
                            <Link to={"/recette/commentaires"} variant="body2">
                                Voir les commentaires
                            </Link>
                        </Stack>
                    </Stack>
                </CardDescription>

                {/*Bouton de retour*/}
                <ButtonReturn
                    path={"/recette"}
                    text={"Retour à la recherche des recettes"}
                />
            </Stack>

            {/* Temps et portions */}
            <Stack direction="row" spacing={10}>
                {/*Temps*/}
                <Paper elevation={2} sx={{padding:2,
                    alignItems:'center',
                    alignContent:'center',
                    display:'flex',
                    flexDirection: 'column'}}>
                    <Typography variant="h5">
                        Temps :
                    </Typography>
                    <Typography variant="body3">
                        {formatTemps(temps)}
                    </Typography>
                </Paper>

                {/*portions*/}
                <Paper elevation={2} sx={{padding:2,
                    alignItems:'center',
                    alignContent:'center',
                    display:'flex',
                    flexDirection: 'column'}}>
                    <Typography variant="h5">
                        Portions :
                    </Typography>
                    <Typography variant="body3">
                        {portion} personnes
                    </Typography>
                </Paper>
            </Stack>

            {/* Ingrédients et étapes */}
            <Stack width={"80%"} maxWidth={"900px"} alignItems="start" spacing={1}>
                <Titre text="Ingrédients :"/>
                <List sx={{ listStyleType: 'disc', pl: 4 }}>
                    {ingredients.map((ingredient, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', py: 0 }}>
                            <ListItemText>
                                {ingredient.nom} : {ingredient.quantite} {ingredient.unite}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>

                <Titre text="Préparation :"/>
                <List sx={{ listStyleType: 'decimal', pl: 4 }}>
                    {etapes.map((etape, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', py: 0 }}>
                            <ListItemText>{etape.txtEtape}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Stack>

            <Divider variant="middle" flexItem
                     sx={{borderBottomWidth: 3, padding:'10px'}}
            />

            <Titre text="Commentaire"/>
            <CreationComm typeCommentaire="recette" /> {/*TODO : current profil*/}
            <Box sx={{ height: '30px' }} />
        </Stack>
    );
}
