import { motion } from 'motion/react';
import type { StatBoxProps } from '../../types';

interface AnimatedStatBoxProps extends StatBoxProps {
    index?: number;
}

const StatBox = ({ label, value, subtext, icon: Icon, highlight = false, index = 0 }: AnimatedStatBoxProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.1 }}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className="glass-panel rounded-xl p-4 flex items-center justify-between gap-3 group cursor-pointer overflow-hidden focus-within:ring-2 focus-within:ring-spotify-green hover:-translate-y-1 hover:shadow-neon relative"
    >
        <div className="min-w-0 flex-1">
            <p className="text-text-secondary text-sm font-medium mb-1">{label}</p>
            <h3 className={`text-2xl font-bold truncate ${highlight ? 'text-spotify-green' : 'text-text-primary'}`}>{value}</h3>
            {subtext && <p className="text-xs text-text-secondary mt-1 truncate">{subtext}</p>}
        </div>
        {Icon && <Icon className={`w-8 h-8 flex-shrink-0 ${highlight ? 'text-spotify-green' : 'text-text-muted'} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />}
    </motion.div>
);

export default StatBox;
