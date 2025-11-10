import Stack from "@mui/material/Stack";
import CardDescription from "./CardDescription";
import {
    Avatar,
    Button, Card, CardActions, CardHeader,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    Link, Pagination,
    TextField,
    Typography
} from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import React, {useState} from "react";
import tabouleCrame from "../../images/taboule_crame.png";
import necromencienne from "../../images/necromencienne.jpg";
import CardList from "../../components/card_list/CardListV2";

export default function CommunautePage(){
    const [description, setDescription] = React.useState({
        image : tabouleCrame,
        titre: "Aide taboulé cramé",
        auteur: "Golanginya",
        pp: necromencienne,
        date : new Date(2025,10,6, 14, 0, 0),
        description : "Bonjour, je viens de cramer du taboulé. Vous pensez que je peux encore le manger ?" +
            "\nJe n'aime pas manger froid donc je l'ai un peu réchauffé... "
    });

    const [like, setLike] = React.useState({
        liked: false,
        nb: 120
    });

    const [commentaires, setCommentaires] = React.useState([])

    const delai = (date)=>{
        const delaiTotal = new Date() - date;

        const parsedYears = Math.floor(delaiTotal / 1000 / 60 / 60 / 24 / 30 / 12)
        const parsedMonths = Math.floor(delaiTotal / 1000 / 60 / 60 / 24 / 30);
        const parsedDays = Math.floor(delaiTotal / 1000 / 60 / 60 / 24);
        const parsedHours = Math.floor(delaiTotal /1000 / 60 / 60);
        const parsedMinutes = Math.floor((delaiTotal / 1000 / 60));
        const parsedSeconds = Math.floor(delaiTotal/ 1000);
        if(parsedYears>0) return parsedYears + ((parsedYears===1)? " an" : " ans");
        else if(parsedMonths>0) return parsedMonths + " mois";
        else if(parsedDays>0) return parsedDays + ((parsedDays===1)? " jour" : " jours");
        else if(parsedHours>0) return parsedHours + ((parsedHours===1)? " heure" : " heures");
        else if(parsedMinutes>0) return parsedMinutes + ((parsedMinutes===1)? " minute" : " minutes");
        else return parsedSeconds + ((parsedSeconds===1)? " seconde" : " secondes");
    }

    //Pour l'ouverture / fermeture de la boîte de dialogue permettant de créer un nouveau commentaire

    const [commentaire, setCommentaire] = React.useState("");
    const [erreurTexte, setErreurTexte] = React.useState("");

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


    return (
        //Contenu de la page
        <Stack
            direction="column"
            spacing={2}
            padding={2}
            alignItems="center"
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
                    image={description.image}
                    tags={description.tags}
                    titre={description.titre}
                    texteDescription={description.description}
                    like={like}
                    setLike={setLike}
                    isCommu={true}
                >
                    {/*auteur, temps et nbCommentaires*/}
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

                        {/*temps*/}
                        <Typography variant="body2">
                            Il y a {delai(description.date)}
                        </Typography>

                        {/*nombre de commentaires*/}
                        <Stack direction="row" spacing={3}>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                                <Typography variant="body2">
                                    {commentaires.length}
                                </Typography>
                            </Stack>
                            <Link href={"#"} variant="body2">
                                Voir les commentaires
                            </Link>
                        </Stack>
                    </Stack>
                </CardDescription>

                {/*Bouton de retour*/}
                <Button variant="contained" sx={{backgroundColor: "gray", alignContent:"center"}}>
                    <Typography className = "cancel" >
                        Retour
                    </Typography>
                    <KeyboardReturnIcon />
                </Button>

                {/*liste de commentaires*/}
                <Stack alignItems="center" spacing={2} width="100%" >
                    <CardList>
                        {/*Attente des commentaires*/}
                        Commentaires en attente
                    </CardList>


                    <Pagination count={Math.ceil(commentaires.length/5)}/>
                </Stack>

                <Divider orientation="horizontal" flexItem={true}/>

                {/*bloc de création de recette*/}
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