// Construction de la page
import {
    Stack,
    Typography,
    Box,
    Grid,
    Divider
} from "@mui/material";

import React, {useEffect, useState} from "react";
import './informationPages.css'

// Création de la carte
import CardDescription from "./CardDescription";
import ButtonReturn from "../../components/ButtonReturn";
import CarteRestaurant from "../../components/restautant_component/CarteRestaurant";
import PaperNote from "../../components/restautant_component/PaperNote";
import Titre from "../../components/Titre";
import {noteGenerale} from "../../components/smiley_rating/getSmileys";
import CreationComm from "../../components/commentaires/CreationComm";

import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export default function RestaurantPage(){
    const { id } = useParams();
    const navigate = useNavigate();
    const handleRetour = () => {navigate('/restaurant');}

    // =========================
    // États principaux
    // =========================
    const [compte, setCompte] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [tags, setTags] = useState([]);
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
        document.title = restaurant.nom + " - Happy Foody";
    }, [restaurant]);

    // =========================
    // Note moyenne et likes
    // =========================
    useEffect(() => {
        if (!restaurant) return;

        fetch(`http://localhost:8080/api/restaurant/noteMoyenne/${restaurant.idRestaurant}`)
            .then(async res => {
                const text = await res.text();
                return text ? JSON.parse(text) : 0; // si vide → 0
            })
            .then(data => setNoteMoyenne(data))
            .catch(err => console.error("Erreur de récupération de la note moyenne :", err));

    }, [restaurant]);

    useEffect(() => {
        if (!restaurant) return;

        fetch(`http://localhost:8080/api/restaurant/nombreLikes/${restaurant.idRestaurant}`)
            .then(res => res.json())
            .then(data => setLike(prev => ({ liked: prev.liked, nb: data })))
            .catch(err => console.error("Erreur de récupération du nombre de likes :", err));
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


    const [notes, setNotes] = useState([
        {critere:"Rapidité", note:"-"},
        {critere:"Qualité",  note:"-"},
        {critere:"Service",  note:"-"},
        {critere:"Hygiène",  note:"-"}
    ]);


    useEffect(() => {
        if (!restaurant) return;

        const fetchNotes = async () => {
            try {
                const endpoints = [
                    { critere: "Rapidité", url: `noteRapiditeMoyenne` },
                    { critere: "Qualité", url: `noteQualiteMoyenne` },
                    { critere: "Service", url: `noteServiceMoyenne` },
                    { critere: "Hygiène", url: `noteHygieneMoyenne` }
                ];

                const results = await Promise.all(
                    endpoints.map(async ({ critere, url }) => {
                        const res = await fetch(`http://localhost:8080/api/restaurant/${url}/${restaurant.idRestaurant}`);
                        const text = await res.text();
                        const note = text ? JSON.parse(text) : 0;
                        return { critere, note };
                    })
                );

                setNotes(results);
            } catch (err) {
                console.error("Erreur de récupération des notes :", err);
            }
        };

        fetchNotes();
    }, [restaurant]);


    // =========================
    // Rendu (avec garde)
    // =========================
    if (!restaurant) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Chargement du restaurant...
            </Typography>
        );
    }

    /*const [like, setLike] = React.useState({liked: false, nb:description.nbLike});*/

    const position = [restaurant.latitude, restaurant.longitude];

    // ======== Information des restaurants =======

    const infos= [
        {champ:"📞 Téléphone : ", variable:restaurant.tel},
        {champ:"🗺️ Adresse : ", variable:restaurant.adresse},
        {champ:"🕒 Horaires : ", variable:restaurant.horaire},
        {champ:"📱 Réseaux : ", variable:restaurant.reseaux},

        {champ:"\n💰Prix : ", variable:restaurant.prix},
        {champ:"📅 Réserver : ", variable:restaurant.reserver},
        {champ:"📖 Menu : ", variable:restaurant.menu},
        {champ:"🛜 Site Web : ", variable:restaurant.site},
    ];

    const handlePublierCommentaire = async (data) => {
        let commentaire = null;
        if(data.idCommRepondu !== 0){
            const responseCommentaire = await axios.get(`http://localhost:8080/api/commentaire/getCommentaireById/${data.idCommRepondu}`);
            commentaire = responseCommentaire.data;
        }

        try {
            const newCommentaire = {
                date: new Date().toISOString(),
                auteur: compte,
                restaurant: restaurant,
                commRepondu: commentaire,
                contenu: data.contenu,
                noteHygiene: data.noteHygiene,
                noteRapidite: data.noteRapidite,
                noteService: data.noteService,
                noteQualite: data.noteQualite
            }

            const postCommentaire = await axios.post('http://localhost:8080/api/commentaireRestaurant/createCommentaireRestaurant', newCommentaire);

        }catch(error){
            console.error("Erreur lors de la création du compte :", error);
        }
    }

    return (
        <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            padding={2}
        >
            {/* Bouton retour + carte de description */}
            <Stack
                alignItems="start"
                spacing={1}
                width={"80%"}
                maxWidth = "900px"
            >

                {/* Présentation carte du restaurant */}
                <CardDescription
                    image={restaurant.urlImage}
                    tags={tags}
                    titre={restaurant.nom}
                    texteDescription={restaurant.description}
                    like={like}
                    setLike={setLike}
                    handleLike={handleLike}
                />

                {/*Bouton de retour*/}
                <ButtonReturn
                    path={"/restaurant"}
                    text={"Retour à la recherche des restaurants"}
                />
            </Stack>

            {/* Avis du restaurant */}
            <Titre text={"Avis du restaurant"}/>

            <PaperNote text={"Avis global du restaurant"} isGlobal={true}
                       note={noteGenerale(notes)}
            />

            <Grid container spacing={2}
                  sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                      width:'60%'
                  }}
            >
                {notes.map((note) => (
                    <PaperNote text={note.critere} isGlobal={false}
                               note={note.note}
                    />
                ))}
            </Grid>

            {/* Link */}
            <Grid Grid container spacing={2}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: "center",
                    width: '70%'
                }}
            >
                <a href="#avis">Donner un avis</a>
                <Link to={"/restaurant/:id/avis"}>Voir le détails des avis</Link>
            </Grid>


            {/* Autres information du restaurant */}
            <Titre text={"Autres informations du restaurant"}/>
            <Stack
                alignItems="start"
                width={"70%"}
                maxWidth="900px"
                spacing={1}
            >
                {infos.map((info) => (
                    <Typography sx={{ whiteSpace: 'pre-line' }}>
                        <Box component="span" fontWeight="bold">
                            {info.champ}
                        </Box>
                        {info.variable}
                    </Typography>
                ))}
            </Stack>

            {/* Carte */}
            <Titre text={"Carte"}/>
            <Box
                sx={{
                    width: '70%', height: '400px',
                    border: '3px solid gray', borderRadius: 5,
                    overflow: 'hidden'
                }}
            >
                <CarteRestaurant position={position}/>
            </Box>

            <Divider variant="middle" flexItem
                     sx={{borderBottomWidth: 3}}
            />

            {/* Donner un avis */}
            {compte && (
                <Stack>
                    <Titre text="Donner un avis"/>
                    <CreationComm typeCommentaire="restaurant" currentProfil={compte} onPublier={handlePublierCommentaire} />
                    <Box sx={{ height: '30px' }} />
                </Stack>
            )}
        </Stack>
     );
}