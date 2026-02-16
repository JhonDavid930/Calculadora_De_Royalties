import React from 'react';

const Card = ({ children, className = "" }) => (
    <div className={`bg-dark-surface rounded-lg p-6 shadow-lg border border-dark-border ${className}`}>
        {children}
    </div>
);

export default Card;
