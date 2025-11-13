import CreateCardDescription from "./CreateCardDescription";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Tooltip,
    Typography,
    Stack,
    Box
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RecettesIcon from "@mui/icons-material/MenuBookOutlined";
import axios from "axios";
import ButtonReturn from "../../components/ButtonReturn";

export default function RecetteCreation(){

    //Changement du titre de la page sur l'onglet du navigateur
    useEffect(() => {
        document.title = "Création de Recette - Happy Foody";
    }, [])

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Aperçu local
            setImage(URL.createObjectURL(file));

            // Envoi au backend
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post("http://localhost:8080/api/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // Récupère l'URL persistante renvoyée par le backend
                setImage(response.data.url);
                console.log("URL de l'image reçue :", response.data.url);

            } catch (err) {
                console.error("Erreur d'upload :", err);
            }
        }
    };

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const[image, setImage] = useState(null);
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [compte, setCompte] = useState(null);


    const [tags, setTags] = useState([]);
    const [tagsPossibles, setTagsPossibles] = useState([])
    const [tagsExistants, setTagsExistants] = useState([])


    const [heures, setHeures] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [portion, setPortion] = useState(1);


    const [ingredients, setIngredients] = useState([]);
    const [etapes, setEtapes] = useState([]);



    useEffect(() => {
        const idCompte = localStorage.getItem('idCompte');
        if (!idCompte) {
            navigate('/connexion');
            return;
        }

        fetch(`http://localhost:8080/api/compte/getCompteById/${idCompte}`)
            .then(res => res.json())
            .then(data => setCompte(data));

        fetch(`http://localhost:8080/api/tag/all`)
            .then(res => res.json())
            .then(data => {setTagsExistants(data);});

    }, [navigate]);


    useEffect(() => {
        console.log("tagsExistants mis à jour :", tagsExistants);
    }, [tagsExistants]);

    useEffect(() => {
        console.log("tagsPossibles mis à jour :", tagsPossibles);
    }, [tagsPossibles]);

    useEffect(() => {
        console.log("tags mis à jour :", tags);
    }, [tags]);

    // --- TAGS ---
    const handleTagAdd = (nom)=>{
        if (!tags.some(tag => tag.nom === nom)) {
            const newTag = {nom: nom, color: "success"};
            setTags([...tags, newTag]);
        }
    };

    const handleTagRemove = (index)=>{
        setTags(tags.filter((_, i) => i !== index));
    }

    // --- CHAMPS CARD ---
    const handleTitle = (titre) => setTitre(titre);
    const handleDescription = (description) => setDescription(description);

    // --- INGREDIENTS ---
    const handleIngDelete = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    }

    // --- ÉTAPES ---
    const handleEtapeDelete = (index) => {
        const newEtapes = etapes.filter((etape, index2) => index2 !== index);
        setEtapes(newEtapes);
    }

    // --- BOÎTES DE DIALOGUE ---
    const [opened, setOpened] = useState(false);
    const [nomIngredient, setNomIngredient] = useState("");
    const [quantiteIngredient, setQuantiteIngredient] = useState(0);
    const [uniteIngredient, setUniteIngredient] = useState("");
    const [uniteAccepted] = useState([
        "",
        "g",
        "kg",
        "L",
        "mL",
        "cuillère à soupe",
        "cuillère à café",
        "bouquet",
        "pincée"
    ]);

    const handleConfirmerIngredient = ()=>{
        if (!nomIngredient || quantiteIngredient <= 0) {
            alert("Nom de l'ingrédient ou la quantité de l'ingrédient invalide !");
            return;
        }
        const newIngredient = {
            nom : nomIngredient,
            quantite : quantiteIngredient,
            unite : uniteIngredient
        };
        if (ingredients.filter(i => i.nom === nomIngredient).length > 0) {
            alert("Doublon d'ingrédient : cet ingrédient existe déjà dans la liste d'ingrédients.");
            return;
        }
        setOpened(false);
        setIngredients([...ingredients, newIngredient]);
        setUniteIngredient("");
        setNomIngredient("");
        setQuantiteIngredient(0);
    };


    const [opened2, setOpened2] = useState(false);
    const [etape, setEtape] = useState("")
    const handleConfirmerEtape = ()=>{
        setOpened2(false);
        if (etape.trim() !== "") setEtapes([...etapes, etape]);
        setEtape("");
    }


    const [opened3, setOpened3] = useState(false);
    const [tagSelected, setTagSelected] = useState("");
    const [nouveauTagPossible, setNouveauTagPossible] = useState("");
    const [textErreurNouvTagPossible, setTextErreurNouvTagPossible] = useState("");
    const [colorTextError, setColorTextError] = useState("");

    const handleAjoutNouveauTagPossible = (nom)=>{
        if(!nom.trim()){
            setTextErreurNouvTagPossible("Le nom entré est invalide ! ");
            setColorTextError("error");
            return;
        }
        if (tagsPossibles.some(tag => tag.nom === nom)) {
            setTextErreurNouvTagPossible("Ce tag existe déjà !");
            setColorTextError("error");
            return;
        }

        const newTag = {nom : nom, color : "success"}
        setTagsPossibles([...tagsPossibles, newTag]);
        setTextErreurNouvTagPossible("Nom de tag ajouté !")
        setColorTextError("success");
        setTagSelected(nom);
        setNouveauTagPossible("");

    }

    const handleSubmit = async () => {
        //Validation basique
        if (!titre) {
            setMessage("Veuillez remplir tous le champ titre qui est obligatoire !");
            return;
        }

        if (ingredients.length === 0) {
            setMessage("Une recette doit avoir au moins un ingrédient");
            return;
        }

        if (etapes.length === 0) {
            setMessage("Une recette doit avoir au moins une étape");
            return;
        }

        if (portion < 1){
            setMessage("Une portion doit être positive et non nulle !");
            return;
        }

        if (minutes < 0 || heures < 0 || (minutes === 0 && heures === 0)){
            setMessage("Valeur du temps interdite");
            return;
        }

        const temps = 3600*heures + 60*minutes;

        try{
            const newRecette = {
                description,
                portion,
                temps,
                urlImage : image,
                titre,
                auteur: compte
            };

            const recetteResponse = await axios.post("http://localhost:8080/api/recette/createRecette", newRecette)
            const recetteCreee = recetteResponse.data;

            console.log("Test de réception de recette : ");
            console.log(recetteCreee);

            // --- Ingrédients + quantités ---
            for (const ingredient of ingredients) {
                const ingrResponse = await axios.post("http://localhost:8080/api/ingredient/createIngredient", {
                    nom: ingredient.nom
                });


                await axios.post("http://localhost:8080/api/quantite/createQuantite", {
                    ingredient: ingrResponse.data,
                    recette: recetteCreee,
                    portion: ingredient.quantite,
                    unite: ingredient.unite
                });
            }

            // --- Étapes ---
            for (const etape of etapes) {
                await axios.post("http://localhost:8080/api/etape/createEtape", {
                    txtEtape: etape,
                    recette: recetteCreee
                });
            }

            // --- Tags ---
            for (const tag of tags) {
                // Vérifie si le tag existe déjà
                const existingTag = tagsExistants.find(t => t.nom === tag.nom);
                console.log("Tags existants dans handleSubmit");
                console.log(tagsExistants);
                let tagObj;


                if (existingTag) {
                    console.log("J'existe !");
                    tagObj = existingTag;
                } else {
                    const resTag = await axios.post("http://localhost:8080/api/tag/createTag", {
                        nom: tag.nom,
                        typeTag: 0
                    });
                    tagObj = resTag.data;

                }

                console.log(tagObj);
                await axios.post(`http://localhost:8080/api/recette/associerTagARecette?recetteId=${recetteCreee.idRecette}&tagId=${tagObj.idTag}`);

            }


            setMessage("Recette créée avec succès !");

            // Réinitialisation
            setTitre("");
            setDescription("");
            setImage(null);
            setHeures(0);
            setMinutes(1);
            setPortion(1);
            setIngredients([]);
            setEtapes([]);
            setTags([]);

        }catch(error){
            console.error("Erreur lors de la création de la recette:", error);
            setMessage("Erreur lors de la création. Veuillez réessayer")
        }
    }

    const handleOpen1 = () => {setOpened(true);};
    const handleClose1 = () => {setOpened(false);};

    const handleOpen2 = () => {setOpened2(true);};
    const handleClose2 = () => {setOpened2(false);};

    const handleOpen3 = () => {setOpened3(true);};
    const handleClose3 = () => {setOpened3(false);};







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
                    <RecettesIcon sx={{ fontSize: "150px" }}/>

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
                    <ButtonReturn
                        path="/recette"
                        text="Retour à la recherche de recette"
                    />

                    {/*Carte de d'information*/}
                    {compte && (
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
                            onImageChange={() => document.getElementById("image-upload").click()}
                        />
                    )}
                    {/*champ proposant à l'utilisateur d'importer une image*/}
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
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
                                sx={{display: 'list-item', py:0 }}
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
                                <ListItemText sx={{objectFit:'cover', whiteSpace:'pre-line' }}>
                                    {etape}
                                </ListItemText>
                            </ListItem>
                        )}
                    </List>
                </Stack>

                {message && (
                    <Typography
                        variant="body2"
                        color={message.includes("succès") ? "green" : "red"}
                        style={{ marginTop: "10px" }}
                    >
                        {message}
                    </Typography>
                )}

                {/*boutons annuler et valider*/}
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        variant="contained"
                        sx={{borderRadius:5, backgroundColor:"grey"}}
                        onClick={() => {navigate('/recette');}}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        sx={{borderRadius:5}}
                        onClick={handleSubmit}
                    >
                        Confirmer
                    </Button>
                </Stack>
                <Box sx={{ height: '15px' }} />
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
                                unite === "" ? (
                                    <MenuItem
                                        value=""
                                        sx={{ fontStyle: 'italic', color: 'text.disabled' }}
                                    >
                                        Aucune unité
                                    </MenuItem>
                                ) : (
                                    <MenuItem value={unite}>{unite}</MenuItem>
                                )
                            )}
                        </Select>
                        <Button variant="contained" onClick={handleConfirmerIngredient}>Confirmer</Button>
                    </Stack>
                </DialogContent>
            </Dialog>

            {/*boîte de dialogue pour l'ajout d'une étape*/}
            <Dialog open={opened2} onClose={handleClose2}
                    fullWidth
                    maxWidth='md'
            >
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
                            sx={{maxWidth:200}}
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
                            {tagsExistants.map((tag) =>
                                <MenuItem value={tag.nom}>{tag.nom}</MenuItem>
                            )}
                            {tagsPossibles.map((tag) =>
                                <MenuItem value={tag.nom}>{tag.nom}</MenuItem>
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