import CommList from "../CommList";
import {Container} from "@mui/material";
import React from "react";
import pfp from "../../../images/necromencienne.jpg";

export function TestCommType() {

    const [commRecette] = React.useState([
        {
            idCommentaire: 1,
            idCommRepondu: 0,
            contenu: "Bonjour, je suis un commentaire de recette !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,

            // Notes
            note: 3,
        },
        {
            idCommentaire: 2,
            idCommRepondu: 0,
            contenu: "Bonjour, je suis un aussi un commentaire de recette !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,

            // Notes
            note: null,
        },
    ]);

    const [commRestau] = React.useState([
        {
            idCommentaire: 1,
            idCommRepondu: 0,
            contenu: "Bonjour, je suis un commentaire de restaurant !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,

            // Notes
            note: 3,
            noteRapidite: 1,
            noteQualite: 2,
            noteService: 4,
            noteHygiene: 5,
        },
        {
            idCommentaire: 1,
            idCommRepondu: 0,
            contenu: "Bonjour, je suis aussi un commentaire de restaurant !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,

            // Notes
            note: null,
        },
    ]);

    const [commCommu] = React.useState([
        {
            idCommentaire: 1,
            idCommRepondu: 0,
            contenu: "Bonjour, je suis un commentaire de communauté !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
        {
            idCommentaire: 1,
            idCommRepondu: 0,
            contenu: "Bonjour, je suis aussi un commentaire de communauté !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
    ]);

    const [commPartage] = React.useState([
        {
            idCommentaire: 1,
            idCommRepondu: 0,
            contenu: "Bonjour, je suis un commentaire de partage !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
            scoreConfiance: 3,
        },
        {
            idCommentaire: 1,
            idCommRepondu: 0,
            contenu: "Bonjour, je suis aussi un commentaire de partage !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
            scoreConfiance: 0,
        },
    ]);

    return (
        <Container>
            <h1>Commentaire de Recette</h1>
            <CommList width={'90%'} commentaires={commRecette} section={"recette"}/>

            <h1>Commentaire de Restau</h1>
            <CommList width={'90%'} commentaires={commRestau} section={"restaurant"}/>

            <h1>Commentaire de Commu</h1>
            <CommList width={'90%'} commentaires={commCommu} section={"communaute"}/>

            <h1>Commentaire de Partage</h1>
            <CommList width={'90%'} commentaires={commPartage} section={"partage"}/>
        </Container>
    );
}