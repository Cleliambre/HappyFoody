import React from "react";

import {

    // Carte
    Card, CardHeader, CardContent,

    // Component pour la carte
    Typography, Chip, Box,
    Rating,

    Link,

    // Dialog
    Dialog, DialogTitle, DialogContent,
    IconButton, Grid

} from "@mui/material";

// Icon
import CommIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ConfianceIcon from '@mui/icons-material/ThumbUpOutlined';
import CloseIcon from "@mui/icons-material/Close";
import {getSmileys, noteGenerale} from "../smiley_rating/getSmileys";
import PaperNote from "../restautant_component/PaperNote";
import ColorAvatar from "../ColorAvatar";
import {useNavigate} from "react-router-dom";

function CommElement({commentaire, section, onVoirDetails, notes}) {

    const renderSansNote = (
        <Typography variant="body2" color="text.disabled" sx={{fontStyle: "italic"}}>
            Aucune note
        </Typography>
    );

    // Element vide
    if (section === "communaute") {
        return null;
    }

    // Element de recette
    if (section === "recette") {
        if (commentaire.note == null) return renderSansNote;
        return <Rating size="small" value={commentaire.note} readOnly/>;
    }

    // Element de restaurant
    if (section === "restaurant") {
        if (notes.every(note => note.note == null)) {
            return renderSansNote;
        }

        return (
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>

                {getSmileys(noteGenerale(notes)).icon}

                {noteGenerale(notes) === 0 ? (
                    <Typography sx={{ color: "text.secondary", fontStyle: "italic" }}>
                        Sans avis
                    </Typography>
                ) : (
                    <Typography
                        component="button"
                        onClick={onVoirDetails}
                        sx={{
                            cursor: "pointer",
                            border: "none",
                            background: "none",
                            textDecoration: "underline",
                            color: "primary.main",
                            "&:hover": {
                                color: "primary.dark"
                            }
                        }}
                    >
                        Voir les détails de l'avis
                    </Typography>
                )}

            </Box>
        );
    }

    // Element de partage
    if (section === "partage") {
        return (
            <Box sx={{display: "flex", flexDirection: "row", gap: 0.5}}>
                {Array.from({length: commentaire.scoreConfiance}).map(() => (
                    <ConfianceIcon fontSize="small"/>
                ))}
            </Box>
        );
    }

    // Pas de section valide
    return (
        <Typography color="error">
            Erreur de section
        </Typography>
    );
}

export default function CommBlock({ commentaire, section, onRepondre, refAuteurRepondu="" }) {

    const navigate = useNavigate();

    const [openDetails, setOpenDetails] = React.useState(false);

    const handleVoirDetails = () => {
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    const delai = (date) => {
        let ts;
        if (typeof date === "number") {
            ts = date; // déjà en ms
        } else if (date instanceof Date) {
            ts = date.getTime();
        } else {
            // dateInput est probablement une string ISO
            ts = Date.parse(date); // renvoie ms ou NaN si invalide
        }


        const diff = Date.now() - ts;
        if (diff<0){
            return "ERROR";
        }

        const sec = Math.floor(diff / 1000);
        const min = Math.floor(sec / 60);
        const hrs = Math.floor(min / 60);
        const days = Math.floor(hrs / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) return `${years} ${years === 1 ? "an" : "ans"}`;
        if (months > 0) return `${months} mois`;
        if (days > 0) return `${days} ${days === 1 ? "jour" : "jours"}`;
        if (hrs > 0) return `${hrs} ${hrs === 1 ? "heure" : "heures"}`;
        if (min > 0) return `${min} ${min === 1 ? "minute" : "minutes"}`;
        return `${sec} ${sec === 1 ? "seconde" : "secondes"}`;
    };

    const notes = [
        {critere: "Rapidité", note: commentaire.noteRapidite},
        {critere: "Qualité",  note: commentaire.noteQualite},
        {critere: "Service",  note: commentaire.noteService},
        {critere: "Hygiène",  note: commentaire.noteHygiene}
    ];

    return (
        <>
            {/* Commentaire */}
            <Card sx={{width: "inherit", padding: "5px"}} elevation={4}>
                <CardHeader
                    avatar={
                        <ColorAvatar
                            src={commentaire.auteur?.urlImage}
                            name={commentaire.auteur?.pseudo}
                        />
                    }
                    title={
                        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                <Link component="button" color="inherit" underline="none" onClick={()=>{navigate(`/profil/${commentaire.auteur.pseudo}`)}}>
                                    {commentaire.auteur.pseudo}
                                </Link>
                            </Typography>

                            <CommElement
                                commentaire={commentaire}
                                section={section}
                                onVoirDetails={handleVoirDetails}
                                notes={notes}
                            />
                        </Box>
                    }
                    subheader={`Il y a ${delai(commentaire.date)}`}
                />

                {/* Contenu du commentaire */}
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={2}>

                        {commentaire.contenu !=="" && (
                        <Typography sx={{ whiteSpace: 'pre-line' }}>
                            {refAuteurRepondu !== "" && (
                                <Chip label={`@${refAuteurRepondu}`} sx={{mr:1}}/>
                            )}
                            {commentaire.contenu}
                        </Typography>)}

                        <Chip
                            color="primary"
                            icon={<CommIcon fontSize="small"/>}
                            label="Répondre"
                            onClick={() => onRepondre(commentaire)}
                            sx={{width: "fit-content", justifyContent: 'center', paddingLeft: '5px'}}
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Boîte de dialogue (pour voir les détails des notes de restaurant) */}

            <Dialog open={openDetails} onClose={handleCloseDetails}>
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <Box display='flex' flexDirection="row"
                        sx={{
                            gap:'10px',
                            alignItems: "center",
                        }}
                    >
                        <ColorAvatar src={commentaire.auteur.urlImage} name={commentaire.auteur.pseudo}/>
                        <Typography variant="subtitle1" fontWeight="bold">
                            <Link component="button" color="inherit" underline="none" onClick={() => {navigate(`/profil/${commentaire.auteur.pseudo}`)}}>
                            {commentaire.auteur.pseudo}
                            </Link>
                        </Typography>
                    </Box>

                    <IconButton onClick={handleCloseDetails}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    <Grid container spacing={1}
                          sx={{
                              justifyContent: "space-around",
                              alignItems: "center"
                          }}
                    >
                        {notes.map((note) => (
                            <PaperNote text={note.critere} isGlobal={false}
                                       note={note.note}
                            />
                        ))}
                    </Grid>

                </DialogContent>

            </Dialog>
        </>
    );
}