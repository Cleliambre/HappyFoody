import Stack from "@mui/material/Stack";
import {Avatar, Typography} from "@mui/material";
import CardList from "../../components/card_list/CardList";
import {useState} from "react";
import CardMessage from "../../components/card_list/CardMessage";
import necromencienne from "../../images/necromencienne.jpg"

export default function MessageHome(){

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
            avatar : necromencienne,
            pseudo : "User1",
            lastMessage : "flemme...",
            lu : true,
            muet : false,
            date : new Date(2025, 10, 4, 1, 2),
        },
        {
            id : 3,
            avatar : necromencienne,
            pseudo : "User2",
            lastMessage : "flemme...",
            lu : true,
            muet : false,
            date : new Date(2024, 10, 4, 1, 2),
        }
    ]);

    const handleClick = (card) =>{
        alert("Clique sur la conversation de " + card.pseudo)
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
                        avatar={<Avatar src={message.avatar} />}
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