import {Typography, Stack, Tab} from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import CardList from "../../components/card_list/CardList";
import React, {useEffect} from "react";
import GenericCard from "../../components/card_list/GenericCard";
import RecetteElement from "../../components/card_list/RecetteElement";
import img0 from "../../images/default_img.png";
import img1 from "../../images/wok_sushi.png";
import PostElement from "../../components/card_list/PostElement";
import img2 from "../../images/taboule_crame.png";
import PartageElement from "../../components/card_list/PartageElement";
import img3 from "../../images/poulet.jpg";
import SearchBar from "../../components/searchBar/SearchBar";
import {useNavigate} from 'react-router-dom';

export default function Favori(){

    useEffect(() => {
        document.title = "Favoris - Happy Foody"
        const timer = setTimeout(() => {
            alert("Il manque des fonctionnalités à cette page");
        }, 0);
    }, [])
    //Pour pouvoir changer de catégorie dans la Tab
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /*format des cartes :
    {
        id: int,
        title: string,
        text: balise de carte,
        tags: [],
        thumbnail: image,
        liked: booléen (toujours true ici),
        likes: int,
    }
    */

    const navigate = useNavigate();

    const [compte, setCompte] = React.useState([]);
    const [recettesLiked, setRecettesLiked] = React.useState([]);
    const [restaurantsLiked, setRestaurantsLiked] = React.useState([]);
    const [cardsRecettes, setCardsRecettes] = React.useState([]);
    const [cardsRestaurants, setCardsRestaurants] = React.useState([]);

    // 🔹 Récupération du compte connecté s’il y en a un
    useEffect(() => {
        const idCompte = localStorage.getItem('idCompte');

        if (!idCompte) {
            // Si on est sur /profil (pas de pseudo) et pas connecté → redirige vers /connexion
            navigate('/connexion');
            return;
        }

        // Récupère le compte connecté
        fetch(`http://localhost:8080/api/compte/getCompteById/${idCompte}`)
            .then(async res => {
                const text = await res.text();
                return text ? JSON.parse(text) : null;
            })
            .then(data => {
                setCompte(data);
            })
            .catch(err => console.error("Erreur de récupération du compte connecté :", err));
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (compte) {
                    try {
                        const likedResponse = await fetch(`http://localhost:8080/api/compte/getLikedRecettes/${compte.idCompte}`);
                        if (likedResponse.ok) {
                            const likedRecettes = await likedResponse.json();
                            setRecettesLiked(likedRecettes);
                        }
                    } catch (e) {
                        console.warn("Impossible de charger les likes de l'utilisateur :", e);
                    }
                }

                if(!recettesLiked) return;

                const recettesAvecInfos = await Promise.all(
                    recettesLiked.map(async (recette) => {
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
                            liked: true
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

                setCardsRecettes(newCards);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [compte, recettesLiked]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (compte) {
                    try {
                        const likedResponse = await fetch(`http://localhost:8080/api/compte/getLikedRestaurants/${compte.idCompte}`);
                        if (likedResponse.ok) {
                            const likedRestaurants = await likedResponse.json();
                            setRestaurantsLiked(likedRestaurants);
                        }
                    } catch (e) {
                        console.warn("Impossible de charger les likes de l'utilisateur :", e);
                    }
                }

                if(!restaurantsLiked) return;

                const restaurantsAvecInfos = await Promise.all(
                    restaurantsLiked.map(async (restaurant) => {
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
                            liked: true
                        };
                    })
                );

                const newCards = restaurantsAvecInfos.map((restaurant) => ({
                    id: restaurant.idRestaurant,
                    title: restaurant.nom || "Restaurant sans nom",
                    description: restaurant.description || "Aucune description",
                    rate: restaurant.note_moyenne || 0,
                    tags: restaurant.tags || [],
                    thumbnail: restaurant.urlImage || img0,
                    liked: restaurant.liked,
                    likes: restaurant.nb_likes || 0,
                }));

                setCardsRestaurants(newCards);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [compte, restaurantsLiked]);

    /*const [cartesRecettes, setCartesRecettes] = React.useState([
        {
            id: 0,
            title: 'Taboulé (Test Recette)',
            text: <RecetteElement
                rate={3.5}
                description="Un très bon taboulé, très frais et aérien."
                tags_nourriture={["Végétarien"]}
            />,
            tags: [],
            thumbnail: img0,
            liked: false,
            likes: 119
        },
        {
            id: 1,
            title: 'Taboulé (Test Recette)',
            text: <RecetteElement
                rate={3.5}
                description="Un très bon taboulé, très frais et aérien."
                tags_nourriture={["Végétarien"]}
            />,
            tags: [],
            thumbnail: img0,
            liked: false,
            likes: 119
        },
        {
            id: 2,
            title: 'Taboulé (Test Recette)',
            text: <RecetteElement
                rate={3.5}
                description="Un très bon taboulé, très frais et aérien."
                tags_nourriture={["Végétarien"]}
            />,
            tags: [],
            thumbnail: img0,
            liked: false,
            likes: 119
        },
    ]);*/

    /*
    const [cartesRestaurants, setCartesRestaurants] = React.useState([
        {
            id: 1,
            title: 'Wok Sushi (Test Restaurant)',
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
            tags: [],
            thumbnail: img1,
            liked: false,
            likes: 97
        }
    ]);*/

    const [cartesPosts, setCartesPosts] = React.useState([
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
            likes: 1000000
        }
    ]);

    const [cartesPartages, setCartesPartages] = React.useState([
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
        }
    ]);



    const handleLikeRecette = async (card) => {
        const idCompte = localStorage.getItem("idCompte");
        if (!idCompte) {
            alert("Vous devez être connecté pour liker !");
            return;
        }

        const newLiked = !card.liked;

        // ✅ Mise à jour optimiste
        setCardsRecettes(prevCards =>
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
            setCardsRecettes(prevCards =>
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

    const handleLikeRestaurant = async (card) => {
        const idCompte = localStorage.getItem("idCompte");
        if (!idCompte) {
            alert("Vous devez être connecté pour liker !");
            return;
        }

        const newLiked = !card.liked;

        // ✅ Mise à jour optimiste
        setCardsRestaurants(prevCards =>
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
            setCardsRecettes(prevCards =>
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

    const handleClickRecette = (card) => {
        navigate(`/recette/${card.id}`);
    };

    const handleClickRestaurant = (card) => {
        navigate(`/restaurant/${card.id}`);
    };


    return (
        //contenu de la page
        <Stack
            alignItems={"center"}
            textAlign={"center"}
            height={"100%"}
            padding={2}
        >
            {/*titre*/}
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                width={"50%"}
                marginBottom={2}
            >
                <FavoriteBorderOutlinedIcon sx={{fontSize : "150px"}}/>
                <Stack direction="column" spacing={2} alignItems="start">
                    <Typography variant="h3">
                        Favoris
                    </Typography>
                    <Typography variant="body1" color="textSecondary" textAlign={"left"}>
                        Retrouvez ici toutes les restaurants, restaurants, posts et partages que vous avez mis en favoris
                    </Typography>
                </Stack>
            </Stack>

            {/*Table pour les favoris*/}
            <TabContext
                value={value}
            >
                {/*Titre pour chaque catégorie*/}
                <TabList onChange={handleChange}>
                    <Tab value ="1" label="Recettes"/>
                    <Tab value ="2" label="Restaurants"/>
                    <Tab value = "3" label="Posts"/>
                    <Tab value = "4" label="Partages"/>
                </TabList>
                <TabPanel value="1" sx={{width:'80%'}}>
                    <SearchBar message={"Rechercher un favori"}/>
                    <CardList>
                        {cardsRecettes.map((card, index) => (
                            <GenericCard
                                key={card.id}
                                card={{
                                    ...card,
                                    text: (
                                        <RecetteElement
                                            rate={card.rate}
                                            description={card.description}
                                            tags_nourriture={card.tags}
                                        />
                                    )
                                }}
                                onLike={handleLikeRecette}
                                onClick={handleClickRecette}
                            />
                        ))}
                    </CardList>
                </TabPanel>
                <TabPanel value="2" sx={{width:'80%'}}>
                    <SearchBar message={"Rechercher un favori"}/>
                    <CardList>
                        {cardsRestaurants.map((card, index) => (
                            <GenericCard
                                key={card.id}
                                card={{
                                    ...card,
                                    text: (
                                        <RecetteElement
                                            rate={card.rate}
                                            description={card.description}
                                            tags_nourriture={card.tags}
                                        />
                                    )
                                }}
                                onLike={handleLikeRestaurant}
                                onClick={handleClickRestaurant}
                            />
                        ))}
                    </CardList>
                </TabPanel>
                <TabPanel value="3" sx={{width:'80%'}}>
                    <SearchBar message={"Rechercher un favori"}/>
                    <CardList>
                        {cardsRecettes.map((card, index) => (
                            <GenericCard
                                key={card.id}
                                card={{
                                    ...card,
                                    text: (
                                        <RecetteElement
                                            rate={card.rate}
                                            description={card.description}
                                            tags_nourriture={card.tags}
                                        />
                                    )
                                }}
                                onLike={handleLikeRecette}
                                onClick={handleClickRecette}
                            />
                        ))}
                    </CardList>
                </TabPanel>
                <TabPanel value="4" sx={{width:'80%'}}>
                    <SearchBar message={"Rechercher un favori"}/>
                    <CardList>
                        {cardsRecettes.map((card, index) => (
                            <GenericCard
                                key={card.id}
                                card={{
                                    ...card,
                                    text: (
                                        <RecetteElement
                                            rate={card.rate}
                                            description={card.description}
                                            tags_nourriture={card.tags}
                                        />
                                    )
                                }}
                                onLike={handleLikeRecette}
                                onClick={handleClickRecette}
                            />
                        ))}
                    </CardList>
                </TabPanel>
            </TabContext>

        </Stack>
    );
}