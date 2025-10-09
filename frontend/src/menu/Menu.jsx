import React, {useState} from "react";
import iconHappyFoody from "./HappyFoodyIcon.png"
import './Menu.css'
import Button from '@mui/material/Button'

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

function ButtonMenu({button, style, variant}) {
    return(
      <Button variant={variant} className={style}>
          {button.icon}
          <text>{button.text}</text>
      </Button>
    );
}

function GroupButtonMenu({buttons, style, variant}){
    return(
        <div className="GroupButton">
            {buttons.map(button =>
                <ButtonMenu button={button} style={style} variant={variant}/>
            )}
        </div>
    );
}

export default function Menu(){
    const [leftButtons] = useState([
            {
                text:"Recette",
                icon: <MenuBookOutlinedIcon></MenuBookOutlinedIcon>,
            },
            {
                text: "Restaurant",
                icon: <RestaurantOutlinedIcon></RestaurantOutlinedIcon>,
            },
            {
                text: "Communauté",
                icon: <PeopleOutlinedIcon></PeopleOutlinedIcon>,
            },
            {
                text: "Partage",
                icon: <VolunteerActivismOutlinedIcon></VolunteerActivismOutlinedIcon>,
            },
    ]);
    const [rightButtons] = useState([
            {
                text:"Favori",
                icon: <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>,
            },
            {
                text: "Message",
                icon: <EmailOutlinedIcon></EmailOutlinedIcon>,
            },
            {
                text: "Profil",
                icon: <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>,
            },
    ]);

    return (
        <div className="Menu">
            <img className="HappyFoodyIcon" src={iconHappyFoody}/>
            <GroupButtonMenu buttons={leftButtons} style="LeftButton" variant="contained"></GroupButtonMenu>
            <insert className="InsertButton"></insert>
            <GroupButtonMenu buttons={rightButtons} style="RightButton" variant="text"></GroupButtonMenu>
        </div>
    );
}