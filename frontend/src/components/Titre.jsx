import {Stack, Typography} from "@mui/material";
import React from "react";

export default function Titre({text, alignItems='start'}){
    return(
        <Stack
            alignItems={alignItems}
            width={"80%"}
            maxWidth = "900px"
            spacing={1}
        >
            <Typography variant="h4" sx={{fontWeight: 700}}>
                {text}
            </Typography>
        </Stack>
    );
}