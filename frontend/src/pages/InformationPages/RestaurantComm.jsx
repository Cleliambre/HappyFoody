import CardDescription from "./CardDescription";
import ButtonReturn from "../../components/ButtonReturn";
import React, {useEffect, useState} from "react";
import {Box, Container, Stack, Typography} from "@mui/material";
import {SectionComm} from "../../components/commentaires/SectionComm";
import {useNavigate, useParams} from "react-router-dom";

export default function RestaurantComm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const handleRetour = () => {navigate(`/restaurant/${id}`);}

    // =========================
    // États principaux
    // =========================
    const [compte, setCompte] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [tags, setTags] = useState([]);
    const [like, setLike] = useState({liked : false, nb : 0});
    const [commentaires, setCommentaires] = useState([]);

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
    // Chargement du restaurant
    // =========================
    useEffect(() => {
        fetch(`http://localhost:8080/api/restaurant/getRestaurantById/${id}`)
            .then(async res => {
                const text = await res.text();
                return text ? JSON.parse(text) : null;
            })
            .then(data => {
                setRestaurant(data);
            })
            .catch(err => console.error("Erreur de récupération du restaurant :", err));
    }, [id]);

    // 🧱 Titre de l'onglet
    useEffect(() => {
        if(!restaurant) return ;
        document.title = "Commentaires - "+ restaurant.nom + " - Happy Foody";
    }, [restaurant]);


    // =========================
    // Likes
    // =========================
    useEffect(() => {
        if (!restaurant) return;

        fetch(`http://localhost:8080/api/restaurant/nombreLikes/${restaurant.idRestaurant}`)
            .then(res => res.json())
            .then(data => setLike(prev => ({ liked: prev.liked, nb: data })))
            .catch(err => console.error("Erreur de récupération du nombre de likes :", err));
    }, [restaurant]);

    // =========================
    // Commentaires
    // =========================
    useEffect(() => {
        if (!restaurant) return;

        fetch(`http://localhost:8080/api/commentaireRestaurant/getCommentaireRestaurantByRestaurant/${restaurant.idRestaurant}`)
            .then(res => res.json())
            .then(data => setCommentaires(data))
            .catch(err => console.error("Erreur de récupération des commentaires :", err));

    }, [restaurant]);

    useEffect(() => {
        if (!restaurant) return;

        fetch(`http://localhost:8080/api/commentaire/getCommentaireResponsesByRestaurant/${restaurant.idRestaurant}`)
            .then(res => res.json())
            .then(data => setCommentaires(prevCommentaires => [...prevCommentaires, ...data]))
            .catch(err => console.error("Erreur de récupération des commentaires :", err));

    }, [restaurant]);

    // =========================
    // Vérification du like de l'utilisateur
    // =========================
    const fetchLikes = async () => {
        if (!compte || !restaurant) return;
        try {
            const likedResponse = await fetch(
                `http://localhost:8080/api/compte/getLikedRestaurants/${compte.idCompte}`
            );
            if (likedResponse.ok) {
                const likedRestaurants = await likedResponse.json();
                if (likedRestaurants.map(r => r.idRestaurant).includes(restaurant.idRestaurant)) {
                    setLike(prev => ({ nb : prev.nb, liked: true }));
                }
            }
        } catch (e) {
            console.warn("Impossible de charger les likes de l'utilisateur :", e);
        }
    };

    useEffect(() => {
        if (compte && restaurant) {
            fetchLikes();
        }
    }, [compte, restaurant]);

    const handleLike = async () => {
        if (!compte) {
            alert("Vous devez être connecté pour liker une restaurant !");
            return;
        }

        const newLiked = !like.liked;

        setLike({liked : !like.liked,
            nb : like.liked ? like.nb-1:like.nb+1});

        try {

            const url = `http://localhost:8080/api/compte/${
                newLiked ? "saveLikedRestaurant" : "deleteLikedRestaurant"
            }?compteId=${compte.idCompte}&restaurantId=${restaurant.idRestaurant}`;

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
    // Rendu (avec garde)
    // =========================
    if (!restaurant) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Chargement des commentaires du restaurant...
            </Typography>
        );
    }

    return (
        <Container sx={{ paddingBottom:"5px" }}>

            <Stack
                alignItems="start"
                spacing={1}
            >
                {/* Présentation carte du restaurant */}
                <CardDescription
                    image={restaurant.urlImage}
                    tags={restaurant.tags}
                    titre={restaurant.nom}
                    texteDescription={restaurant.description}
                    like={like}
                    setLike={setLike}
                />

                {/*Bouton de retour*/}
                <ButtonReturn
                    path={`/restaurant/${id}`}
                    text={"Retour aux informations du restaurant"}
                />
            </Stack>

            <SectionComm section="restaurant" commentaires={commentaires} currentProfil={compte} setComm={setCommentaires} idRestaurant={restaurant.idRestaurant}/>
            <Box sx={{ height: '30px' }} />
        </Container>
    );
}