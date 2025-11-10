import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import {smileys} from "./getSmileys";

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{smileys[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function RadioGroupRating() {
    return (
        <StyledRating
            name="highlight-selected-only"
            IconContainerComponent={IconContainer}
            getLabelText={(value) => smileys[value].label}
            highlightSelectedOnly
        />
    );
}