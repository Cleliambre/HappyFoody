import React, {useState} from 'react';
import './Connexion.css'
import {Typography, TextField, Button, Link} from '@mui/material';
import {useNavigate} from 'react-router-dom';


export default function ConnexionContent() {
    const [mailOrPseudo, setmailOrPseudo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8080/api/compte/login',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mailOrPseudo, password})
        });

        if(response.ok){
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('idCompte', data.idCompte);
            navigate('/profil');
        }
        else{
            alert("Identifiants incorrects")
        }
    };

    return (
       <div className="connexion-content">
           <Typography variant="h3" color="textSecondary" className = "titre">
            Connexion à votre compte
           </Typography>

           <div className="input">
                <div className="input-container">
                   <TextField
                       className = "input-content"
                       id="pseudoOrEmail"
                       value={mailOrPseudo}
                       label="Pseudo / adresse mail"
                       variant="outlined"
                       onChange={(e) => setmailOrPseudo(e.target.value)}
                   />
                </div>
                <div className="input-container">
                   <TextField
                       className = "input-content"
                       id="mdp"
                       value={password}
                       label="Mot de passe"
                       type="password"
                       autoComplete="current-password"
                       onChange={(e) => setPassword(e.target.value)}
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
                   sx ={{borderRadius:'30px'}}
                   onClick={handleLogin}>
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