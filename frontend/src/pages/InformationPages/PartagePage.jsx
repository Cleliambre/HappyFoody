import Stack from "@mui/material/Stack";
import CardDescription from "./CardDescription";
import taboule from "../../images/default_img.png";
import {Avatar, Button, Card, CardHeader, Divider, Link, Pagination, Paper, TextField, Typography} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import React from "react";
import berserk from "../../images/berserk.jpg";
import CardList from "../../components/card_list/CardListV2";
import ButtonReturn from "../../components/ButtonReturn";

export default function PartagePage(){

    const [description, setDescription] = React.useState({
        image : taboule,
        titre: "Taboulé",
        auteur: "ProDuTaboulé",
        pp: berserk,
        confiance: 3,
        description : "J'ai fait trop de taboulé et souhaiterais en faire don. Qui en veut ?",
        tags : [{label : "végétarien", color : "success"}]
    });

    const [like, setLike] = React.useState({
        liked: false,
        nb:120
    });

    const [parts, setParts] = React.useState({
        partsRestantes : 4,
        partsMax : 4
    })

    const [commentaires, setCommentaires] = React.useState([])

    const [commentaire, setCommentaire] = React.useState("");
    const [erreurTexte, setErreurTexte] = React.useState("");
    const [erreurTexteParts, setErreurTexteParts] = React.useState("");

    const handleValidationComment = () => {
        if(commentaire === ""){
            setErreurTexte("Votre commentaire est vide, veuillez le remplir.");
        }
        else{
            setCommentaire("");
            setErreurTexte("");
        }
    }

    const handleAnnulerComment = () => {
        setCommentaire("");
        setErreurTexte("")
    }

    const handlePrendrePart = ()=>{
        if(parts.partsRestantes<=0){
            setErreurTexteParts("Il n'y a plus de part !")
        }
        else{
            setParts({...parts, partsRestantes: parts.partsRestantes - 1})
            setErreurTexteParts("")
        }

    }

    return (
        //Contenu de la page
        <Stack
            direction="column"
            alignItems="center"
            paddingY={2}
            spacing={2}
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
                    {/*auteur, confiance, et envoyer un message*/}
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

                            {/*Pseudo + confiance pour améliorer l'affichage selon la taille de la fenêtre*/}
                            <Stack gap={1} sx={{
                                flexDirection: {sm: 'column', md: 'row'}
                            }}>
                                {/*pseudo*/}
                                <Typography variant="body2">
                                    {description.auteur}
                                </Typography>

                                {/*confiance*/}
                                {/*on crée un tableau d'éléments vides de la taille que l'on souhaite (ici, le nombre de confiances),
                                qu'on parcourra pour faire l'équivalent d'une boucle for*/}
                                <Stack direction="row" spacing={0} alignItems="center">
                                    {Array.from({ length: description.confiance }).map((_, i) => (
                                        <ThumbUpOutlinedIcon key={i} fontSize="small"/>
                                    ))}
                                </Stack>
                            </Stack>
                        </Stack>

                        {/*envoyer un message*/}
                        <Stack direction="row" spacing={1}>
                            <EmailOutlinedIcon fontSize="small"/>
                            <Link href={"#"} variant="body2">
                                Envoyer un message
                            </Link>
                        </Stack>

                    </Stack>
                </CardDescription>

                {/*Bouton de retour*/}
                <ButtonReturn
                    path={"/partage"}
                    text={"Retour à la recherche de partage"}
                />
            </Stack>

            {/*Description détaillée*/}


            {/*Parts*/}
            <Paper elevation={2} sx={{padding:2}}>
                <Stack direction="column" alignItems="center" spacing={1}>
                    <Typography variant="h5">
                        Nombre de parts restantes :
                    </Typography>
                    <Typography variant="body4">
                        {parts.partsRestantes} / {parts.partsMax}
                    </Typography>
                </Stack>
            </Paper>

            <Typography variant={"body2"} color={"error"}>
                {erreurTexteParts}
            </Typography>

            {/*Bouton pour prendre une part*/}
            <Button
                variant="contained"
                sx={{borderRadius:5}}
                onClick={handlePrendrePart}
            >
                J'en prend une part !
            </Button>

            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                width="80%"
            >
                <Typography variant="h4">
                    Commentaires
                </Typography>
                <Divider flexItem={true}/>

                <CardList>
                    Commentaires en attentes
                </CardList>

                <Pagination count={Math.ceil(commentaires.length/5)}/>
            </Stack>

            <Stack
                direction="column"
                alignItems="start"
                spacing={2}
                width="80%"
            >
                <Divider flexItem={true}/>
                {/*bloc de création de commentaire*/}
                <Typography variant="h4">Commentaire</Typography>

                <Card sx={{width:'100%', padding: '10px'}}>
                    <CardHeader
                        avatar={<Avatar src={ description.pp}/>}
                        title={description.auteur}
                    />
                    <Stack direction="column" spacing={2} alignItems="center">
                        <TextField
                            multiline={true}
                            fullWidth={true}
                            label="Commentaire"
                            value={commentaire}
                            onChange={(e)=>setCommentaire(e.target.value)}
                        />
                        <Typography variant="body2" color="error">
                            {erreurTexte}
                        </Typography>
                        <Stack direction="row" spacing={2} width={"100%"} justifyContent="flex-end" >
                            <Button
                                onClick={handleAnnulerComment}
                            >
                                Annuler
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleValidationComment}
                            >
                                Valider
                            </Button>
                        </Stack>
                    </Stack>

                </Card>
            </Stack>

        </Stack>
    );
}