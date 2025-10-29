import React from 'react';
import './Inscription.css'
import {Typography, TextField, Button, Link} from '@mui/material';

//TO DO : interdire les @ dans le pseudo + limite de 30 caractères dans le pseudo + obligation de @ dans l'email

export default function Inscription() {
    return (
        <div className="inscription-content">
            <Typography variant="h3" color="textSecondary" className = "titre">
                Inscription
            </Typography>
            <div className="inputs-group">
                <div className="input1">
                    <div className="input-container">
                        <TextField
                            className = "input-content"
                            id="pseudo"
                            label="Pseudo"
                            variant="outlined"
                        />
                    </div>
                    <div className="input-container">
                        <TextField
                            className = "input-content"
                            id="email"
                            label="Adresse mail"
                        />
                    </div>
                </div>
                <div className="input2">
                    <div className="input-container">
                        <TextField
                            className = "input-content"
                            id="mdp"
                            label="Mot de passe"
                            type="password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="input-container">
                        <TextField
                            className = "input-content"
                            id="mdp2"
                            label="Validation du mot de passe"
                            type="password"
                            autoComplete="current-password"
                        />
                    </div>
                </div>
            </div>
            <div className="validation-group">
                <Button
                    className = "bouton"
                    variant="contained"
                    color="primary"
                    size = "large"
                    sx ={{borderRadius:'30px'}}>
                    Valider
                </Button>
                <Typography
                    className="inscription-link"
                    variant="body3"
                    color="textSecondary">
                    Vous avez un compte ? <Link href="#"> Connectez-vous. </Link>
                </Typography>
            </div>

        </div>
    );
}