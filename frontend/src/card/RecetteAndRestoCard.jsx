import * as React from "react";
import Typography from "@mui/material/Typography";
import GenericCard from "./GenericCard";

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export default function RecetteAndRestoCard({imageURL, title, nbFavori=0, isFavorite = false, rate = 0, description})
{
    let text = <React.Fragment>
        <Typography
            content="text"
            component="div"
            sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
            {rate}
            <StarOutlinedIcon fontSize="small" className="Star"/>
        </Typography>
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