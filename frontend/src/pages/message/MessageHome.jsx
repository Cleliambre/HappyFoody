import Stack from "@mui/material/Stack";
import {Typography} from "@mui/material";
import CardList from "../../components/card_list/CardList";
import {useEffect, useState} from "react";
import CardMessage from "../../components/card_list/CardMessage";
import necromencienne from "../../images/necromencienne.jpg"
import {useNavigate} from "react-router-dom";
import ColorAvatar from "../../components/ColorAvatar";

export default function MessageHome(){
    useEffect(() => {
        const timer = setTimeout(() => {
            alert("Il manque des fonctionnalités dans la section des messages");
        }, 0);
    }, []);

    const [messages, setMessages] = useState([
        {
            id : 0,
            avatar : necromencienne,
            pseudo : "fanDeSalades",
            lastMessage : "Je trouve votre recette de salade excellente, vous auriez des astuces à me donner ? Comme comment essorer la salade efficacement ?",
            lu : false,
            muet : false,
            date : new Date(2025, 10, 9, 13, 30),
        },
        {
            id : 1,
            avatar : necromencienne,
            pseudo : "MissSalsa",
            lastMessage : "Merci beaucoup, j'ai passé un excellent partage grâce à vous ! <3",
            lu : false,
            muet : true,
            date : new Date(2025, 8, 12, 10, 15),
        },
        {
            id : 2,
            avatar : null,
            pseudo : "User1",
            lastMessage : "Salut ! Comment vas-tu depuis ?",
            lu : true,
            muet : false,
            date : new Date(2025, 10, 4, 1, 2),
        },
        {
            id : 3,
            avatar : null,
            pseudo : "User2",
            lastMessage : "J'adore vos recettes !",
            lu : true,
            muet : false,
            date : new Date(2024, 10, 4, 1, 2),
        }
    ]);

    const navigate = useNavigate();

    const handleClick = (card) =>{
        navigate('/messages/:pseudo/:pseudo');
    }

    const handleNotif = (card)=>{
        setMessages((prevMessages)=>
            prevMessages.map((m)=>
                m.id===card.id
                    ? {
                        ...m,
                        muet : !m.muet
                    }
                    : m
            ));
    }

    return (
        /*Contenu de la page*/
        <Stack
            spacing={2}
            alignItems="center"
            padding={2}
        >
            <Typography variant="h3"> Messages </Typography>
            <CardList>
                {messages.map((message) => (
                    <CardMessage
                        avatar={<ColorAvatar src={message.avatar} name={message.pseudo} />}
                        pseudo={message.pseudo}
                        lastMessage={message.lastMessage}
                        muet={message.muet}
                        lu={message.lu}
                        date={message.date}
                        onClick={()=>handleClick(message)}
                        onNotif={()=>handleNotif(message)}
                    />
                ))}
            </CardList>
        </Stack>
    );
}