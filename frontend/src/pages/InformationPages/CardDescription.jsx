import React from "react";

import {
    Stack,
    Card,
    CardMedia,
    Typography,
    Divider,
    Chip,
    CardContent,
    IconButton,
    Collapse,
    CardActions
} from "@mui/material";

// Icons
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

export default function CardDescription(
    {
        image,
        tags,
        titre,
        texteDescription,
        onTagClick,
        like=0,
        handleLike,
        isCommu = false,
        children
    }) {

    // Formatage du compteur de likes (ex: 1000 → "1K")
    const formatLikes = (num) => {
        if (num >= 1_000_000) return Math.floor(num / 1_000_000) + 'M';
        if (num >= 1_000) return Math.floor(num / 1_000) + 'K';
        return num.toString();
    };

    const [isExpanded, setExpanded] = React.useState(false);
    const handleExpandMore = () => {setExpanded(!isExpanded);};

    return (
            <Card
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                <CardContent
                    sx={{width:'95%', display:"flex", justifyContent:"space-between"}}
                >
                    {/*contenu de la carte*/}
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="start"
                    >
                        {/*image*/}
                        <CardMedia
                            component="img"
                            image={image}
                            sx={{width:"200px", height:"200px"}}
                        />

                        {/*contenu de la carte*/}
                        <Stack
                            direction="column"
                            minHeight={"200px"}
                            justifyContent="space-between"
                        >


                            {/*Partie centrale : titre, auteur, note, description */}
                            <Stack
                                direction="column"
                                minHeight={"200px"}
                                justifyContent="space-between"
                            >
                                {/*titre, auteur, note, description*/}
                                <Stack
                                    direction="column"
                                    spacing={2}
                                    alignItems={"sart"}
                                >
                                {/*titre*/}
                                <Typography variant="h3">
                                    {titre}
                                </Typography>

                                {/*auteur, note + divider*/}
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    flexWrap= "wrap"
                                >
                                    <Divider orientation="vertical" flexItem/>
                                    {/*auteur, note*/}
                                        {children}
                                </Stack>
                            </Stack>

                                    {/*Description*/}
                                    <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'pre-line' }}>
                                        {texteDescription}
                                    </Typography>
                            </Stack>
                            {/*Bouton répondre, si c'est un post de communauté*/}
                            {isCommu ? <Chip
                                label={
                                    <Stack direction="row" spacing={1}>
                                        <ChatBubbleOutlineOutlinedIcon size="small"/>
                                        <Typography variant="body1">Répondre</Typography>
                                    </Stack>}
                                color="primary"
                                onClick={onTagClick}

                            /> :  <React.Fragment/>}
                        </Stack>
                    </Stack>

                        {/*Partie Favori*/}
                        <Stack sx={{alignItems:'center'}}>
                            <IconButton onClick={handleLike}>
                                {like.liked ? <FavoriteOutlinedIcon color="error"/> : <FavoriteBorderOutlinedIcon/>}
                            </IconButton>
                            <Typography variant="body2" lineHeight={0}>
                                {formatLikes(like.nb)}
                            </Typography>
                        </Stack>

                </CardContent>
                <Divider />

                {/* Catégories (tags) (s'affiche seulement s'il y a des tags)*/}
                { (!(tags===undefined || tags === null) && tags.length > 0) ?
                    <CardActions sx={{justifyContent: "space-between"}}>
                        <Typography variant="h6" color="textSecondary">
                            Catégories
                        </Typography>
                        <IconButton onClick={handleExpandMore}>
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardActions> : <React.Fragment/>
                }

                {/* Tags (s'affiche seulement s'il y a des tags) */}
                {(!(tags === undefined || tags === null) && tags.length > 0) ?
                    <Collapse in={isExpanded}>
                        <Stack direction="row" flexWrap="wrap" gap={1} margin="10px">
                            {tags.map((tag) => (
                                <Chip label={tag.nom} color="success"/>
                            ))}
                        </Stack>
                    </Collapse> : <React.Fragment/>
                }
            </Card>
    );
}
