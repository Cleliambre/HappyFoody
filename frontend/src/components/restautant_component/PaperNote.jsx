import {Paper, Typography} from "@mui/material";
import {getSmileys} from "../smiley_rating/getSmileys";
import React from "react";

export function PaperNote({text, note, isGlobal}) {
    return (
        <Paper elevation={2}
               sx={{padding:2,
                   alignItems:'center',
                   alignContent:'center',
                   display:'flex',
                   flexDirection: 'column',
                   minWidth: isGlobal ? '70%' : '200px',
               }}
        >
            <Typography variant={isGlobal ? "h5" : "h6"} sx={{fontWeight: 700}}>
                {text}
            </Typography>
            <Typography variant="body3"
                        sx={{
                            alignItems:'center',
                            alignContent:'center',
                            display:'flex',
                            gap:'3px'
                        }}
            >
                {getSmileys(note).icon}{Number(note).toFixed(1)}{"/5"}
            </Typography>
        </Paper>
    );
}