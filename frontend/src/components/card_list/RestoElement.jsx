import * as React from "react";
import "./Card.css"

import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";
import {getSmileys} from "../smiley_rating/getSmileys";

export default function RestoElement(
    {
        rate,
        description,
        tags_lieu = [],
        tags_nourriture = []
    }
) {
    const smiley = rate == null || rate === 0 ? getSmileys(0) : getSmileys(rate);

    return(
        <React.Fragment>

            {/* Note */}
            <div className="align-text-icon">
                {smiley.icon}
                <Typography variant="body2" className="small-font">
                    {smiley.label}
                </Typography>
            </div>

            {/* Description */}
            <Typography variant="text" className="description">
                {description}
            </Typography>

            {/* Tags */}
            <div className="tags">
                {tags_lieu.map((tag) =>
                    <Chip color="primary" label={tag.nom} sx={{ boxShadow: 2 }}/>
                )}
                {tags_nourriture.map((tag) =>
                    <Chip color="success" label={tag.nom} sx={{ boxShadow: 2 }}/>
                )}
            </div>

        </React.Fragment>);
}
