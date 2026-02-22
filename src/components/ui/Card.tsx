import type { CardProps } from '../../types';

const Card = ({ children, className = "" }: CardProps) => (
    <div className={`bg-dark-surface rounded-lg p-6 shadow-lg border border-dark-border transition-all duration-300 hover:shadow-xl hover:border-dark-hover hover:-translate-y-0.5 ${className}`}>
        {children}
    </div>
);

export default Card;
