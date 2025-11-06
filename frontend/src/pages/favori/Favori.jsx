import {Typography, Stack, Tab} from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import CardList from "../../components/card_list/CardListV2";
import React from "react";
import GenericCard from "../../components/card_list/GenericCard";
import RecetteAndRestoElement from "../../components/card_list/RecetteAndRestoElement";
import img0 from "../../images/taboule.png";
import img1 from "../../images/wok_sushi.png";
import PostElement from "../../components/card_list/PostElement";
import img2 from "../../images/taboule_crame.png";
import PartageElement from "../../components/card_list/PartageElement";
import img3 from "../../images/poulet.jpg";
import SearchBar from "../../components/searchBar/SearchBar";

export default function Favori(){

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
    const [cartesRecettes, setCartesRecettes] = React.useState([
        {
            id: 0,
            title: 'Taboulé (Test Recette)',
            text: <RecetteAndRestoElement
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
            text: <RecetteAndRestoElement
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
            text: <RecetteAndRestoElement
                rate={3.5}
                description="Un très bon taboulé, très frais et aérien."
                tags_nourriture={["Végétarien"]}
            />,
            tags: [],
            thumbnail: img0,
            liked: false,
            likes: 119
        },
    ]);

    const [cartesRestaurants, setCartesRestaurants] = React.useState([
        {
            id: 1,
            title: 'Wok Sushi (Test Restaurant)',
            text: <RecetteAndRestoElement
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
    ]);

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

    const handleLike = (card, setCards) => {
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
        /*ajouter la mise à jour de la liste des favoris*/
    };

    const handleClick = (card) => {
        alert(`Carte sélectionnée : ${card.title}`);
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
                        Retrouvez ici toutes les recettes, restaurants, posts et partages que vous avez mis en favoris
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
                        {cartesRecettes.map((card, index) => (
                            <GenericCard
                                key={card.id}
                                card={card}
                                onLike={()=>handleLike(card, setCartesRecettes)}
                                onClick={handleClick}
                            />
                        ))}
                    </CardList>
                </TabPanel>
                <TabPanel value="2" sx={{width:'80%'}}>
                    <SearchBar message={"Rechercher un favori"}/>
                    <CardList>
                        {cartesRestaurants.map((card, index) => (
                            <GenericCard
                                key={card.id}
                                card={card}
                                onLike={()=>handleLike(card, setCartesRestaurants)}
                                onClick={handleClick}
                            />
                        ))}
                    </CardList>
                </TabPanel>
                <TabPanel value="3" sx={{width:'80%'}}>
                    <SearchBar message={"Rechercher un favori"}/>
                    <CardList>
                        {cartesPosts.map((card, index) => (
                            <GenericCard
                                key={card.id}
                                card={card}
                                onLike={()=>handleLike(card, setCartesPosts)}
                                onClick={handleClick}
                            />
                        ))}
                    </CardList>
                </TabPanel>
                <TabPanel value="4" sx={{width:'80%'}}>
                    <SearchBar message={"Rechercher un favori"}/>
                    <CardList>
                        {cartesPartages.map((card, index) => (
                            <GenericCard
                                key={card.id}
                                card={card}
                                onLike={()=>handleLike(card, setCartesPartages)}
                                onClick={handleClick}
                            />
                        ))}
                    </CardList>
                </TabPanel>
            </TabContext>

        </Stack>
    );
}