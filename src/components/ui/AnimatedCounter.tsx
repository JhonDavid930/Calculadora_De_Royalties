import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'motion/react';

interface AnimatedCounterProps {
    value: number;
    formatter: (n: number) => string;
    duration?: number;
    className?: string;
}

/**
 * Componente que interpola suavemente un número hacia otro
 * usando spring physics de Motion. El resultado visual es un
 * "velocímetro digital" que sube o baja fluidamente.
 */
const AnimatedCounter = ({ value, formatter, duration = 0.8, className = '' }: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 100,
        damping: 30,
        duration,
    });
    const displayValue = useTransform(springValue, (latest) => formatter(latest));

    useEffect(() => {
        motionValue.set(value);
    }, [value, motionValue]);

    useEffect(() => {
        const unsubscribe = displayValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = latest;
            }
        });
        return unsubscribe;
    }, [displayValue]);

    return <motion.span ref={ref} className={className} />;
};

export default AnimatedCounter;
