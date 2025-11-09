import React, {useEffect} from "react";
import './informationPages.css'

// Construction de la page
import {
    Stack,
    Typography,
    Box,
    Grid,
    Divider
} from "@mui/material";

// Images
import wok_sushi from "../../images/wok_sushi.png"

// Création de la carte
import CardDescription from "./CardDescription";
import ButtonReturn from "../../components/ButtonReturn";
import CarteRestaurant from "../../components/restautant_component/CarteRestaurant";
import {PaperNote} from "../../components/restautant_component/PaperNote";
import {Titre} from "../../components/Titre";
import {noteGenerale} from "../../components/smiley_rating/getSmileys";
import CreationComm from "../../components/commentaires/CreationComm";

import { Link } from "react-router-dom";

export default function RestaurantPage(){
    useEffect(() => {document.title = "Page Restaurant - Happy Foody"}, [])

    const [description] = React.useState({
        image : wok_sushi,
        titre: "Wok Sushi (Test restaurant)",

        description : "Le restaurant Wok & Sushi fusionne deux spécialités asiatiques.\n\n" +
            "WOK exprime les plats chauds du traiteur asiatique comme les Bobuns, les nouilles sautés, les gambas et bien d'autre encore...\n\n" +
            "SUSHI vous fera découvrir le restaurant japonais avec certaines saveurs telles que des sushis, des makis california, des sashimis et plus d'autre encore.",

        nbLike : 120,
        tags : [{label : "Lieu", color : "primary"}, {label : "Nourriture", color : "success"}],

        tel:"01 69 28 88 18",
        adresse: <a href="https://share.google/lf4D7DbNYBTVCjHmC">RN 446, 91940 Les Ulis</a>,
        horaire: "lundi - dimanche, 12h00-14h30 et 19h00-22h30",
        reseau:"-",

        prix:"20-30€ par personne",
        reserver:<a href="https://royaldesulis.fr/fr/">royaldesulis.fr</a>,
        menu:<a href="https://royaldesulis.fr/fr/">royaldesulis.fr</a>,
        site:<a href="https://royaldesulis.fr/fr/">royaldesulis.fr</a>

    });

    const [like, setLike] = React.useState({liked: false, nb:description.nbLike});

    const notes = [
        {critere:"Rapidité", note:4.2},
        {critere:"Qualité",  note:4.3},
        {critere:"Service",  note:4.1},
        {critere:"Hygiène",  note:4.9}
    ];

    // TODO : stocker la position du restaurant ?
    const position = [48.676067465716706, 2.1728702239766395];

    // ======== Information des restaurants =======

    const infos= [
        {champ:"📞 Téléphone : ", variable:description.tel},
        {champ:"🗺️ Adresse : ", variable:description.adresse},
        {champ:"🕒 Horaires : ", variable:description.horaire},
        {champ:"📱 Réseaux : ", variable:description.reseau},

        {champ:"\n💰Prix : ", variable:description.prix},
        {champ:"📅 Réserver : ", variable:description.reserver},
        {champ:"📖 Menu : ", variable:description.menu},
        {champ:"🛜 Site Web : ", variable:description.site},
    ];

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
            >

                {/* Présentation carte du restaurant */}
                <CardDescription
                    image={description.image}
                    tags={description.tags}
                    titre={description.titre}
                    texteDescription={description.description}
                    like={like}
                    setLike={setLike}
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
                <Link to={"/"}>Voir le détails des avis</Link>
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
            <Titre id="avis" text="Donner un avis"/>
            {/* TODO : onPublier... */}
            <CreationComm typeCommentaire="restaurant" currentProfil={null} onPublier={() => {}} />
            <Box color="primary" sx={{ height: '30px' }} />
        </Stack>
     );
}