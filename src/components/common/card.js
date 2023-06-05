import React from 'react';
import './styles/card.css'; // Import the CSS file for the card styles

const Card = ({children}) => {
    return (
        <div className="card">
            {children}
        </div>
    );
}

export default Card;
