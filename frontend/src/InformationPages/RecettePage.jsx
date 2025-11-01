import {Stack, Card, CardMedia, Box, Typography, Divider, Avatar, Chip, Link, CardContent} from "@mui/material";
import taboule from "../images/taboule.png"
import berserk from "../images/berserk.jpg"
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import React from "react";
import CardDescription from "./CardDescription";

export default function RecettePage(){
    const [description, setDescription] = React.useState({
        image : taboule,
        titre: "Taboulé",
        auteur: "ProDuTaboulé",
        pp: berserk,
        note : 3.5,
        description : "Un très bon taboulé, très frais et aérien.",
        nbLike : 120,
        tags : [{label : "végétarien", color : "success"}]
    });

    return (
        <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            padding={2}
        >
            <CardDescription
                image={taboule}
                tags={description.tags}
                titre={description.titre}
                texteDescription={description.description}
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
        </Stack>
    );
}