import React from "react";

// Image
import pfp from "../../../images/necromencienne.jpg";
import iconHappyFoody from "../../menu/HappyFoodyIcon.png";
import {SectionComm} from "../SectionComm";

export function TestSectionComm({section="communaute"}) {

    const [commTest, setCommTest] = React.useState([
        {
            idCommentaire: 1,
            idCommRepondu: 0,
            contenu: "Oui. Bon app !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Malveillance Max",
            userImageUrl: null,
        },
        {
            idCommentaire: 2,
            idCommRepondu: 1,
            contenu: "Mais ça ne va pas !?",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "User_choqué",
            userImageUrl: null,
        },
        {
            idCommentaire: 3,
            idCommRepondu: 0,
            contenu: "Mais comment tu as fait ?? Il n’y a rien à faire chauffer dans un taboulé 😱",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "JSP",
            userImageUrl: null,
        },
        {
            idCommentaire: 4,
            idCommRepondu: 0,
            contenu: "De toute manière le taboulé c’est pas bon",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "ProDuTaboulé hate account",
            userImageUrl: pfp,
        },
        {
            idCommentaire: 5,
            idCommRepondu: 4,
            contenu: "Je ne suis pas d'accord !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "JamaisDaccord",
            userImageUrl: null,
        },
        {
            idCommentaire: 6,
            idCommRepondu: 4,
            contenu: "Objection !",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Justice!",
            userImageUrl: null,
        },
        {
            idCommentaire: 7,
            idCommRepondu: 0,
            contenu: "Je pense qu’il est préférable d’en cuisiner un autre... (et sans le chauffer cette fois)\nVoici le lien vers une recette de taboulé simple :\nhttps://www.Happy-Foody.com/Recettes/Taboulé",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Angel",
            userImageUrl: null,
        },
        {
            idCommentaire: 8,
            idCommRepondu: 0,
            contenu: "+1",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Angel",
            userImageUrl: null,
        },
        {
            idCommentaire: 9,
            idCommRepondu: 0,
            contenu: "+2",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Angel",
            userImageUrl: null,
        },
        {
            idCommentaire: 10,
            idCommRepondu: 0,
            contenu: "+3",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Angel",
            userImageUrl: null,
        },
    ]);

    const currentProfil = {
        username: "Happy Foody",
        userImageUrl: iconHappyFoody,
        scoreConfiance:3
    };

    return (
        <SectionComm section={section} currentProfil={currentProfil} commentaires={commTest} setComm={setCommTest}/>
    );
}