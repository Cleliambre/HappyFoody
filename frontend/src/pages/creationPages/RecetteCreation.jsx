import CreateCardDescription from "./CreateCardDescription";
import React, {useState} from "react";

import berserker from "../../images/berserker.jpeg"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemText, MenuItem, Paper, Select, TextField, Tooltip, Typography, Stack} from "@mui/material";
import Button from "@mui/material/Button";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

export default function RecetteCreation(){

    const[image] = useState(null);

    const [tags, setTags] = useState([]);

    const [titre, setTitre] = useState("");

    const [description, setDescription] = useState("");

    const [compte] = useState(
        {userImageUrl : berserker, pseudo : "MariaSalade"}
    );

    const [heures, setHeures] = useState(0);

    const [minutes, setMinutes] = useState(0);

    const [portion, setPortion] = useState(0);

    const [ingredients, setIngredients] = useState([
        {nom:"test", quantite:100, unite : "g"},
        {nom:"test à rallonge ++ oui, toujours plus", quantite: 100000, unite: "kg"}
    ]);

    const [etapes, setEtapes] = useState([
        "test1 blabla blabla",
        "test2 blabla blabla youpiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
    ]);

    const handleTagAdd = (nom)=>{

        let error = false;
        tags.map(tag=>{
            if(tag.label === nom){
                error = true;
            }
        })
        if(!error)
        {
            const newTag = {label : nom, color : "success"};
            setTags([...tags, newTag]);
        }
    };

    const handleTagRemove = (index)=>{
        const newTags = tags.filter((description, index2) => index2 !== index);
        setTags(newTags);
    }

    const handleTitle = (titre) => setTitre(titre);

    const handleDescription = (description) => setDescription(description);

    const handleIngDelete = (index) => {
        const newIngredients = ingredients.filter((ingredient, index2) => index2 !== index);
        setIngredients(newIngredients);
    }

    const handleEtapeDelete = (index) => {
        const newEtapes = etapes.filter((etape, index2) => index2 !== index);
        setEtapes(newEtapes);
    }

    const [opened, setOpened] = useState(false);

    const handleOpen1 = () => {setOpened(true);};
    const handleClose1 = () => {setOpened(false);};

    const [nomIngredient, setNomIngredient] = useState("");

    const [quantiteIngredient, setQuantiteIngredient] = useState(0);

    const [uniteIngredient, setUniteIngredient] = useState("");

    const [uniteAccepted] = useState([
        "",
        "g",
        "kg",
        "L",
        "mL",
        "cuillère(s) à soupe",
        "cuillère(s) à café"
    ]);

    const handleConfirmerIngredient = ()=>{
        setOpened(false);
        const newIngredient = {
            nom : nomIngredient,
            quantite : quantiteIngredient,
            unite : uniteIngredient
        };
        setIngredients([...ingredients, newIngredient]);
        setUniteIngredient("")
        setNomIngredient("")
        setQuantiteIngredient(0);
    };

    const [opened2, setOpened2] = useState(false);

    const handleOpen2 = () => {setOpened2(true);};
    const handleClose2 = () => {setOpened2(false);};

    const [etape, setEtape] = useState("")

    const handleConfirmerEtape = ()=>{
        setOpened2(false);
        setEtapes([...etapes, etape]);
        setEtape("");
    }

    const [opened3, setOpened3] = useState(false);

    const handleOpen3 = () => {setOpened3(true);};
    const handleClose3 = () => {setOpened3(false);};

    const [tagsPossibles, setTagsPossibles] = useState([
        {label: "vegetarien", color : "success"}
    ])

    const [tagSelected, setTagSelected] = useState("vegetarien");

    const [nouveauTagPossible, setNouveauTagPossible] = useState("");

    const [textErreurNouvTagPossible, setTextErreurNouvTagPossible] = useState("");
    const [colorTextError, setColorTextError] = useState("");

    const handleAjoutNouveauTagPossible = (nom)=>{
        let isError;
        isError = false
        if(nom===""){
            setTextErreurNouvTagPossible("Le nom entré est invalide ! ");
            setColorTextError("error");
            isError = true;
        }
        else {
            tagsPossibles.map(tag => {
                if (tag.label === nom || nom === "") {
                    setTextErreurNouvTagPossible("Le nom entré existe déjà ! ");
                    setColorTextError("error");
                    isError = true;
                }
            })
        }
        if(!isError){
            const newTag = {label : nom, color : "success"}
            setTagsPossibles([...tagsPossibles, newTag]);
            setTextErreurNouvTagPossible("Nom de tag ajouté !")
            setColorTextError("success");

            setTagSelected(nom);
            setNouveauTagPossible("");
        }

        isError = false;
    }

    return (
        <React.Fragment>
            {/*Contenu de la page*/}
            <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                padding={2}
            >
                {/*Titre + bouton + carte de description*/}
                <Stack direction="row" spacing={2} alignItems="center">
                    <AutoStoriesOutlinedIcon sx={{ fontSize: "150px" }}/>

                    <Stack direction="column" spacing={2} textAlign="center">
                        <Typography variant="h3">
                            Création de Recette
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Partagez votre meilleure recette ci-dessous !
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    alignItems="start"
                    width={"80%"}
                    maxWidth = "900px"
                    spacing={1}
                >
                    {/*Bouton de retour*/}
                    <Button
                        variant="contained"
                        sx={{backgroundColor: "gray", alignItems:"center"}}>
                        <Typography className = "cancel">
                            Retour
                        </Typography>
                        <KeyboardReturnIcon />
                    </Button>

                    {/*Carte de d'information*/}
                    <CreateCardDescription
                        texteTitreField="Nom de la recette"
                        image={image}
                        tags={tags}
                        titre={titre}
                        texteDescription={description}
                        compte={compte}
                        onTagAdd={handleOpen3}
                        onTitleChange={handleTitle}
                        onDescriptionChange={handleDescription}
                        onTagDelete={handleTagRemove}
                    />
                </Stack>

                {/*Description détaillée*/}

                {/*Temps et portions*/}
                <Stack direction="row" spacing={10}>
                    {/*Temps*/}
                    <Paper elevation={2} sx={{padding:2, alignContent:"center"}}>

                        <Typography variant="h5">
                            Temps :
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <TextField
                                type="number"
                                variant="outlined"
                                value={heures}
                                sx={{width:75}}
                                onChange={(e)=>setHeures(Number(e.target.value))}
                            />
                            <Typography variant="h6">
                                h
                            </Typography>
                            <TextField
                                type="number"
                                variant="outlined"
                                value={minutes}
                                sx={{width:75}}
                                onChange={(e)=>setMinutes(Number(e.target.value))}
                            />
                            <Typography variant="h6">
                                min
                            </Typography>
                        </Stack>
                    </Paper>

                    {/*portions*/}
                    <Paper elevation={2} sx={{padding:2, display:'flex', flexDirection:'column'}}>
                        <Typography variant="h5">
                            Portions :
                        </Typography>
                        <TextField
                            type="number"
                            variant="outlined"
                            value={portion}
                            sx={{width:100}}
                            onChange={(e)=>setPortion(Number(e.target.value))}
                        />
                        <Typography variant="h6">
                            personnes
                        </Typography>
                    </Paper>
                </Stack>

                {/*Ingrédients et Etapes de préparation*/}
                <Stack
                    width={"80%"}
                    maxWidth={"900px"}
                    alignItems="start"
                    spacing={1}
                >
                    <Typography variant="h5">
                        Ingredients :
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={handleOpen1}
                    >
                        Ajouter un ingrédient
                    </Button>
                    <List>
                        {ingredients.map((ingredient, index) =>
                            <ListItem divider={true}
                                secondaryAction={
                                    <Tooltip title={"supprimer"}>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleIngDelete(index)}
                                        >
                                            <DeleteOutlineOutlinedIcon color="error"/>
                                        </IconButton>
                                    </Tooltip>}
                            >
                                <ListItemText>
                                    {ingredient.nom} : {ingredient.quantite} {ingredient.unite}
                                </ListItemText>
                            </ListItem>)}
                    </List>

                    <Typography variant="h5">
                        Préparation
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={handleOpen2}
                    >
                        Ajouter une étape
                    </Button>
                    <List sx={{listStyleType: 'decimal', pl:4}}>
                        {etapes.map((etape, index)=>
                            <ListItem
                                sx={{display: 'list-item', py:0}}
                                divider={true}
                                secondaryAction={
                                    <Tooltip title={"supprimer"}>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleEtapeDelete(index)}
                                        >
                                            <DeleteOutlineOutlinedIcon color="error"/>
                                        </IconButton>
                                    </Tooltip>
                                }
                            >
                                <ListItemText>
                                    {etape}
                                </ListItemText>
                            </ListItem>
                        )}
                    </List>
                </Stack>

                {/*boutons annuler et valider*/}
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        variant="contained"
                        sx={{borderRadius:5, backgroundColor:"grey"}}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        sx={{borderRadius:5}}
                    >
                        Confirmer
                    </Button>
                </Stack>

            </Stack>

            {/*boîte de dialogue pour l'ajout d'ingrédient*/}
            <Dialog open={opened} onClose={handleClose1}>
                <DialogTitle>
                    Ajout d'un ingrédient
                </DialogTitle>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <DialogContentText>
                            Entrez le nom de l'ingrédient
                        </DialogContentText>
                        <TextField
                            value={nomIngredient}
                            onChange={(e)=>setNomIngredient(e.target.value)}
                        />
                        <DialogContentText>
                            Entrez la quantité nécessaire
                        </DialogContentText>
                        <TextField
                            type="number"
                            value={quantiteIngredient}
                            onChange={(e)=>setQuantiteIngredient(Number(e.target.value))}
                        />
                        <DialogContentText>
                            Entrez l'unité
                        </DialogContentText>
                        <Select variant="standard"
                            autoFocus
                            fullWidth={true}
                            value={uniteIngredient}
                            onChange={(e)=>setUniteIngredient(e.target.value)}
                        >
                            {uniteAccepted.map((unite) =>
                                <MenuItem value={unite}>{unite}</MenuItem>
                            )}
                        </Select>
                        <Button variant="contained" onClick={handleConfirmerIngredient}>Confirmer</Button>
                    </Stack>
                </DialogContent>
            </Dialog>

            {/*boîte de dialogue pour l'ajout d'une étape*/}
            <Dialog open={opened2} onClose={handleClose2}>
                <DialogTitle>
                    Ajout d'une étape
                </DialogTitle>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <DialogContentText>
                            Entrez la description de votre étape
                        </DialogContentText>
                        <TextField
                            multiline={true}
                            fullWidth={true}
                            value={etape}
                            onChange={(e)=>setEtape(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={handleConfirmerEtape}
                        >
                            Confirmer
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>

            {/*Boîte de dialogue pour l'ajout d'un tag*/}
            <Dialog open={opened3} onClose={handleClose3}>
                <DialogTitle>
                    Ajout d'un tag
                </DialogTitle>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <DialogContentText>
                            Choisissez un tag à ajouter
                        </DialogContentText>
                        <Select
                            variant="standard"
                            fullWidth={true}
                            value={tagSelected}
                            onChange={(e)=>setTagSelected(e.target.value)}
                        >
                            {tagsPossibles.map((tag) =>
                                <MenuItem value={tag.label}>{tag.label}</MenuItem>
                            )}
                        </Select>
                        <DialogContentText>
                            Aucun tag ne vous convient ? Ajoutez-en un :
                        </DialogContentText>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                label="nouveau tag"
                                value={nouveauTagPossible}
                                onChange={(e)=>setNouveauTagPossible(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                onClick={() => handleAjoutNouveauTagPossible(nouveauTagPossible)}
                            >
                                Ajouter
                            </Button>
                        </Stack>
                        <Typography color={colorTextError}>{textErreurNouvTagPossible}</Typography>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleTagAdd(tagSelected);
                                handleClose3();
                            }}
                        >
                            Confirmer
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>

        </React.Fragment>
    );
}