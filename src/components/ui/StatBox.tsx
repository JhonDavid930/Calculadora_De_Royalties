import type { StatBoxProps } from '../../types';

const StatBox = ({ label, value, subtext, icon: Icon, highlight = false }: StatBoxProps) => (
    <div className="bg-dark-border p-4 rounded-md flex items-center justify-between gap-3 group hover:bg-dark-hover transition-all duration-200 hover:-translate-y-0.5 cursor-pointer overflow-hidden ring-offset-dark-bg focus-within:ring-2 focus-within:ring-spotify-green">
        <div className="min-w-0 flex-1">
            <p className="text-text-secondary text-sm font-medium mb-1">{label}</p>
            <h3 className={`text-2xl font-bold truncate ${highlight ? 'text-spotify-green' : 'text-text-primary'}`}>{value}</h3>
            {subtext && <p className="text-xs text-text-secondary mt-1 truncate">{subtext}</p>}
        </div>
        {Icon && <Icon className={`w-8 h-8 flex-shrink-0 ${highlight ? 'text-spotify-green' : 'text-text-muted'} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />}
    </div>
);

export default StatBox;
