import React from 'react';
import './ForgottenPassword.css'
import {Typography, TextField, Button, Link} from '@mui/material';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


export default function ForgottenPassword() {
    return (
        <div className="fpassword-content">
            <div className="titre-group">
                <Typography variant="h3" color="textSecondary" className = "titre">
                    Mot de passe oublié
                </Typography>
                <Button variant="contained" className="cancel-btn" onClick={() => {}}>
                    <Typography className = "cancel">
                        Retour
                        <KeyboardReturnIcon />
                    </Typography>
                </Button>
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