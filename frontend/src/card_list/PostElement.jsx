import * as React from "react";
import "./Card.css"

import Typography from '@mui/material/Typography';
import CommentaireIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

export default function PostElement({delai, unite, description, nbCommentaire})
{
    // Formatage du compteur de commentaires (ex: 1000 -> "1K", 1000000 -> "1M")
    const formatNbCommentaires = (num) => {
        if (num >= 1_000_000) return Math.floor(num / 1_000_000) + 'M';
        if (num >= 1_000) return Math.floor(num / 1_000) + 'K';
        return num.toString();
    };

    return(
        <React.Fragment>

            {/* Temps */}
            <Typography variant="text" className="black-font">
                Il y a {delai} {unite}{delai>1 ? "s":""}
            </Typography>

            {/* Description */}
            <Typography variant="text" className="description">
                {description}
            </Typography>

            {/* Nombre de commentaires */}
            <div className="align-text-icon">
                <CommentaireIcon fontSize="small"/>
                <Typography variant="text" className="small-font">
                    {formatNbCommentaires(nbCommentaire)}
                </Typography>
            </div>

        </React.Fragment>);
}