import * as React from "react";

import "./Card.css"

import Typography from '@mui/material/Typography';
import GenericCard from "./GenericCard";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

export default function PostCard2({imageURL, title, nbFavori=0, isFavorite = false, description, nbCommentaire = 0, delai = 0, unite = "minute" })
{
    let text = <React.Fragment>
        <Typography content="text">
            Il y a {delai} {unite}
        </Typography>
        <Typography content="text" className="TextDescription">
            {description}
        </Typography>
        <Typography component="text">
            <ChatBubbleOutlineOutlinedIcon fontSize="small"/>
            {nbCommentaire >= 1000 ? (nbCommentaire - nbCommentaire % 1000 )/1000 + "k" : nbCommentaire}
        </Typography>
    </React.Fragment>
    return(
        <GenericCard
            imageURL={imageURL}
            title={title}
            nbFavori={nbFavori}
            isFavorite={isFavorite}
            descriptionText={text}
        >
        </GenericCard>);
}