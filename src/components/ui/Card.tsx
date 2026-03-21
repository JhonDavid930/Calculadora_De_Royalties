import { motion } from 'motion/react';
import type { CardProps } from '../../types';

const Card = ({ children, className = "" }: CardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`glass-panel hover:shadow-neon p-6 relative overflow-hidden ${className}`}
    >
        {children}
    </motion.div>
);

export default Card;
