import * as React from "react";
import "./Card.css"

import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/StarOutlined';
import {Chip} from "@mui/material";

export default function RecetteAndRestoElement(
    {rate, description,
    tags_lieu=[], tags_nourriture=[]})
{
    return(
        <React.Fragment>

            {/* Note */}
            <div className="align-text-icon">
                <Typography variant="text" className="small-font">
                    {rate.toFixed(1)}
                </Typography>
                <StarIcon fontSize="small" className="star"/>
            </div>

            {/* Description */}
            <Typography variant="text" className="description">
                {description}
            </Typography>

            {/* Tags */}
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
