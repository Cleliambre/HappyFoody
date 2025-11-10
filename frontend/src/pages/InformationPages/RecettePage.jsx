import React, {useEffect} from "react";

import {Stack, Typography, Avatar, Link, Paper, List, ListItem, ListItemText} from "@mui/material";
import taboule from "../../images/taboule.png"
import berserk from "../../images/berserk.jpg"
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

import CardDescription from "./CardDescription";
import ButtonReturn from "../../components/ButtonReturn";

export default function RecettePage(){
    useEffect(() => {document.title = "Page Recette - Happy Foody"}, [])

    const [description] = React.useState({
        image : taboule,
        titre: "Taboulé",
        auteur: "ProDuTaboulé",
        pp: berserk,
        note : 3.5,
        description : "Un très bon taboulé, très frais et aérien.",
        nbLike : 120,
        tags : [{label : "végétarien", color : "success"}, {label : "végétarien", color : "success"}, {label : "végétarien", color : "success"},{label : "végétarien", color : "success"},{label : "végétarien", color : "success"}]
    });

    const [like, setLike] = React.useState({liked: false, nb:description.nbLike});

    const [temps] = React.useState(150);

    const [portion] = React.useState(4);

    const [ingredients] = React.useState([
        {
            nom : "Couscous moyen",
            quantite : 200,
            unite : "g"
        },
        {
            nom : "Oignon nouveau",
            quantite : 150,
            unite : "g"
        }
    ]);

    const [etapes] = React.useState([
        "Test Etape 1 bla bla  bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ",
        "Test Etape 2 ouiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
    ]);

    const formatTemps = (temps) => {
        const heures = Math.floor(temps / 60)
        const minutes = temps % 60;
        return heures+ "h" + minutes;
    }

    return (
        /*Contenu de la page*/
        <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            padding={2}
        >
            {/*Bouton + carte de description*/}
            <Stack
                alignItems="start"
                width={"80%"}
                maxWidth = "900px"
                spacing={1}
            >

                {/*description brève de la recette*/}
                <CardDescription
                    image={taboule}
                    tags={description.tags}
                    titre={description.titre}
                    texteDescription={description.description}
                    like={like}
                    setLike={setLike}
                >
                    {/*auteur, note*/}
                    <Stack
                        direction="column"
                        spacing={1}
                    >
                        {/*auteur*/}
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/*photo de profil (pp)*/}
                            <Avatar
                                src = {description.pp}
                            />
                            {/*pseudo*/}
                            <Typography variant="body2">
                                {description.auteur}
                            </Typography>
                        </Stack>
                        {/*note*/}
                        <Stack direction="row" spacing={3}>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <Typography variant="body2">
                                    {description.note}
                                </Typography>
                                <StarOutlinedIcon fontSize="small" sx={{color : "gold"}}/>
                            </Stack>
                            <Link href={"#"} variant="body2">
                                Voir le top3 des commentaires
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

            {/*Description détaillée*/}

            {/*Temps et portions*/}
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

            {/*Ingrédients et Etapes de préparation*/}
            <Stack
                width={"80%"}
                maxWidth={"900px"}
                alignItems="start"
                spacing={1}
            >
                <Typography variant="h5">
                    Ingredients :
                </Typography>
                <List sx={{listStyleType: 'disc', pl:4}}>
                    {ingredients.map((ingredient)=>
                        <ListItem sx={{display: 'list-item', py:0}}>
                            <ListItemText>
                                {ingredient.nom} : {ingredient.quantite} {ingredient.unite}
                            </ListItemText>
                        </ListItem>)}
                </List>

                <Typography variant="h5">
                    Préparations
                </Typography>
                <List sx={{listStyleType: 'decimal', pl:4}}>
                    {etapes.map((etape)=>
                        <ListItem sx={{display: 'list-item', py:0}}>
                            <ListItemText>
                                {etape}
                            </ListItemText>
                        </ListItem>
                    )}
                </List>
            </Stack>

        </Stack>
    );
}