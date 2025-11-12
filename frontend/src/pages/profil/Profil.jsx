import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import './Profil.css'
import ColorAvatar from "../../components/ColorAvatar";
import {Typography, Button, Avatar, Tab, Stack, Container} from '@mui/material';
import  {TabContext, TabList, TabPanel} from '@mui/lab'
import CardListV2 from "../../components/card_list/CardListV2";
import img0 from "../../images/taboule.png";
import {searchRecettes} from "../../services/recetteService";
import GenericCard from "../../components/card_list/GenericCard";
import RecetteAndRestoElement from "../../components/card_list/RecetteAndRestoElement";

export default function Profil() {
    useEffect(() => {document.title = "Profil - Happy Foody"}, [])

    const {pseudo} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = React.useState('1');
    const [compte, setCompte] = useState(null);
    const [compteConnecte, setCompteConnecte] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [recettes, setRecettes] = useState([]);
    const [cards, setCards] = useState([]);


    // 🔹 Récupération du compte connecté s’il y en a un
    useEffect(() => {
        const idCompte = localStorage.getItem('idCompte');

        if (!idCompte) {
            // Si on est sur /profil (pas de pseudo) et pas connecté → redirige vers /connexion
            setCompteConnecte(null);
            return;
        }

        // Récupère le compte connecté
        fetch(`http://localhost:8080/api/compte/getCompteById/${idCompte}`)
            .then(async res => {
                const text = await res.text();
                return text ? JSON.parse(text) : null;
            })
            .then(data => {
                setCompteConnecte(data);
            })
            .catch(err => console.error("Erreur de récupération du compte connecté :", err));
    }, []);


    useEffect(() => {
        if (!compte) return;

        fetch(`http://localhost:8080/api/recette/getRecetteByAuthor/${compte.idCompte}`)
            .then(res => res.json())
            .then(data => setRecettes(data));
    }, [compte]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // ✅ Ton code asynchrone ici
                let likedIds = [];
                if (compte?.idCompte) {
                    try {
                        const likedResponse = await fetch(`http://localhost:8080/api/compte/getLikedRecettes/${compte.idCompte}`);
                        if (likedResponse.ok) {
                            const likedRecettes = await likedResponse.json();
                            likedIds = likedRecettes.map(r => r.idRecette);
                        }
                    } catch (e) {
                        console.warn("Impossible de charger les likes de l'utilisateur :", e);
                    }
                }

                const recettesAvecInfos = await Promise.all(
                    recettes.map(async (recette) => {
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
                            liked: likedIds.includes(recette.idRecette)
                        };
                    })
                );

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

                setCards(newCards);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [compte, recettes]);


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


    // 🔹 Gestion des redirections et récupération du profil
    /*useEffect(() => {
        const handleProfil = async () => {
            // Si on est sur /profil sans pseudo
            if (!pseudo) {
                const idCompte = localStorage.getItem('idCompte');
                if (!idCompte) {
                    // Pas connecté → redirige une seule fois
                    if (location.pathname !== '/connexion') {
                        navigate('/connexion', { replace: true });
                    }
                    return;
                }

                // Si connecté mais sans pseudo → attend d’avoir les infos du compte
                if (compteConnecte?.pseudo) {
                    const target = `/profil/${compteConnecte.pseudo}`;
                    if (location.pathname !== target) {
                        navigate(target, { replace: true });
                    }
                }
                return;
            }

            // Sinon on est sur /profil/pseudo → on va chercher le profil correspondant
            try {
                const res = await fetch(`http://localhost:8080/api/compte/getCompteByPseudo/${pseudo}`);
                if (!res.ok) {
                    setCompte(null);
                    setIsLoading(false);
                    return;
                }

                const text = await res.text();
                const data = text ? JSON.parse(text) : null;
                setCompte(data);
            } catch (err) {
                console.error("Erreur de récupération du profil :", err);
                setCompte(null);
            } finally {
                setIsLoading(false);
            }
        };

        handleProfil();
        // ✅ dépend seulement de pseudo et compteConnecte.pseudo
    }, [pseudo, compteConnecte?.pseudo, navigate, location.pathname]);*/

    useEffect(() => {
        const handleProfil = async () => {
            // 🔹 Cas 1 : /profil sans pseudo
            if (!pseudo) {
                const idCompte = localStorage.getItem('idCompte');
                if (!idCompte) {
                    if (location.pathname !== '/connexion') {
                        navigate('/connexion', { replace: true });
                    }
                    return;
                }

                // ✅ Si connecté et compteConnecte dispo → redirige
                if (compteConnecte?.pseudo) {
                    const target = `/profil/${compteConnecte.pseudo}`;
                    if (location.pathname !== target) {
                        navigate(target, { replace: true });
                    }
                    return;
                }

                // 🕓 Si on n’a pas encore compteConnecte, on attend (ne fait rien)
                return;
            }

            // 🔹 Cas 2 : /profil/:pseudo → récupère le profil
            try {
                const res = await fetch(`http://localhost:8080/api/compte/getCompteByPseudo/${pseudo}`);
                if (!res.ok) {
                    setCompte(null);
                    setIsLoading(false);
                    return;
                }

                const text = await res.text();
                const data = text ? JSON.parse(text) : null;
                setCompte(data);
            } catch (err) {
                console.error("Erreur de récupération du profil :", err);
                setCompte(null);
            } finally {
                setIsLoading(false);
            }
        };

        handleProfil();
    }, [pseudo, compteConnecte, navigate, location.pathname]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('idCompte');
        window.location.href = '/connexion';
    };

    if (isLoading) return <div>Chargement...</div>;
    if (!compte) return <div>Profil introuvable.</div>;

    //Vérifie si on affiche son propre profil
    const isOwnProfile = compteConnecte?.pseudo === compte.pseudo;

    return (
        <div className="profil-content">
            <Typography variant="h3" color="textSecondary">
                Profil
            </Typography>
            <Container sx={{width: '80%'}}>
                <div className="profil-description">
                    <ColorAvatar/>
                    <div className="profil-description-text">
                        <Typography variant="h4" color="textPrimary">
                            {compte.pseudo}
                        </Typography>
                        <Typography variant="h5" color="textPrimary">
                            {compte.description}
                        </Typography>
                    </div>
                </div>

                {isOwnProfile && (
                    <Stack
                        className="profil-buttons"
                        spacing={2}
                    >
                        <Button variant="outlined" className = "modif">
                            Modifier le profil
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleLogout}>
                            Déconnexion
                        </Button>
                    </Stack>
                )}
            </Container>

            <div className = "parutions">
                <TabContext
                    value={value}
                >
                    <TabList onChange={handleChange}>
                        <Tab value ="1" label="Mes recettes"/>
                        <Tab value ="2" label="Mes posts"/>
                        <Tab value = "3" label="Mes partages"/>
                    </TabList>
                    <TabPanel value="1" className="tab-content">
                        <CardListV2 resMessage={recettes.length + (recettes.length>1 ? " Resultats" : " Resultat")}>
                            {cards.map((card) => (
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
                        </CardListV2>
                    </TabPanel>
                    <TabPanel value="2" className="tab-content">
                        Item Two
                    </TabPanel>
                    <TabPanel value="3" className="tab-content">
                        Item Three
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );

}