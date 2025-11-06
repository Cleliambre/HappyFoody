import Stack from "@mui/material/Stack";
import CardDescription from "./CardDescription";
import {Avatar, Button, Link, Typography} from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import React from "react";
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
            </Stack>

            {/*liste de commentaires*/}
            <Stack>
                <CardList>
                    {/*Attente des commentaires*/}
                    Commentaires en attente
                </CardList>
            </Stack>

        </Stack>
    );
}