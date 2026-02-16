import React from 'react';

const StatBox = ({ label, value, subtext, icon: Icon, highlight = false }) => (
    <div className="bg-dark-border p-4 rounded-md flex items-center justify-between group hover:bg-dark-hover transition-colors">
        <div>
            <p className="text-text-secondary text-sm font-medium mb-1">{label}</p>
            <h3 className={`text-2xl font-bold ${highlight ? 'text-spotify-green' : 'text-text-primary'}`}>{value}</h3>
            {subtext && <p className="text-xs text-text-secondary mt-1">{subtext}</p>}
        </div>
        {Icon && <Icon className={`w-8 h-8 ${highlight ? 'text-spotify-green' : 'text-text-muted'} opacity-80 group-hover:opacity-100 transition-opacity`} />}
    </div>
);

export default StatBox;
