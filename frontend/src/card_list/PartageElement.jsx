import * as React from "react";
import "./Card.css"

import Typography from '@mui/material/Typography';
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined";
import {Chip} from "@mui/material";

export default function PartageElement(
    {pseudo, confiance, description,
    tags_partage,
    tags_lieu=["Lieu non défini"], tags_nourriture})
{
    // Score de confiance
    let confianceLogo = [];
    for(let i=0; i<confiance; i++){
        confianceLogo.push(<ThumbUpIcon fontSize="small"/>)
    }

    return(<React.Fragment>

        {/* Pseudo et score de confiance */}
        <div className="align-text-icon">
            <Typography variant="text" className="black-font">
                {pseudo}
            </Typography>
            {confianceLogo.map(icon => icon)}
        </div>

        {/* Description */}
        <Typography variant="text" className="description">
            {description}
        </Typography>

        {/* Tags Partage */}
        <div className="tags">
            {tags_partage.map((tag) =>
                <Chip color="default" label={tag} sx={{ boxShadow: 2 }}/>
            )}
        </div>

        {/* Tags Lieu et Nourriture */}
        <div className="tags">
            {tags_lieu.map((tag) =>
                <Chip color="primary" label={tag} sx={{ boxShadow: 2 }}/>
            )}
            {tags_nourriture.map((tag) =>
                <Chip color="success" label={tag} sx={{ boxShadow: 2 }}/>
            )}
        </div>


    </React.Fragment>);
}
