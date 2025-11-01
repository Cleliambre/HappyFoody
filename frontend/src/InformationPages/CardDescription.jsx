import {Stack, Card, CardMedia, Box, Typography, Divider, Avatar, Chip, Link, CardContent} from "@mui/material";
import taboule from "../images/taboule.png"
import berserk from "../images/berserk.jpg"
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import React from "react";

export default function CardDescription({image, tags, titre, texteDescription, onTagClick, children}){

    return (
        //Contenu de la page

        /*Boîte de description*/
            <Card
                sx={{
                    display: "flex",
                    width : "80%",
                    maxWidth : "900px"
                }}
            >
                <CardContent>
                    {/*contenu de la description*/}
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        {/*image*/}
                        <CardMedia
                            component="img"
                            image={image}
                            sx={{width:"250px", height:"250px"}}
                        />

                        {/*titre, auteur, note, description et tags*/}
                        <Stack
                            direction="column"
                            minHeight={"250px"}
                            justifyContent="space-between"
                        >
                            {/*titre, auteur, note, description*/}
                            <Stack
                                direction="column"
                                spacing={2}
                                alignItems="start"
                            >
                                {/*titre*/}
                                <Typography variant="h3">
                                    {titre}
                                </Typography>

                                {/*auteur, note + divider*/}
                                <Stack
                                    direction="row"
                                    spacing={2}
                                >
                                    <Divider orientation="vertical" flexItem/>
                                    {/*auteur, note*/}
                                    <Stack
                                        direction="column"
                                        spacing={1}
                                    >
                                        {children}
                                    </Stack>
                                </Stack>
                                {/*Description*/}
                                <Typography variant="body2" color="textSecondary">
                                    {texteDescription}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                {tags.map((tag) => (
                                    <Chip label={tag.label} color = {tag.color} onClick={onTagClick}/>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
    );
}