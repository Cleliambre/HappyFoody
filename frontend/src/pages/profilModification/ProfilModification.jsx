import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import "./ProfilModification.css"
import {Typography, Avatar, Stack, TextField, Button, Badge, InputAdornment, IconButton} from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import axios from "axios";

export default function ProfilModification(){

    //Changement du titre de la page sur l'onglet du navigateur
    useEffect(() => {
        document.title = "Modification de profil - Happy Foody";
    }, [])

    const [compte, setCompte] = React.useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const idCompte = localStorage.getItem('idCompte');
        if (!idCompte) {
            navigate('/connexion');
            return;
        }

        fetch(`http://localhost:8080/api/compte/getCompteById/${idCompte}`)
            .then(res => res.json())
            .then(data => setCompte(data));

    }, [navigate]);


    const [pseudo, setPseudo] = React.useState(compte?.pseudo || "");
    const [pp, setPP] = React.useState(compte?.urlImage || "");
    const [description, setDescription] = React.useState(compte?.description || "");
    const [email, setEmail] = React.useState(compte?.mail || "");
    const [mdp, setMdp] = React.useState(compte?.password || "");

    useEffect(() => {
        if (compte) {
            setPseudo(compte.pseudo);
            setPP(compte.urlImage);
            setDescription(compte.description);
            setEmail(compte.mail);
            setMdp(compte.password);
        }

    }, [compte]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Aperçu local
            setPP(URL.createObjectURL(file));

            // Envoi au backend
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post("http://localhost:8080/api/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // Récupère l'URL persistante renvoyée par le backend
                setPP(response.data.url);
                console.log("URL de l'image reçue :", response.data.url);

            } catch (err) {
                console.error("Erreur d'upload :", err);
            }
        }
    };

    const handleSubmit = async () => {
        //Validation basique
        if(!compte) return;

        if (!pseudo || !email || !mdp) {
            alert("Champs non remplis");
            return;
        }

        try{
            //Appel du backend
            const newCompte = {
                pseudo : pseudo,
                mail : email,
                password: mdp,
                urlImage: pp,
                description: description,
                scoreConfiance: 0
            };

            const response = await axios.put(`http://localhost:8080/api/compte/updateCompte/${compte.idCompte}`, newCompte);

        }catch(error){
            console.error("Erreur lors de la mise à jour du compte :", error)
        }
    }

    return(
        <div className="profilModification-content">
            <Typography
                variant="h3"
                color="textSecondary"
                margin="20px"
            >
                Modifier le profil
            </Typography>
            <Badge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                className="badge"
                badgeContent=
                    {<IconButton onClick={() => document.getElementById("image-upload").click()}>
                        <Avatar sx={{backgroundColor : "whiteSmoke",color : "black"}}>
                            <ModeEditOutlinedIcon/>
                        </Avatar>
                    </IconButton>}
            >
                <Avatar
                    src={pp}
                    className="profil-avatar"
                    sx={{width:150, height:150}}
                />
            </Badge>
            {/*champ proposant à l'utilisateur d'importer une image*/}
            <input
                type="file"
                id="image-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
            />
            <Stack spacing={2} className="inputs"
            >
                <TextField
                    fullWidth
                    id="pseudo"
                    label="Pseudo"
                    variant="outlined"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="description"
                    label="Bio/description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="email"
                    label="Adresse mail"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    disabled
                    id = "mdp"
                    type = "password"
                    label="Mot de passe"
                    variant="outlined"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <div>
                                        <Button
                                            variant="contained"
                                            sx ={{borderRadius:'30px'}}
                                            onClick={() => {navigate('/modificationMotDePasse')}}
                                        >
                                            Modifier
                                        </Button>
                                    </div>
                                </InputAdornment>
                            ),
                        },
                    }}
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}

                />

            </Stack>
            <Stack spacing={2} className="buttons">
                <Button
                    variant="contained"
                    color="primary"
                    size = "large"
                    sx ={{borderRadius:'30px'}}
                    onClick={handleSubmit}
                >
                    Enregistrer
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size = "large"
                    sx ={{borderRadius:'30px'}}
                    onClick={() => {navigate(`/profil/${compte.pseudo}`)}}
                >
                    Annuler
                </Button>
            </Stack>
        </div>
    );
}