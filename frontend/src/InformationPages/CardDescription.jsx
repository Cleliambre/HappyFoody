import {Stack, Card, CardMedia, Typography, Divider, Chip, CardContent, IconButton, Collapse, CardActions} from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

export default function CardDescription({image, tags, titre, texteDescription, onTagClick, like, setLike, children}){

    // Formatage du compteur de likes (ex: 1000 → "1K")
    const formatLikes = (num) => {
        if (num >= 1_000_000) return Math.floor(num / 1_000_000) + 'M';
        if (num >= 1_000) return Math.floor(num / 1_000) + 'K';
        return num.toString();
    };

    const handleLike = () => {
        setLike({liked : !like.liked,
                nb : like.liked ? like.nb-1:like.nb+1});
    };

    const [isExpanded, setExpanded] = React.useState(false);

    const handleExpandMore = () => {setExpanded(!isExpanded);};

    return (
        //Contenu de la page

        /*Boîte de description*/
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
                    {/*contenu de la description*/}
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

                        {/*titre, auteur, note, description et tags*/}
                        <Stack
                            direction="column"
                            minHeight={"200px"}
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
                                    flexWrap= "wrap"
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
                        </Stack>

                    </Stack>

                    {/*Favori*/}
                    <Stack>
                        <IconButton onClick={handleLike}>
                            {like.liked ? <FavoriteOutlinedIcon color="error"/> : <FavoriteBorderOutlinedIcon/>}
                        </IconButton>
                        <Typography variant="body2" lineHeight={0}>
                            {formatLikes(like.nb)}
                        </Typography>
                    </Stack>
                </CardContent>
                <Divider />
                <CardActions sx={{justifyContent:"space-between"}}>
                    <Typography variant="h6" color="textSecondary">
                        Catégories
                    </Typography>
                    <IconButton onClick={handleExpandMore}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={isExpanded}>
                    <Stack direction="row" flexWrap="wrap" gap={1} margin="10px">
                        {tags.map((tag) => (
                            <Chip label={tag.label} color={tag.color} onClick={onTagClick}/>
                        ))}
                    </Stack>
                </Collapse>
            </Card>
    );
}