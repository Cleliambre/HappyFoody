import CardDescription from "./CardDescription";
import ButtonReturn from "../../components/ButtonReturn";
import React, {useEffect} from "react";
import {Box, Container, Stack} from "@mui/material";
import wok_sushi from "../../images/wok_sushi.png";
import {SectionComm} from "../../components/commentaires/SectionComm";


// TODO à modifier pour les recettes
export default function RecetteComm() {
    useEffect(() => {
        document.title = "Commentaires Recette - Happy Foody"
        const timer = setTimeout(() => {
                alert("Il manque des fonctionnalités dans cette page.");
            }, 0);
    }, [])

    const [description] = React.useState({
        image : wok_sushi,
        titre: "Wok Sushi (Test restaurant)",

        description : "Le restaurant Wok & Sushi fusionne deux spécialités asiatiques.\n\n" +
            "WOK exprime les plats chauds du traiteur asiatique comme les Bobuns, les nouilles sautés, les gambas et bien d'autre encore...\n\n" +
            "SUSHI vous fera découvrir le restaurant japonais avec certaines saveurs telles que des sushis, des makis california, des sashimis et plus d'autre encore.",

        nbLike : 120,
        tags : [{label : "Nourriture", color : "success"}],

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

    return (
        <Container>

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
                    path={"/recette"} // TODO retourner à sa page de restaurant
                    text={"Retour aux informations de la recette"}
                />
            </Stack>

            <SectionComm section="recette" commentaires={[]} currentProfil={null} setComm={()=>{}}/>
            <Box sx={{ height: '30px' }} />
        </Container>
    );
}