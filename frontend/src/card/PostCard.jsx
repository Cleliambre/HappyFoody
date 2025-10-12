import * as React from "react";
import "./Card.css"

import Typography from '@mui/material/Typography';

//build a Card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";

//icons
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import {Box} from "@mui/material";

export default function PostCard({imageURL, title, nbFavori=0, isFavorite = false, description, nbCommentaire = 0, delai = 0, unite = "minute" }){
    return(
        <Card className="Carte">
            <CardActionArea
                sx={{display: 'flex',
                    maxWidth: '90%',
                }}
            >
                <CardMedia
                    component="img"
                    image={imageURL}
                    alt={title + " image"}
                    sx={{ width: 150}}
                />
                <Box className="Description">
                    <CardContent>
                        <Typography
                            component="div"
                            variant="h5"
                            textAlign="left"
                        >
                            {title}
                        </Typography>
                        <Typography
                            component="div"
                            variant="subtitle1"
                            textAlign="left"
                        >
                            Il y a {delai} {unite}
                        </Typography>
                        <Typography
                            component="div"
                            textAlign="left"
                            variant="subtitle1"
                            flex="content"
                            className="TextDescription">
                            {description}
                        </Typography>
                        <Typography
                            component="div"
                            variant="subtitle1"
                            textAlign="left"
                            flex="content"
                            className="TextDescription"
                        >
                            <ChatBubbleOutlineOutlinedIcon fontSize="small"/>
                            <Typography component="text">
                                {nbCommentaire >= 1000 ? (nbCommentaire - nbCommentaire % 1000 )/1000 + "k" : nbCommentaire}
                            </Typography>
                        </Typography>

                    </CardContent>
                </Box>
            </CardActionArea>
            <Box >
                <CardActions>
                    <IconButton aria-label="add to favorites" className="FavoriPart">
                        {isFavorite ? <FavoriteOutlinedIcon className="Favori" />: <FavoriteBorderOutlinedIcon/> }
                        <Typography component="text">
                            {nbFavori >= 1000 ? (nbFavori-nbFavori%1000)/1000 + "k" : nbFavori}
                        </Typography>
                    </IconButton>
                </CardActions>
            </Box>

        </Card>
    );
}