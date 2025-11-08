import React, {useEffect, useState} from 'react';
import './Profil.css'
import {Typography, Button, Avatar, Tab, Stack, Container} from '@mui/material';
import  {TabContext, TabList, TabPanel} from '@mui/lab'
import CardList from "../../components/card_list/CardList";
import {useParams, useNavigate, useLocation} from "react-router-dom";

export default function Profil() {
    const {pseudo} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = React.useState('1');
    const [compte, setCompte] = useState(null);
    const [compteConnecte, setCompteConnecte] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {document.title = "Profil - Happy Foody"}, [])

    // 🔹 Récupération du compte connecté s’il y en a un
    useEffect(() => {
        const idCompte = localStorage.getItem('idCompte');

        if (!idCompte) {
            // Si on est sur /profil (pas de pseudo) et pas connecté → redirige vers /connexion
            setCompteConnecte(null);
            return;
        }

        // Récupère le compte connecté
        fetch(`http://localhost:8080/api/compte/getCompteById/${idCompte}`)
            .then(async res => {
                const text = await res.text();
                return text ? JSON.parse(text) : null;
            })
            .then(data => {
                setCompteConnecte(data);
            })
            .catch(err => console.error("Erreur de récupération du compte connecté :", err));
    }, []);



    // 🔹 Gestion des redirections et récupération du profil
    useEffect(() => {
        const handleProfil = async () => {
            // Si on est sur /profil sans pseudo
            if (!pseudo) {
                const idCompte = localStorage.getItem('idCompte');
                if (!idCompte) {
                    // Pas connecté → redirige une seule fois
                    if (location.pathname !== '/connexion') {
                        navigate('/connexion', { replace: true });
                    }
                    return;
                }

                // Si connecté mais sans pseudo → attend d’avoir les infos du compte
                if (compteConnecte?.pseudo) {
                    const target = `/profil/${compteConnecte.pseudo}`;
                    if (location.pathname !== target) {
                        navigate(target, { replace: true });
                    }
                }
                return;
            }

            // Sinon on est sur /profil/pseudo → on va chercher le profil correspondant
            try {
                const res = await fetch(`http://localhost:8080/api/compte/getCompteByPseudo/${pseudo}`);
                if (!res.ok) {
                    setCompte(null);
                    setIsLoading(false);
                    return;
                }

                const text = await res.text();
                const data = text ? JSON.parse(text) : null;
                setCompte(data);
            } catch (err) {
                console.error("Erreur de récupération du profil :", err);
                setCompte(null);
            } finally {
                setIsLoading(false);
            }
        };

        handleProfil();
        // ✅ dépend seulement de pseudo et compteConnecte.pseudo
    }, [pseudo, compteConnecte?.pseudo, navigate, location.pathname]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('idCompte');
        window.location.href = '/connexion';
    };

    if (isLoading) return <div>Chargement...</div>;
    if (!compte) return <div>Profil introuvable.</div>;

    //Vérifie si on affiche son propre profil
    const isOwnProfile = compteConnecte?.pseudo === compte.pseudo;

    return (
        <div className="profil-content">
            <Typography variant="h3" color="textSecondary">
                Profil
            </Typography>
            <Container sx={{width: '80%'}}>
                <div className="profil-description">
                    <Avatar src={compte.urlImage} className="profil-avatar" sx={{width:150, height:150}}/>
                    <div className="profil-description-text">
                        <Typography variant="h4" color="textPrimary">
                            {compte.pseudo}
                        </Typography>
                        <Typography variant="h5" color="textPrimary">
                            {compte.description}
                        </Typography>
                    </div>
                </div>

                {isOwnProfile && (
                    <Stack
                        className="profil-buttons"
                        spacing={2}
                    >
                        <Button variant="outlined" className = "modif">
                            Modifier le profil
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleLogout}>
                            Déconnexion
                        </Button>
                    </Stack>
                )}
            </Container>

            <div className = "parutions">
                <TabContext
                    value={value}
                >
                    <TabList onChange={handleChange}>
                        <Tab value ="1" label="Mes recettes"/>
                        <Tab value ="2" label="Mes posts"/>
                        <Tab value = "3" label="Mes partages"/>
                    </TabList>
                    <TabPanel value="1" className="tab-content">
                        <CardList/>
                    </TabPanel>
                    <TabPanel value="2" className="tab-content">
                        Item Two
                    </TabPanel>
                    <TabPanel value="3" className="tab-content">
                        Item Three
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );

}