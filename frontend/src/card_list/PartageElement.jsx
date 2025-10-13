import * as React from "react";
import "./Card.css"

import Typography from '@mui/material/Typography';
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined";

export default function PartageElement({pseudo, confiance, description})
{
    // Score de confiance
    let confianceLogo = [];
    for(let i=0; i<confiance; i++){
        confianceLogo.push(<ThumbUpIcon fontSize="small"/>)
    }

    return(<React.Fragment>

        {/* Pseudo et score de confiance */}
        <div className="align-text-icon">
            <Typography variant="text" className="sub-description">
                {pseudo}
            </Typography>
            {confianceLogo.map(icon => icon)}
        </div>

        {/* Description */}
        <Typography variant="text" className="description">
            {description}
        </Typography>

    </React.Fragment>);
}