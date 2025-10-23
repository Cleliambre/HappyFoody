import React from 'react';
import './Connexion.css'
import {Typography, TextField, Button, Link} from '@mui/material';


export default function ConnexionContent() {
   return (
       <div className="connexion-content">
           <Typography variant="h3" color="textSecondary" className = "titre">
            Connexion à votre compte
           </Typography>

           <div className="input">
                <div className="input-container">
                   <TextField
                       className = "input-content"
                       id="adresse-mail"
                       label="Adresse mail"
                       variant="outlined"
                   />
                </div>
                <div className="input-container">
                   <TextField
                       className = "input-content"
                       id="mdp"
                       label="Mot de passe"
                       type="password"
                       autoComplete="current-password"
                   />
                   {/*"#" à remplacer avec l'url de la page d'accueil*/}
                   <Link href="#" className = 'lien-mdp'>Mot de passe oublié ?</Link>
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
                   Pas de compte ? <Link href="#"> Inscrivez-vous. </Link>
               </Typography>
           </div>

    </div>
   );
}