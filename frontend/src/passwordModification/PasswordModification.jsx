import React from 'react';
import './PasswordModification.css'
import {Typography, TextField, Button, Link} from '@mui/material';
import Stack from "@mui/material/Stack";

export default function PasswordModification() {
    return (
        <div className="passwordModification-content">
            <Typography
                variant="h3"
                color = "textSecondary"
                className="titre"
                margin = "20px"
            >
                Modification du mot de passe
            </Typography>
            <Stack
                spacing={2}
                width="80%"
                maxWidth="600px"
            >
                <Stack spacing={0.5} alignItems="start">
                    <TextField
                        fullWidth
                        id="ancienMdp"
                        label="Ancien mot de passe"
                        type="password"
                        autoComplete="current-password"
                    />
                    {/*"#" à remplacer avec l'url de la page d'accueil*/}
                    <Link href="#" className = 'lien-mdp'>Mot de passe oublié ?</Link>
                </Stack>
                <TextField
                    fullWidth
                    id="nouvMdp"
                    label="Nouveau mot de passe"
                    type="password"
                    autoComplete="off"
                />
                <TextField
                    fullWidth
                    id="nouvMdp2"
                    label="Validation du nouveau mot de passe"
                    type="password"
                    autoComplete="off"
                />
            </Stack>

            <Stack
                spacing={2}
                width="25%"
                margin="20px"
            >
                <Button
                    variant="contained"
                    color="primary"
                    size = "large"
                    sx={{borderRadius:'30px'}}
                >
                    Enregistrer
                </Button>
                <Button
                variant="contained"
                color="primary"
                size = "large"
                sx ={{borderRadius:'30px'}}
                >
                    Annuler
                </Button>
            </Stack>

        </div>
    );
}