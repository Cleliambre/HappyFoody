import React, {useState} from 'react';
import './PasswordModification.css'
import {Typography, TextField, Button, Alert} from '@mui/material';
import Stack from "@mui/material/Stack";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function PasswordModification() {
    const [ancienMdp, setAncienMdp] = useState('');
    const [nouvMdp, setNouvMdp] = useState('');
    const [nouvMdp2, setNouvMdp2] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // Id de l'utilisateur connecté (stocké après login)
    const userId = localStorage.getItem('idCompte');
    const token = localStorage.getItem('token');

    const handlePasswordChange = async () => {
        if (!ancienMdp || !nouvMdp || !nouvMdp2) {
            setError(true);
            setMessage("Tous les champs doivent être remplis.");
            return;
        }

        if (nouvMdp !== nouvMdp2) {
            setError(true);
            setMessage("Les nouveaux mots de passe ne correspondent pas.");
            return;
        }

        if (!userId) {
            setError(true);
            setMessage("Utilisateur non authentifié.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/compte/updatePassword/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` })
                },
                body: JSON.stringify({
                    oldPassword: ancienMdp,
                    newPassword: nouvMdp
                })
            });

            const result = await response.text(); // ton contrôleur renvoie une String

            if (response.ok && result.includes("succès")) {
                setError(false);
                setMessage(result);
                setTimeout(() => navigate("/profil"), 1000); // redirection après 2s
            } else {
                setError(true);
                setMessage(result || "Erreur lors de la modification du mot de passe.");
            }
        } catch (err) {
            setError(true);
            setMessage("Impossible de se connecter au serveur.");
            console.error(err);
        }
    };

    const handleCancel = () => {
        navigate('/profil');
    };

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

            {message && (
                <Alert severity={error ? "error" : "success"} sx={{ width: '80%', maxWidth: '600px', marginBottom: 2 }}>
                    {message}
                </Alert>
            )}

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
                        value={ancienMdp}
                        onChange={(e) => setAncienMdp(e.target.value)}
                        autoComplete="current-password"
                    />
                    {/*"#" à remplacer avec l'url de la page d'accueil*/}
                    <Link to={"/oublieMotDePasse"} className = 'lien-mdp'>Mot de passe oublié ?</Link>
                </Stack>
                <TextField
                    fullWidth
                    id="nouvMdp"
                    label="Nouveau mot de passe"
                    type="password"
                    value={nouvMdp}
                    onChange={(e) => setNouvMdp(e.target.value)}
                    autoComplete="off"
                />
                <TextField
                    fullWidth
                    id="nouvMdp2"
                    label="Validation du nouveau mot de passe"
                    type="password"
                    value={nouvMdp2}
                    onChange={(e) => setNouvMdp2(e.target.value)}
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
                    onClick={handlePasswordChange}
                >
                    Enregistrer
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size = "large"
                    sx ={{borderRadius:'30px'}}
                    onClick={handleCancel}
                >
                    Annuler
                </Button>
            </Stack>

        </div>
    );
}