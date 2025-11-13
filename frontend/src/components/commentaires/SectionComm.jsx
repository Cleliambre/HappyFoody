import React from "react";

// Importation
import {Box, Container, Divider} from "@mui/material";
import CommList from "./CommList";
import CreationComm from "./CreationComm";
import Titre from "../Titre";
import axios from "axios";

export function SectionComm({section="communaute", currentProfil, commentaires, setComm, idRestaurant, onRefresh}) {

    const [reponseA, setReponseA] = React.useState(null);
    const creationRef = React.useRef(null);
    console.log("Commentaires dans SectionComm :", JSON.stringify(commentaires, null, 2));

    const handleRepondre = (commentaire) => {
        setReponseA(commentaire);
        creationRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const nextId = commentaires.length === 0 ? 1 : Math.max(...commentaires.map(c => c.idCommentaire)) + 1;

    /*const handlePublier = (publication) => {
        const { ...infosPublication} = publication;

        const commentaire = {
            idCommentaire: nextId,
            date: Date.now(),
            ...infosPublication
        }
        setComm(prev => [commentaire, ...prev]);
    };*/

    const handlePublier = async (publication) => {
        if (!currentProfil) {
            alert("Vous devez être connecté pour publier un commentaire !");
            return;
        }

        const nouveauCommentaire = {
            contenu: publication.contenu,
            date: new Date(),
            auteur: currentProfil, // attention : doit correspondre à l’objet `Compte`
            restaurant: { idRestaurant: publication.idRestaurant }, // transmis depuis RestaurantComm
            noteRapidite: publication.noteRapidite,
            noteService: publication.noteService,
            noteQualite: publication.noteQualite,
            noteHygiene: publication.noteHygiene,
            commRepondu: publication.commRepondu || null
        };

        try {
            const res = await fetch("http://localhost:8080/api/commentaireRestaurant/createCommentaireRestaurant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nouveauCommentaire)
            });

            if (!res.ok) throw new Error("Erreur lors de la création du commentaire");
            const data = await res.json();

            // on ajoute le commentaire à la liste
            setComm(prev => [data, ...prev]);
        } catch (err) {
            console.error("Erreur :", err);
            alert("Impossible d’ajouter le commentaire. Réessayez plus tard.");
        }
    };

    const handlePublierCommentaire = async (data) => {
        let commentaire = null;
        if(data.idCommRepondu !== 0){
            const responseCommentaire = await axios.get(`http://localhost:8080/api/commentaire/getCommentaireById/${data.idCommRepondu}`);
            commentaire = responseCommentaire.data;
        }

        try {

            const responseRestaurant = await axios.get(`http://localhost:8080/api/restaurant/getRestaurantById/${idRestaurant}`);
            const restaurant = responseRestaurant.data;



            if(data.idCommRepondu !== 0) {
                const newCommentaire = {
                    date: Date.now(),
                    auteur: currentProfil,
                    restaurant: restaurant,
                    commRepondu: commentaire,
                    contenu: data.contenu,
                }
                const postCommentaire = await axios.post('http://localhost:8080/api/commentaire/createCommentaire', newCommentaire)
                if (postCommentaire.status === 200 && onRefresh) {
                    onRefresh();
                }

            }
            else{
                const newCommentaire = {
                    date: Date.now(),
                    auteur: currentProfil,
                    restaurant: restaurant,
                    commRepondu: commentaire,
                    contenu: data.contenu,
                    noteHygiene: data.noteHygiene,
                    noteRapidite: data.noteRapidite,
                    noteService: data.noteService,
                    noteQualite: data.noteQualite
                }
                const postCommentaire = await axios.post('http://localhost:8080/api/commentaireRestaurant/createCommentaireRestaurant', newCommentaire)
                if (postCommentaire.status === 200 && onRefresh) {
                    onRefresh();
                }

            }

        }catch(error){
            console.error("Erreur lors de la création du compte :", error);
        }
    }


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

            <Container Divider sx={{padding:'30px', justifyItems:'center'}} ref={creationRef} justifyContent='center'>
                <Titre text="Commentaire"/>
                <CreationComm
                    currentProfil={currentProfil}
                    repondA={reponseA}
                    onPublier={handlePublierCommentaire}
                    onCancel={() => setReponseA(null)}
                    {...((section === "partage" || section === "restaurant") ? { typeCommentaire: section } : {})}
                />
            </Container>
            <Box sx={{height: '50px'}}/>
        </Container>
    );
}