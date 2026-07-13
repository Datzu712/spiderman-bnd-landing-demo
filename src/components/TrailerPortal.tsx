import {
    useEffect,
    useEffectEvent,
    useId,
    useRef,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { ExternalLink, Play, X } from 'lucide-react';

const TRAILER_ID = '8TZMtslA3UY';
const TRAILER_URL = `https://www.youtube-nocookie.com/embed/${TRAILER_ID}?autoplay=1&rel=0&modestbranding=1`;
const TRAILER_WATCH_URL = `https://www.youtube.com/watch?v=${TRAILER_ID}`;
const PORTAL_OPENING_MS = 980;

const FOCUSABLE_ELEMENTS = [
    'a[href]',
    'button:not([disabled])',
    'iframe',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

const SPARKS = Array.from({ length: 32 }, (_, index) => ({
    angle: index * 11.25,
    delay: (index % 8) * 0.055,
    length: 22 + (index % 5) * 8,
    radius: 38 + (index % 4) * 4,
}));

type PortalFxProps = {
    portalReady: boolean;
    shouldReduceMotion: boolean;
};

function PortalRings({ portalReady, shouldReduceMotion }: PortalFxProps) {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
            style={{ width: 'min(94vw, 94svh)' }}
        >
            <m.div
                className="absolute inset-[4%] rounded-full opacity-80 blur-[1px]"
                style={{
                    background:
                        'repeating-conic-gradient(from 12deg, transparent 0deg 8deg, rgba(255,184,76,.95) 9deg 10deg, transparent 11deg 17deg, rgba(220,24,56,.78) 18deg 20deg)',
                    maskImage: 'radial-gradient(transparent 0 64%, #000 65% 69%, transparent 70%)',
                    WebkitMaskImage:
                        'radial-gradient(transparent 0 64%, #000 65% 69%, transparent 70%)',
                }}
                initial={{ rotate: -110, scale: 0.12, opacity: 0 }}
                animate={{
                    rotate: portalReady ? 190 : 100,
                    scale: portalReady ? 1.06 : 1,
                    opacity: portalReady ? 0.42 : 0.92,
                }}
                transition={{
                    duration: shouldReduceMotion ? 0 : portalReady ? 0.75 : 0.95,
                    ease: [0.16, 1, 0.3, 1],
                }}
            />

            <m.div
                className="absolute inset-[9%] rounded-full border border-amber-200/35 shadow-[0_0_22px_rgba(255,179,63,.65),inset_0_0_20px_rgba(220,24,56,.45)]"
                style={{
                    background:
                        'conic-gradient(from 80deg, transparent, rgba(255,176,56,.92), transparent 17%, rgba(220,24,56,.82), transparent 38%, rgba(128,230,255,.7), transparent 60%, rgba(255,176,56,.9), transparent)',
                    maskImage: 'radial-gradient(transparent 0 71%, #000 72% 74%, transparent 75%)',
                    WebkitMaskImage:
                        'radial-gradient(transparent 0 71%, #000 72% 74%, transparent 75%)',
                }}
                initial={{ rotate: 130, scale: 0.08, opacity: 0 }}
                animate={{
                    rotate: portalReady ? -170 : -80,
                    scale: portalReady ? 1.02 : 1,
                    opacity: portalReady ? 0.5 : 1,
                }}
                transition={{
                    duration: shouldReduceMotion ? 0 : portalReady ? 0.85 : 0.9,
                    ease: [0.16, 1, 0.3, 1],
                }}
            />

            <m.div
                className="border-spider-red/45 absolute inset-[15%] rounded-full border shadow-[0_0_70px_rgba(220,24,56,.34)]"
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: portalReady ? 1.22 : 1, opacity: portalReady ? 0.16 : 0.75 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
            />

            {!shouldReduceMotion &&
                SPARKS.map((spark, index) => (
                    <div
                        key={spark.angle}
                        className="absolute inset-0"
                        style={{ transform: `rotate(${spark.angle}deg)` }}
                    >
                        <m.span
                            className="absolute top-1/2 left-1/2 block h-px origin-left bg-gradient-to-r from-amber-100 via-amber-400 to-transparent shadow-[0_0_7px_rgba(255,190,74,.9)]"
                            style={{ width: spark.length }}
                            initial={{ x: '8vmin', opacity: 0, scaleX: 0 }}
                            animate={{
                                x: [`${spark.radius * 0.35}vmin`, `${spark.radius}vmin`],
                                opacity: portalReady ? [0, 0.45, 0] : [0, 1, 0],
                                scaleX: [0.2, 1, 0.1],
                            }}
                            transition={{
                                duration: 0.72 + (index % 4) * 0.1,
                                delay: spark.delay,
                                repeat: portalReady ? Infinity : 1,
                                repeatDelay: 0.6 + (index % 5) * 0.12,
                                ease: 'easeOut',
                            }}
                        />
                    </div>
                ))}

            <m.div
                className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(11,16,31,.86)_0%,rgba(4,6,13,.96)_54%,rgba(220,24,56,.2)_71%,transparent_73%)] shadow-[inset_0_0_70px_rgba(0,0,0,.95),0_0_90px_rgba(238,49,58,.28)]"
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: portalReady ? 1.7 : 1, opacity: portalReady ? 0 : 1 }}
                transition={{
                    duration: shouldReduceMotion ? 0 : portalReady ? 0.55 : 0.8,
                    ease: 'easeOut',
                }}
            />
        </div>
    );
}

function TrailerStage({ portalReady, shouldReduceMotion }: PortalFxProps) {
    return (
        <AnimatePresence mode="wait">
            {!portalReady ? (
                <m.div
                    key="portal-status"
                    className="relative z-10 flex flex-col items-center"
                    exit={{ opacity: 0, scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="font-sans text-[9px] font-extrabold tracking-[0.34em] text-amber-200/70 uppercase">
                        Sincronizando dimensiones
                    </span>
                    <span className="mt-3 h-px w-40 overflow-hidden bg-white/10">
                        <m.span
                            className="from-spider-red block h-full origin-left bg-gradient-to-r via-amber-300 to-cyan-200"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                duration: PORTAL_OPENING_MS / 1000,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        />
                    </span>
                </m.div>
            ) : (
                <m.div
                    key="trailer-player"
                    className="relative z-20"
                    style={{ width: 'min(92vw, calc(78svh * 16 / 9))' }}
                    initial={
                        shouldReduceMotion
                            ? false
                            : { opacity: 0, scale: 0.72, clipPath: 'circle(0% at 50% 50%)' }
                    }
                    animate={{ opacity: 1, scale: 1, clipPath: 'circle(75% at 50% 50%)' }}
                    exit={{ opacity: 0, scale: 0.92, clipPath: 'circle(0% at 50% 50%)' }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.65,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    <div className="absolute -inset-3 -z-10 rounded-[1.4rem] bg-[conic-gradient(from_30deg,rgba(220,24,56,.9),rgba(255,188,71,.82),rgba(105,223,255,.68),rgba(220,24,56,.9))] opacity-70 blur-lg" />
                    <div className="relative overflow-hidden rounded-xl border border-amber-100/35 bg-black p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,.08),0_0_90px_rgba(220,24,56,.28)] sm:rounded-2xl">
                        <div className="aspect-video overflow-hidden rounded-[calc(.75rem-2px)] bg-black sm:rounded-[calc(1rem-2px)]">
                            <iframe
                                className="h-full w-full"
                                src={TRAILER_URL}
                                title="Tráiler oficial de Spider-Man"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                        <span className="pointer-events-none absolute top-0 left-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-100 to-transparent" />
                        <span className="pointer-events-none absolute right-4 bottom-0 h-px w-24 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-4 px-1 font-sans text-[9px] font-extrabold tracking-[0.18em] text-white/55 uppercase sm:text-[10px] sm:tracking-[0.22em]">
                        <span>Señal dimensional estable</span>
                        <a
                            href={TRAILER_WATCH_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 text-white/75 transition hover:text-white focus-visible:text-white"
                        >
                            Ver en YouTube
                            <ExternalLink className="size-3" aria-hidden="true" />
                        </a>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}

function PortalScene({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
    const [timerDone, setTimerDone] = useState(false);

    useEffect(() => {
        if (shouldReduceMotion) return;

        const openingTimer = window.setTimeout(() => {
            setTimerDone(true);
        }, PORTAL_OPENING_MS);

        return () => window.clearTimeout(openingTimer);
    }, [shouldReduceMotion]);

    const portalReady = shouldReduceMotion || timerDone;

    return (
        <>
            <PortalRings portalReady={portalReady} shouldReduceMotion={shouldReduceMotion} />
            <TrailerStage portalReady={portalReady} shouldReduceMotion={shouldReduceMotion} />
        </>
    );
}

type TrailerPortalProps = {
    className?: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

export function TrailerPortal({ className = '', isOpen, onOpenChange }: TrailerPortalProps) {
    const shouldReduceMotion = useReducedMotion() ?? false;
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const titleId = useId();
    const descriptionId = useId();

    const closeTrailer = () => onOpenChange(false);
    const requestClose = useEffectEvent(() => onOpenChange(false));

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        const appRoot = document.getElementById('root');
        const previouslyFocused =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : triggerRef.current;
        const rootWasInert = appRoot?.hasAttribute('inert') ?? false;

        document.body.style.overflow = 'hidden';
        appRoot?.setAttribute('inert', '');

        const focusFrame = window.requestAnimationFrame(() => {
            closeButtonRef.current?.focus();
        });

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                requestClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = previousOverflow;
            if (!rootWasInert) appRoot?.removeAttribute('inert');
            previouslyFocused?.focus();
        };
    }, [isOpen]);

    const keepFocusInDialog = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Tab') return;

        const focusable = Array.from(
            dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS) ?? [],
        ).filter((element) => element.offsetParent !== null);

        if (focusable.length === 0) {
            event.preventDefault();
            dialogRef.current?.focus();
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    const portal = (
        <AnimatePresence>
            {isOpen && (
                <m.div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    aria-describedby={descriptionId}
                    tabIndex={-1}
                    onKeyDown={keepFocusInDialog}
                    onMouseDown={(event) => {
                        if (event.currentTarget === event.target) closeTrailer();
                    }}
                    className="fixed inset-0 z-[160] grid place-items-center overflow-hidden bg-[#010207] outline-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
                >
                    <h2 id={titleId} className="sr-only">
                        Tráiler oficial de Spider-Man
                    </h2>
                    <p id={descriptionId} className="sr-only">
                        Reproductor de video en una ventana de pantalla completa. Presiona Escape
                        para cerrar.
                    </p>

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(226,29,58,.18),transparent_25%),radial-gradient(circle_at_50%_50%,rgba(248,181,72,.10),transparent_47%),linear-gradient(135deg,#010207_0%,#050813_52%,#010207_100%)]" />
                    <m.div
                        aria-hidden="true"
                        className="via-spider-red/55 pointer-events-none absolute inset-x-[-10vw] top-1/2 h-px bg-gradient-to-r from-transparent to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: [0, 1, 0.7], opacity: [0, 0.9, 0.24] }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: 'easeOut' }}
                    />

                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={closeTrailer}
                        className="group hover:border-spider-red/70 hover:bg-spider-red absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-30 flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 font-sans text-[10px] font-extrabold tracking-[0.18em] text-white uppercase backdrop-blur-xl transition outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-7"
                        aria-label="Cerrar el tráiler"
                    >
                        <span className="hidden sm:inline">Cerrar portal</span>
                        <X
                            className="size-5 transition-transform duration-300 group-hover:rotate-90"
                            aria-hidden="true"
                        />
                    </button>

                    <PortalScene shouldReduceMotion={shouldReduceMotion} />
                </m.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className={`inline-flex flex-col items-center ${className}`}>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => onOpenChange(true)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                className="group focus-visible:ring-offset-ink relative grid aspect-square w-36 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-8 sm:w-40"
            >
                <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_30deg,transparent_0_15%,rgba(255,184,72,.9)_20%,transparent_27%_48%,rgba(220,24,56,.9)_55%,transparent_62%_78%,rgba(113,225,255,.75)_84%,transparent_91%)] opacity-70 blur-md transition duration-500 group-hover:scale-110 group-hover:opacity-100 motion-safe:animate-[spin_8s_linear_infinite] motion-reduce:animate-none" />
                <span className="absolute inset-2 rounded-full border border-dashed border-amber-200/55 transition duration-700 group-hover:scale-105 group-hover:rotate-90 motion-reduce:transition-none" />
                <span className="border-spider-red/65 absolute inset-5 rounded-full border transition duration-700 group-hover:-rotate-45 motion-reduce:transition-none" />
                <span className="group-hover:bg-spider-red absolute inset-7 rounded-full bg-[#070911] shadow-[inset_0_0_25px_rgba(220,24,56,.34),0_0_30px_rgba(255,179,63,.18)] transition duration-500" />
                <Play
                    className="relative z-10 ml-1 size-8 fill-current text-white transition duration-300 group-hover:scale-110"
                    aria-hidden="true"
                />
                <span className="sr-only">Abrir el portal y reproducir el tráiler oficial</span>
            </button>
            <span className="pointer-events-none mt-5 font-sans text-[10px] font-extrabold tracking-[0.24em] text-white/65 uppercase">
                Abrir tráiler
            </span>
            {typeof document !== 'undefined' && createPortal(portal, document.body)}
        </div>
    );
}

export default TrailerPortal;
