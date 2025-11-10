import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

export const smileys = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: "Très Mécontent"
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: "Mécontent"
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: "Neutre"
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: "Satisfait"
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: "Très Satisfait"
    }
};

const formatNote = (num) => {
    return Math.floor(num+0.5);
};

// Fonction utilitaire
export function getSmileys(index) {
    return smileys[formatNote(index)] || smileys[3];
}
