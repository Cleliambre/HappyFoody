import React from 'react';
import './Card.css';

//build a Card
import {
    Card,
    CardMedia,
    Typography,
    IconButton,
    Box,
    CardActionArea
} from '@mui/material';

//icons
import FavoriteIconFalse from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIconTrue from '@mui/icons-material/FavoriteOutlined';


export default function GenericCard({ card, onLike, onClick }) {

    // Formatage du compteur de likes (ex: 1000 → "1K")
    const formatLikes = (num) => {
        if (num >= 1_000_000) return Math.floor(num / 1_000_000) + 'M';
        if (num >= 1_000) return Math.floor(num / 1_000) + 'K';
        return num.toString();
    };

    return (
        <Card onClick={() => onClick?.(card)} elevation={3} sx={{ borderRadius: '14px', overflow: 'hidden' }}>
            <CardActionArea>
                <div className="card">

                {/* Image à gauche */}
                <div className="thumbnail-container">
                    <CardMedia
                        component="img"
                        image={card.thumbnail}
                        alt={card.title}
                        className="thumbnail"
                    />
                </div>

                {/* Contenu central */}
                <Box className="info-container">
                    <Typography variant="h6" className="title">
                        {card.title}
                    </Typography>
                    {card.text}
                </Box>

                {/* Like button à droite */}
                <Box className="like-container">
                    <div onClick={(e) => e.stopPropagation()}>
                        <IconButton
                            aria-label="like"
                            onClick={() => onLike?.(card)}
                            size="small"
                        >
                            {card.liked ? <FavoriteIconTrue color='error' /> : <FavoriteIconFalse />}
                        </IconButton>
                    </div>
                    <Typography variant="body2" className="like-count">
                        {formatLikes(card.likes)}
                    </Typography>
                </Box>
                </div>
            </CardActionArea>
        </Card>

    );
}
