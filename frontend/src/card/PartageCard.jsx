import * as React from "react";

import Typography from '@mui/material/Typography';
import GenericCard from "./GenericCard";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

export default function PartageCard2({imageURL, title, nbFavori=0, isFavorite = false,description, pseudo, confiance = 0})
{
    let confianceLogo = [];
    for(let i=0; i<confiance; i++){
        confianceLogo.push(<ThumbUpOutlinedIcon/>)
    }
    let text = <React.Fragment>
        {pseudo}
        {confianceLogo.map(icon => icon)}
        <Typography content="text" className="TextDescription">
            {description}
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