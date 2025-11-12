import CommList from "../CommList";
import {Container} from "@mui/material";
import React from "react";
import pfp from "../../../images/necromencienne.jpg";

export function TestCommIndent() {

    const [commCommu] = React.useState([
        {
            idCommentaire: 9,
            idCommRepondu: 1,
            contenu: "idCommentaire: 9,\n" +
                "            idCommRepondu: 1,",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
        {
            idCommentaire: 1,
            idCommRepondu: 0,
            contenu: "idCommentaire: 1,\n" +
                "            idCommRepondu: 0,",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
        {
            idCommentaire: 2,
            idCommRepondu: 1,
            contenu: "idCommentaire: 2,\n" +
                "            idCommRepondu: 1,",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
        {
            idCommentaire: 3,
            idCommRepondu: 1,
            contenu: "idCommentaire: 3,\n" +
                "            idCommRepondu: 1,",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
        {
            idCommentaire: 4,
            idCommRepondu: 2,
            contenu: "idCommentaire: 4,\n" +
                "            idCommRepondu: 2,",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
        {
            idCommentaire: 5,
            idCommRepondu: 0,
            contenu: "idCommentaire: 5,\n" +
                "            idCommRepondu: 0,",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
        {
            idCommentaire: 6,
            idCommRepondu: 5,
            contenu: "idCommentaire: 6,\n" +
                "            idCommRepondu: 5,",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
        {
            idCommentaire: 7,
            idCommRepondu: 5,
            contenu: "idCommentaire: 7,\n" +
                "            idCommRepondu: 5,",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Golanginya",
            userImageUrl: pfp,
        },
    ]);

    return (
        <Container>
            <h1>Commentaires</h1>
            <CommList width={'80%'} commentaires={commCommu} section={"communaute"}/>
        </Container>
    );
}