import React, {useEffect} from 'react';
import './ForgottenPassword.css'
import {Typography, TextField, Button} from '@mui/material';
import ButtonReturn from "../../components/ButtonReturn";


export default function ForgottenPassword() {

    useEffect(() => {
        document.title = "Mot de passe oublié - Happy Foody";
        const timer = setTimeout(() => {
            alert("Il manque des fonctionnalités dans cette page.");
        }, 0);
    }, [])

    return (
        <div className="fpassword-content">
            <div className="titre-group">
                <Typography variant="h3" color="textSecondary" className = "titre">
                    Mot de passe oublié
                </Typography>

                <ButtonReturn
                    path="/connexion"
                    text="Retour à la connexion"
                />
            </div>
            <div className="input-container">
                    <TextField
                        className = "input-content"
                        id="email"
                        label="Adresse mail"
                        variant="outlined"
                    />
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
            </div>

        </div>
    );
}