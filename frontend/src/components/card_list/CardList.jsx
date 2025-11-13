import Stack from "@mui/material/Stack";
import {Container} from "@mui/material";
import React from "react";

export default function CardList({resMessage, children}){
    return (
        <Container>
            <p>{resMessage}</p>
            <Stack spacing={2}>
                {children}
            </Stack>
        </Container>
    );
}