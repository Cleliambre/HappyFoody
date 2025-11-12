import CreationComm from "../CreationComm";
import iconHappyFoody from "../../menu/HappyFoodyIcon.png";
import Stack from "@mui/material/Stack";

export function TestTypeCommentaire() {

    const currentProfil = {
        username: "Happy Foody",
        userImageUrl: iconHappyFoody,
        scoreConfiance: 3
    };

    return (
        <Stack spacing={2}>
            <h1>Recette</h1>
            <CreationComm currentProfil={currentProfil} typeCommentaire="recette"/>

            <h1>Restaurant</h1>
            <CreationComm currentProfil={currentProfil} typeCommentaire="restaurant"/>

            <h1>Communauté</h1>
            <CreationComm currentProfil={currentProfil} typeCommentaire="communaute"/>

            <h1>Partage</h1>
            <CreationComm currentProfil={currentProfil} typeCommentaire="partage"/>
        </Stack>
    );
}