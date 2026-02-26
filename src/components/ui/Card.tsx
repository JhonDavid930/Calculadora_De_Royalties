import { motion } from 'motion/react';
import type { CardProps } from '../../types';

const Card = ({ children, className = "" }: CardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`bg-dark-surface rounded-lg p-6 shadow-lg border border-dark-border transition-shadow duration-300 hover:shadow-xl hover:border-dark-hover ${className}`}
    >
        {children}
    </motion.div>
);

export default Card;
