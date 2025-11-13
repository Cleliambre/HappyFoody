import React, { useState } from "react";
import { Container, Stack, Button, Box, Pagination } from "@mui/material";
import CommBlock from "./CommBlock";

// Icons
import PlusIcon from "@mui/icons-material/AddCircleOutlineRounded";
import MinusIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import FlecheIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";

// Texte du bouton "voir plus"
const getVoirTexte = (commReponses, maxRepAff, isOpen) => {
    if (isOpen) return "Masquer les réponses";
    const nb = commReponses.length - maxRepAff;
    const plural = nb > 1 ? "s" : "";
    return `Voir ${nb} autre${plural} réponse${plural}`;
};

// Récupération récursive de toutes les réponses d’un commentaire
const getAllReponses = (commentaireId, toutesReponses) => {
    const directes = toutesReponses.filter(
        (r) => r.commRepondu && r.commRepondu.idCommentaire === commentaireId
    );
    return directes.flatMap((r) => [r, ...getAllReponses(r.idCommentaire, toutesReponses)]);
};

// Trouver l’auteur auquel une réponse répond
const getAuteurRepondu = (commRepondu, comm, commReponses) => {
    if (!commRepondu) return null;
    if (commRepondu.idCommentaire === comm.idCommentaire) {
        return comm.auteur?.pseudo;
    }
    const rep = commReponses.find((c) => c.idCommentaire === commRepondu.idCommentaire);
    return rep?.auteur?.pseudo ?? "Utilisateur inconnu";
};

export default function CommList({ width, commentaires, section, onRepondre }) {
    const commentairesPrincipaux = commentaires.filter((c) => c.commRepondu === null);
    const reponses = commentaires.filter((c) => c.commRepondu !== null);
    console.log("LES REPONSES : " + JSON.stringify(reponses));

    const [voirPlus, setVoirPlus] = useState({});
    const toggleVoirPlus = (id) => setVoirPlus((prev) => ({ ...prev, [id]: !prev[id] }));

    const [page, setPage] = useState(1);
    const parPage = 5;
    const totalPages = Math.ceil(commentairesPrincipaux.length / parPage);

    const commentairesAffiches = commentairesPrincipaux.slice(
        (page - 1) * parPage,
        page * parPage
    );

    return (
        <Container sx={{ width: width }}>
            <Stack spacing={1}>
                {commentairesAffiches.map((comm) => {
                    const commReponses = getAllReponses(comm.idCommentaire, reponses);
                    const maxRepAff = 0;
                    const afficherReponses = voirPlus[comm.idCommentaire]
                        ? commReponses
                        : commReponses.slice(0, maxRepAff);

                    return (
                        <Box key={comm.idCommentaire} sx={{ mb: 1 }}>
                            {/* 💬 Commentaire principal */}
                            <Box sx={{ mb: 1 }}>
                                <CommBlock
                                    commentaire={comm}
                                    onRepondre={onRepondre}
                                    section={section}
                                />
                            </Box>

                            {/* ↳ Réponses */}
                            {afficherReponses.length > 0 && (
                                <Box display="flex" flexDirection="row" sx={{ flexGrow: 1 }}>
                                    <FlecheIcon color="disabled" />
                                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                        {afficherReponses.map((rep) => (
                                            <CommBlock
                                                key={rep.idCommentaire}
                                                commentaire={rep}
                                                onRepondre={onRepondre}
                                                section={section}
                                                refAuteurRepondu={getAuteurRepondu(rep.commRepondu, comm, commReponses)}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            )}

                            {/* Bouton voir plus / moins */}
                            {commReponses.length > maxRepAff && (
                                <Button
                                    sx={{ ml: 4, mb: 1 }}
                                    size="small"
                                    onClick={() => toggleVoirPlus(comm.idCommentaire)}
                                    startIcon={voirPlus[comm.idCommentaire] ? <MinusIcon /> : <PlusIcon />}
                                >
                                    {getVoirTexte(commReponses, maxRepAff, voirPlus[comm.idCommentaire])}
                                </Button>
                            )}
                        </Box>
                    );
                })}
            </Stack>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
