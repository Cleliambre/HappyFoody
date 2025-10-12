import React, { useState } from "react";
import iconHappyFoody from "./HappyFoodyIcon.png";
import "./Menu.css";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

import MessagesIcon from "@mui/icons-material/EmailOutlined";
import ProfilIcon from "@mui/icons-material/AccountCircleOutlined";
import FavorisIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PartagesIcon from "@mui/icons-material/VolunteerActivismOutlined";
import CommunauteIcon from "@mui/icons-material/PeopleOutlined";
import RestaurantsIcon from "@mui/icons-material/RestaurantOutlined";
import RecettesIcon from "@mui/icons-material/MenuBookOutlined";

function ButtonMenu({ button, style, variant, selected, onClick }) {
    const { icon, text, badge } = button;

    return (
        <Button
            variant={variant}
            className={`${style} ${selected ? "Selected" : ""}`}
            onClick={() => onClick(text)}
        >
            {badge ? (
                <span className="ButtonIcon">
                    <Badge className="SmallBadge"
                        badgeContent={badge} max={999}
                        color="error">
                        {icon}
                    </Badge>
                </span>
            ) : (
                <span className="ButtonIcon">{icon}</span>
            )}
            <span>{text}</span>
        </Button>
    );
}

function GroupButtonMenu({ buttons, style, variant, selectedButton, onSelect }) {
    return (
        <div className="GroupButton">
            {buttons.map((button) => (
                <ButtonMenu
                    key={button.text}
                    button={button}
                    style={style}
                    variant={variant}
                    selected={selectedButton === button.text}
                    onClick={onSelect}
                />
            ))}
        </div>
    );
}

export default function Menu() {
    const [selectedButton, setSelectedButton] = useState("Recettes");

    const leftButtons = [
        { text: "Recettes", icon: <RecettesIcon /> },
        { text: "Restaurants", icon: <RestaurantsIcon /> },
        { text: "Communauté", icon: <CommunauteIcon /> },
        { text: "Partages", icon: <PartagesIcon /> },
    ];

    const rightButtons = [
        { text: "Favoris", icon: <FavorisIcon /> },
        { text: "Messages", icon: <MessagesIcon />, badge: 1000 },
        { text: "Profil", icon: <ProfilIcon /> },
    ];

    return (
        <div className="Menu">
            <img className="HappyFoodyIcon" src={iconHappyFoody} alt="HappyFoody" />
            <GroupButtonMenu
                buttons={leftButtons}
                style="LeftButton"
                variant="contained"
                selectedButton={selectedButton}
                onSelect={setSelectedButton}
            />
            <div className="InsertButton" />
            <GroupButtonMenu
                buttons={rightButtons}
                style="RightButton"
                variant="text"
                selectedButton={selectedButton}
                onSelect={setSelectedButton}
            />
        </div>
    );
}