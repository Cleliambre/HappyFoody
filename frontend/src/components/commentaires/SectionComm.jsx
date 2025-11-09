import React from "react";

// Importation
import {Box, Container, Divider} from "@mui/material";
import CommList from "./CommList";
import CreationComm from "./CreationComm";

// Image
import pfp from "../../images/necromencienne.jpg";
import iconHappyFoody from "../menu/HappyFoodyIcon.png";

export function SectionComm() {

    const [commCommu, setCommCommu] = React.useState([
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
            contenu: "",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Angel",
            userImageUrl: null,
        },
        {
            idCommentaire: 9,
            idCommRepondu: 0,
            contenu: "Je pense qu’il est préférable d’en cuisiner un autre... (et sans le chauffer cette fois) Voici le lien vers une recette de taboulé simple :  https://www.Happy-Foody.com/Recettes/Taboulé",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Angel",
            userImageUrl: null,
        },
        {
            idCommentaire: 10,
            idCommRepondu: 0,
            contenu: "Je pense qu’il est préférable d’en cuisiner un autre... (et sans le chauffer cette fois) Voici le lien vers une recette de taboulé simple :  https://www.Happy-Foody.com/Recettes/Taboulé",
            date: new Date(2025, 10, 6, 14, 0, 0),

            // idAuteur
            username: "Angel",
            userImageUrl: null,
        },
    ]);

    const currentProfil = {
        username: "Happy Foody",
        userImageUrl: iconHappyFoody
    };

    const [reponseA, setReponseA] = React.useState(null);
    const creationRef = React.useRef(null);

    const handleRepondre = (commentaire) => {
        setReponseA(commentaire);
        creationRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const nextId = commCommu.length === 0 ? 1 : Math.max(...commCommu.map(c => c.idCommentaire)) + 1;

    const handlePublier = (publication) => {
        const commentaire = {
            idCommentaire: nextId,
            idCommRepondu: publication.idCommRepondu,
            contenu: publication.contenu,
            date: Date.now(),

            // idAuteur
            username: publication.username,
            userImageUrl: publication.userImageUrl,
        }
        setCommCommu(prev => [commentaire, ...prev]);
    };

    return (
        <Container>
            <CommList
                width={'80%'}
                commentaires={commCommu}
                section={"communaute"}
                onRepondre={handleRepondre}
            />

            <Divider variant="middle" flexItem
                     sx={{borderBottomWidth: 3, padding:'10px'}}
            />

            <Container Divider sx={{width: '80%', padding:'30px'}} ref={creationRef} justifyContent='center'>
                <h1>Commentaire</h1>
                <CreationComm
                    currentProfil={currentProfil}
                    repondA={reponseA}
                    onPublier={handlePublier}
                    onCancel={() => setReponseA(null)}
                />
            </Container>
            <Box sx={{height: '50px'}}/>
        </Container>
    );
}