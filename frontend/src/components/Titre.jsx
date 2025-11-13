import {Stack, Typography} from "@mui/material";
import React from "react";

export default function Titre({text, id}){
    return(
        <Stack
            alignItems="start"
            width={"80%"}
            maxWidth = "900px"
            spacing={1}
            id={id}
        >
            <Typography variant="h4" sx={{fontWeight: 700}}>
                {text}
            </Typography>
        </Stack>
    );
}