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
import RestoElement from "../../components/card_list/RestoElement";

export default function Favori(){

    useEffect(() => {
        document.title = "Favoris - Happy Foody"
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

    const [compte, setCompte] = React.useState(null);
    const [recettesLiked, setRecettesLiked] = React.useState([]);
    const [restaurantsLiked, setRestaurantsLiked] = React.useState([]);
    const [cardsRecettes, setCardsRecettes] = React.useState([]);
    const [cardsRestaurants, setCardsRestaurants] = React.useState([]);

    useEffect(() => {
        const idCompte = localStorage.getItem('idCompte');
        if (!idCompte) {
            navigate('/connexion');
            return;
        }

        const chargerDonnees = async () => {
            try {
                // 1️⃣ Charger le compte
                const compteRes = await fetch(`http://localhost:8080/api/compte/getCompteById/${idCompte}`);
                const compteText = await compteRes.text();
                const compteData = compteText ? JSON.parse(compteText) : null;
                setCompte(compteData);

                if (!compteData?.idCompte) return;

                // 2️⃣ Charger les recettes likées
                const recettesRes = await fetch(`http://localhost:8080/api/compte/getLikedRecettes/${compteData.idCompte}`);
                const recettesLiked = recettesRes.ok ? await recettesRes.json() : [];
                setRecettesLiked(recettesLiked);

                // Charger leurs infos complémentaires
                const recettesAvecInfos = await Promise.all(
                    recettesLiked.map(async (recette) => {
                        const [noteRes, likesRes] = await Promise.all([
                            fetch(`http://localhost:8080/api/recette/noteMoyenne/${recette.idRecette}`),
                            fetch(`http://localhost:8080/api/recette/nombreLikes/${recette.idRecette}`)
                        ]);

                        const noteText = await noteRes.text();
                        const likesText = await likesRes.text();

                        return {
                            ...recette,
                            note_moyenne: noteText ? JSON.parse(noteText) : 0,
                            nb_likes: likesText ? JSON.parse(likesText) : 0,
                            id: recette.idRecette,
                            liked: true
                        };
                    })
                );

                setCardsRecettes(recettesAvecInfos.map((r) => ({
                    id: r.id,
                    title: r.titre || "Recette sans nom",
                    description: r.description || "Aucune description",
                    rate: r.note_moyenne,
                    tags_nourriture: r.tags || [],
                    thumbnail: r.urlImage || img0,
                    liked: true,
                    likes: r.nb_likes
                })));

                // 3️⃣ Charger les restaurants likés
                const restosRes = await fetch(`http://localhost:8080/api/compte/getLikedRestaurants/${compteData.idCompte}`);
                const restosLiked = restosRes.ok ? await restosRes.json() : [];
                setRestaurantsLiked(restosLiked);

                const restosAvecInfos = await Promise.all(
                    restosLiked.map(async (restaurant) => {
                        const [noteRes, likesRes] = await Promise.all([
                            fetch(`http://localhost:8080/api/restaurant/noteMoyenne/${restaurant.idRestaurant}`),
                            fetch(`http://localhost:8080/api/restaurant/nombreLikes/${restaurant.idRestaurant}`)
                        ]);

                        const noteText = await noteRes.text();
                        const likesText = await likesRes.text();

                        return {
                            ...restaurant,
                            note_moyenne: noteText ? JSON.parse(noteText) : 0,
                            nb_likes: likesText ? JSON.parse(likesText) : 0,
                            id: restaurant.idRestaurant,
                            liked: true
                        };
                    })
                );

                setCardsRestaurants(restosAvecInfos.map((r) => ({
                    id: r.id,
                    title: r.nom || "Restaurant sans nom",
                    description: r.description || "Aucune description",
                    rate: r.note_moyenne,
                    tags_nourriture: r.tags || [],
                    thumbnail: r.urlImage || img0,
                    liked: true,
                    likes: r.nb_likes
                })));

            } catch (err) {
                console.error("Erreur lors du chargement des favoris :", err);
            }
        };

        chargerDonnees();
    }, [navigate]);


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
                                            tags_nourriture={card.tags_nourriture}
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
                                        <RestoElement
                                            rate={card.rate}
                                            description={card.description}
                                            tags_nourriture={card.tags_nourriture}
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