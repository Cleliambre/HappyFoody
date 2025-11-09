import React, {useState} from "react";
import {Container, Stack, Button, Box, Pagination} from "@mui/material";
import CommBlock from "./CommBlock";

// Icons
import PlusIcon from '@mui/icons-material/AddCircleOutlineRounded';
import MinusIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import FlecheIcon from '@mui/icons-material/SubdirectoryArrowRightRounded';

const getVoirTexte = (commReponses, maxRepAff, isOpen) => {
    if (isOpen) return "Masquer les réponses";

    const nb = commReponses.length - maxRepAff;
    const plural = nb > 1 ? "s" : "";

    return `Voir ${nb} autre${plural} réponse${plural}`;
};

// Fonction récursive pour récupérer toutes les réponses d'un commentaire
const getAllReponses = (commentaireId, toutesReponses) => {
    // Trouver les réponses directes
    const directes = toutesReponses.filter(r => r.idCommRepondu === commentaireId);

    // Pour chaque réponse directe, on récupère ses propres réponses récursivement
    const toutes = directes.flatMap(r => [r, ...getAllReponses(r.idCommentaire, toutesReponses)]);

    return toutes;
};

const getAuteurRepondu = (idCommRepondu, comm, commReponses) => {
    if (idCommRepondu === comm.idCommentaire) {
        return comm.username;
    }
    const rep = commReponses.find(c => c.idCommentaire === idCommRepondu);
    return rep?.username ?? "Utilisateur inconnu";
};

export default function CommList({width, commentaires, section, onRepondre}) {

    // Séparer commentaires principaux (idCommRepondu:0) et réponses
    const commentairesPrincipaux = commentaires.filter(c => c.idCommRepondu === 0);
    const reponses = commentaires.filter(c => c.idCommRepondu !== 0);

    // Pour stocker l'état "voir plus / voir moins" pour chaque commentaire principal
    const [voirPlus, setVoirPlus] = useState({});

    const toggleVoirPlus = (id) => {
        setVoirPlus(prev => ({...prev, [id]: !prev[id]}));
    };

    const [page, setPage] = React.useState(1);
    const parPage = 5;

    const totalPages = Math.ceil(commentairesPrincipaux.length / parPage);

    // Découpe des commentaires principaux affichés
    const commentairesAffiches = commentairesPrincipaux.slice(
        (page - 1) * parPage,
        page * parPage
    );

    return (
        <Container sx={{width: width}}>
            <Stack spacing={1}>
                {commentairesAffiches.map((comm) => {

                    let maxRepAff = 0;
                    // Trouver les réponses directes à ce commentaire
                    const commReponses = getAllReponses(comm.idCommentaire, reponses);

                    // Masquer les réponses des commentaires
                    const afficherReponses = voirPlus[comm.idCommentaire] ? commReponses : commReponses.slice(0, maxRepAff);

                    return (
                        <Box sx={{mb: 1}}>

                            {/* Commentaire principal */}
                            <Box sx={{mb: 1}}>
                                <CommBlock
                                           commentaire={comm}
                                           section={section}
                                           onRepondre={onRepondre}
                                />
                            </Box>

                            {/* Commentaire répondu affiché*/}
                            {afficherReponses.length > 0 && (
                                <Box display="flex" flexDirection="row" sx={{ flexGrow: 1 }}>
                                    <FlecheIcon color="disabled"/>

                                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                        {afficherReponses.map((rep) => (
                                            <CommBlock
                                                commentaire={rep}
                                                section={section}
                                                onRepondre={onRepondre}
                                                refAuteurRepondu={getAuteurRepondu(rep.idCommRepondu, comm, commReponses)}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            )}

                            {/* Button voir plus / moins */}
                            {commReponses.length > maxRepAff && (
                                <Button sx={{ml: 4, mb: 1}}
                                        size="small"
                                        onClick={() => toggleVoirPlus(comm.idCommentaire)}
                                        startIcon={voirPlus[comm.idCommentaire] ? <MinusIcon/> : <PlusIcon/>}
                                >
                                    {getVoirTexte(commReponses, maxRepAff, voirPlus[comm.idCommentaire])}
                                </Button>
                            )}
                        </Box>
                    );
                })}
            </Stack>
            {totalPages > 1 && (
                <Box sx={{display: "flex", justifyContent: "center", mt: 3}}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, newPage) => setPage(newPage)}
                        color="primary"
                        size="medium"
                    />
                </Box>
            )}
        </Container>
    );
}
