import React, {useState, useEffect} from 'react';
import './Inscription.css'
import {Typography, TextField, Button, Link} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

//TO DO : interdire les @ dans le pseudo + limite de 30 caractères dans le pseudo + obligation de @ dans l'email

export default function Inscription() {

    //Changement du titre de la page sur l'onglet du navigateur
    useEffect(() => {
        document.title = "Inscription - Happy Foody";
    }, [])

    useEffect(() => {
        const idCompte = localStorage.getItem('idCompte');
        if (idCompte) {
            window.location.href = '/profil';
        }
    }, []);

    //Etat de départ des champs
    const [pseudo, setPseudo] = useState('');
    const  [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        //Validation basique
        if (!pseudo || !email || !password || !password2) {
            setMessage("Veuillez remplir tous les champs obligatoires !");
            return;
        }

        if (pseudo.includes("@")){
            setMessage("Le symbole @ est interdit dans le pseudo");
            return;
        }

        if (pseudo.includes("deletedUser")){
            setMessage("deletedUser est interdit dans le pseudo");
            return;
        }

        if (!(email.includes("@"))){
            setMessage("Le symbole @ est obligatoire dans le mail");
            return;
        }

        if (password !== password2) {
            setMessage("Les mots de passe ne correspondent pas !");
            return;
        }

        const responseComptes = await axios.get("http://localhost:8080/api/compte/all");
        const comptes = responseComptes.data;
        let isSamePseudo = false;
        let isSameMail = false;
        comptes.map(compte => {
            if(pseudo === compte.pseudo){
                setMessage("Ce pseudo est déjà utilisé");
                isSamePseudo = true;
            }
            if(email === compte.mail){
                setMessage("Ce mail est déjà utilisé");
                isSameMail = true;
            }
        })
        if(isSamePseudo || isSameMail) return ;

        try{
            //Appel du backend
            const newCompte = {
                pseudo : pseudo,
                mail : email,
                password: password,
                urlImage: null,
                description: null,
                scoreConfiance: 0
            };

            const response = await axios.post("http://localhost:8080/api/compte/createCompte", newCompte)
            setMessage("Compte crée avec succès !");

            // Optionnel : vider le formulaire
            setPseudo('');
            setEmail('');
            setPassword('');
            setPassword2('');

        }catch(error){
            console.error("Erreur lors de la création du compte :", error);
            setMessage("Erreur lors de l'inscription. Veuillez réessayer")
        }
    }

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
                            value={pseudo}
                            onChange={(e)=>setPseudo(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <TextField
                            className = "input-content"
                            id="email"
                            label="Adresse mail"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <TextField
                            className = "input-content"
                            id="mdp2"
                            label="Validation du mot de passe"
                            type="password"
                            autoComplete="current-password"
                            value={password2}
                            onChange={(e)=>setPassword2(e.target.value)}
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
                    sx ={{borderRadius:'30px'}}
                    onClick={handleSubmit}
                >
                    Valider
                </Button>
                {message && (
                    <Typography
                        variant="body2"
                        color={message.includes("succès") ? "green" : "red"}
                        style={{ marginTop: "10px" }}
                    >
                        {message}
                    </Typography>
                )}
                <Typography
                    className="inscription-link"
                    variant="body3"
                    color="textSecondary">
                    {"Vous avez un compte ? "}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate("/connexion")}
                    > Connectez-vous. </Link>
                </Typography>
            </div>
        </div>
    );
}