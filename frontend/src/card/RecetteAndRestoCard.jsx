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
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import {Box} from "@mui/material";

export default function RCard({imageURL, title, nbFavori=0, isFavorite = false, description, tags, rate = 0}){
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
                            {rate}
                            <StarOutlinedIcon
                                className="Star"
                                fontSize="small"
                            />
                        </Typography>
                        <Typography
                            component="div"
                            textAlign="left"
                            variant="subtitle1"
                            flex="content"
                            className="TextDescription">
                            {description}
                        </Typography>
                    </CardContent>
                </Box>
            </CardActionArea>
            <Box>
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
