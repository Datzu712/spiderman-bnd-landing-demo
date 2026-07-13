import { useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';

type HeroProps = {
    onOpenTrailer: () => void;
};

export default function Hero({ onOpenTrailer }: HeroProps) {
    const ref = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '17%']);
    const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '38%']);
    const fade = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

    return (
        <section ref={ref} id="inicio" className="bg-ink relative min-h-[100svh] overflow-hidden">
            <m.div className="absolute inset-0 scale-[1.03]" style={{ y: imageY }}>
                <img
                    src="/images/nyc-brand-new-day.webp"
                    alt="Amanecer entre los rascacielos de Nueva York"
                    className="h-full w-full object-cover object-[62%_center]"
                    fetchPriority="high"
                />
            </m.div>

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,10,.98)_0%,rgba(3,5,10,.76)_37%,rgba(3,5,10,.08)_73%),linear-gradient(0deg,#03050a_0%,transparent_34%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_33%,transparent_0%,rgba(3,5,10,.14)_40%,rgba(3,5,10,.6)_100%)]" />
            <div className="city-grid absolute inset-0 opacity-20" />

            <m.div
                style={{ y: copyY, opacity: fade }}
                className="webline-gutter relative z-[40] mx-auto flex min-h-[100svh] max-w-[1600px] items-end px-5 pt-32 pb-24 sm:px-8 sm:pb-20 lg:items-center lg:px-14 lg:pb-0 xl:px-20"
            >
                <div className="max-w-4xl">
                    <m.div
                        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="mb-5 flex flex-wrap items-center gap-3"
                    >
                        <span className="rounded-full border border-white/15 bg-black/20 px-4 py-2 font-mono text-[9px] font-semibold tracking-[0.28em] text-white/70 uppercase backdrop-blur-md sm:text-[10px]">
                            Marvel Studios <span className="text-spider-red mx-2">×</span> Sony
                            Pictures
                        </span>
                        <span className="text-dawn font-mono text-[9px] tracking-[0.26em] uppercase sm:text-[10px]">
                            31 · 07 · 2026
                        </span>
                    </m.div>

                    <m.h1
                        initial={
                            reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
                        }
                        animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                        transition={{ duration: 1.05, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="display-title max-w-[10ch] text-[clamp(4.7rem,13vw,11.5rem)] leading-[0.68] text-white"
                    >
                        SPIDER<span className="text-spider-red">-</span>MAN
                    </m.h1>
                    <m.div
                        initial={reduceMotion ? false : { opacity: 0, x: -36 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="brand-stroke font-display mt-3 text-[clamp(2.05rem,5.7vw,5.5rem)] leading-none tracking-[0.07em] text-transparent uppercase"
                    >
                        Brand New Day
                    </m.div>

                    <m.p
                        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.82 }}
                        className="mt-7 max-w-xl text-base leading-relaxed text-white/66 sm:text-lg"
                    >
                        El mundo olvidó a Peter Parker. Él no los olvidó. Una nueva mañana se abre
                        paso sobre Nueva York.
                    </m.p>

                    <m.div
                        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.94 }}
                        className="mt-9 flex flex-col gap-3 sm:flex-row"
                    >
                        <button
                            type="button"
                            onClick={onOpenTrailer}
                            className="web-button web-button-primary group"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Ver tráiler oficial
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                        <a href="#historia" className="web-button web-button-ghost group">
                            Entrar a la historia
                            <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" />
                        </a>
                    </m.div>
                </div>
            </m.div>

            <div className="absolute right-5 bottom-7 z-20 hidden items-center gap-3 text-[9px] font-semibold tracking-[0.28em] text-white/45 uppercase sm:right-9 sm:flex">
                <span>Desliza para balancearte</span>
                <span className="relative h-10 w-px overflow-hidden bg-white/20">
                    <span className="scroll-drop absolute top-0 left-0 h-4 w-px bg-white" />
                </span>
            </div>

            <div className="to-spider-red/80 absolute bottom-0 left-[9%] z-10 h-20 w-px bg-gradient-to-b from-transparent" />
        </section>
    );
}
