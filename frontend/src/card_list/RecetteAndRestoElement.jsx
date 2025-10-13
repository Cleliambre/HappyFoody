import * as React from "react";
import "./Card.css"

import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/StarOutlined';

export default function RecetteAndRestoElement({rate, description})
{
    return(
        <React.Fragment>

            {/* Note */}
            <div className="align-text-icon">
                <Typography variant="text" className="sub-description">
                    {rate}
                </Typography>
                <StarIcon fontSize="small" className="star"/>
            </div>

            {/* Description */}
            <Typography variant="text" className="description">
                {description}
            </Typography>

        </React.Fragment>);
}