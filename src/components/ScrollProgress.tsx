import { m, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });

    return (
        <m.div
            aria-hidden="true"
            className="bg-spider-red fixed inset-x-0 top-0 z-[80] h-0.5 origin-left shadow-[0_0_12px_rgba(220,24,56,.8)]"
            style={{ scaleX }}
        />
    );
}
