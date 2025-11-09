import React from "react";

// Importation
import {Box, Container, Divider} from "@mui/material";
import CommList from "./CommList";
import CreationComm from "./CreationComm";

// Image
import pfp from "../../images/necromencienne.jpg";
import iconHappyFoody from "../menu/HappyFoodyIcon.png";

export function SectionComm({section="communaute", currentProfil, commentaires, setComm}) {

    const [reponseA, setReponseA] = React.useState(null);
    const creationRef = React.useRef(null);

    const handleRepondre = (commentaire) => {
        setReponseA(commentaire);
        creationRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const nextId = commentaires.length === 0 ? 1 : Math.max(...commentaires.map(c => c.idCommentaire)) + 1;

    const handlePublier = (publication) => {
        const { ...infosPublication} = publication;

        const commentaire = {
            idCommentaire: nextId,
            date: Date.now(),
            ...infosPublication
        }
        setComm(prev => [commentaire, ...prev]);
    };

    return (
        <Container>
            <CommList
                width={'80%'}
                commentaires={commentaires}
                section={section}
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
                    {...(section === "partage" ? { typeCommentaire: section } : {})}
                />
            </Container>
            <Box sx={{height: '50px'}}/>
        </Container>
    );
}