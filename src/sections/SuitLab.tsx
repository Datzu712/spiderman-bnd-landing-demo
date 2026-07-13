import { useId, useRef, useState } from 'react';
import {
    Activity,
    Eye,
    Gauge,
    RotateCcw,
    ScanSearch,
    ShieldCheck,
    type LucideIcon,
} from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';

type ModuleId = 'kinetic' | 'optics' | 'sensors' | 'web';

type SuitLabProps = {
    isSymbioteBreachActive?: boolean;
    onSymbioteBreach?: () => void;
};

type SuitModule = {
    id: ModuleId;
    index: string;
    title: string;
    cardTitle: string;
    shortTitle: string;
    metric: string;
    metricLabel: string;
    cardMetricLabel: string;
    copy: string;
    scanAt: number;
    point: [number, number];
    label: [number, number];
    icon: LucideIcon;
};

const SUIT_MODULES: SuitModule[] = [
    {
        id: 'kinetic',
        index: '01',
        title: 'Malla cinética',
        cardTitle: 'Malla cinética',
        shortTitle: 'MALLA / IMPACTO',
        metric: '−63%',
        metricLabel: 'energía dispersada',
        cardMetricLabel: 'impacto',
        copy: 'Tres capas de fibra canalizan el golpe hacia hombros y costillas sin endurecer el movimiento.',
        scanAt: 28,
        point: [163, 370],
        label: [34, 324],
        icon: ShieldCheck,
    },
    {
        id: 'optics',
        index: '02',
        title: 'Óptica adaptativa',
        cardTitle: 'Óptica',
        shortTitle: 'ÓPTICA / LATENCIA',
        metric: '4.6 ms',
        metricLabel: 'respuesta del lente',
        cardMetricLabel: 'latencia',
        copy: 'El iris mecánico amplía el campo periférico y prioriza trayectorias antes del siguiente balanceo.',
        scanAt: 44,
        point: [198, 166],
        label: [38, 104],
        icon: Eye,
    },
    {
        id: 'sensors',
        index: '03',
        title: 'Núcleo sensorial',
        cardTitle: 'Núcleo sensorial',
        shortTitle: 'NÚCLEO / COBERTURA',
        metric: '210°',
        metricLabel: 'lectura espacial',
        cardMetricLabel: 'campo',
        copy: 'El emblema funciona como nodo de tensión y fusiona alertas del traje en una sola lectura corporal.',
        scanAt: 61,
        point: [240, 421],
        label: [438, 374],
        icon: Activity,
    },
    {
        id: 'web',
        index: '04',
        title: 'Presión de telaraña',
        cardTitle: 'Presión web',
        shortTitle: 'WEB / PRESIÓN',
        metric: '42 bar',
        metricLabel: 'salida estabilizada',
        cardMetricLabel: 'presión',
        copy: 'Microválvulas compensan altura, temperatura y ángulo para mantener constante cada disparo.',
        scanAt: 79,
        point: [354, 488],
        label: [174, 536],
        icon: Gauge,
    },
];

const SYMBIOTE_SCAN_THRESHOLD = 88;

const clampScan = (value: number) => Math.min(90, Math.max(10, Math.round(value)));

const getNearestModule = (scan: number) =>
    SUIT_MODULES.reduce((nearest, module) =>
        Math.abs(module.scanAt - scan) < Math.abs(nearest.scanAt - scan) ? module : nearest,
    );

function TechnicalSuit({ idPrefix }: { idPrefix: string }) {
    return (
        <svg viewBox="0 0 480 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
                <clipPath id={`${idPrefix}-tech-clip`}>
                    <path d="M240 58c-59 0-99 47-96 112 1 42 17 87 46 107l-15 42c-68 25-111 88-121 190l-6 91h384l-6-91c-10-102-53-165-121-190l-15-42c29-20 45-65 46-107 3-65-37-112-96-112Z" />
                </clipPath>
                <pattern
                    id={`${idPrefix}-micro-mesh`}
                    width="20"
                    height="18"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M5 1h10l5 8-5 8H5L0 9Z"
                        fill="none"
                        stroke="#83e8ff"
                        strokeWidth=".65"
                        opacity=".34"
                    />
                    <circle cx="10" cy="9" r="1" fill="#83e8ff" opacity=".45" />
                </pattern>
                <linearGradient id={`${idPrefix}-tech-fill`} x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="#061827" />
                    <stop offset=".55" stopColor="#0a2942" />
                    <stop offset="1" stopColor="#06101c" />
                </linearGradient>
                <filter id={`${idPrefix}-tech-glow`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g clipPath={`url(#${idPrefix}-tech-clip)`}>
                <path
                    d="M240 58c-59 0-99 47-96 112 1 42 17 87 46 107l-15 42c-68 25-111 88-121 190l-6 91h384l-6-91c-10-102-53-165-121-190l-15-42c29-20 45-65 46-107 3-65-37-112-96-112Z"
                    fill={`url(#${idPrefix}-tech-fill)`}
                />
                <path
                    d="M240 58c-59 0-99 47-96 112 1 42 17 87 46 107l-15 42c-68 25-111 88-121 190l-6 91h384l-6-91c-10-102-53-165-121-190l-15-42c29-20 45-65 46-107 3-65-37-112-96-112Z"
                    fill={`url(#${idPrefix}-micro-mesh)`}
                    opacity=".9"
                />

                <g fill="none" strokeLinecap="round">
                    <path
                        d="M73 494C133 467 158 413 184 350M407 494C347 467 322 413 296 350M184 350c20 24 36 39 56 52 20-13 36-28 56-52"
                        stroke="#83e8ff"
                        strokeWidth="3"
                        opacity=".76"
                    />
                    <path
                        d="M91 522c70-28 98-73 121-118M389 522c-70-28-98-73-121-118"
                        stroke="#83e8ff"
                        strokeWidth="1.2"
                        strokeDasharray="7 8"
                        opacity=".7"
                    />
                    <path
                        d="M120 335c34 18 65 34 120 67 55-33 86-49 120-67"
                        stroke="#ff3152"
                        strokeWidth="2"
                        opacity=".75"
                    />
                    <path
                        d="M240 291v110M217 294l23 107 23-107"
                        stroke="#83e8ff"
                        strokeWidth="1"
                        strokeDasharray="4 6"
                        opacity=".62"
                    />
                </g>

                <g fill="#83e8ff">
                    {[112, 146, 178, 302, 334, 368].map((x, index) => (
                        <circle key={x} cx={x} cy={448 + (index % 2) * 32} r="3.5" opacity=".72" />
                    ))}
                </g>

                <g stroke="#dffaff" fill="none" opacity=".95">
                    <path
                        d="M225 142c-15-21-37-28-58-22 2 42 14 70 44 84 12-18 17-39 14-62Zm30 0c15-21 37-28 58-22-2 42-14 70-44 84-12-18-17-39-14-62Z"
                        strokeWidth="4"
                    />
                    <path
                        d="m176 137 37 49m-28-58 31 41m88-32-37 49m28-58-31 41"
                        stroke="#83e8ff"
                        strokeWidth="1.2"
                        opacity=".85"
                    />
                    <circle cx="198" cy="160" r="22" stroke="#83e8ff" strokeDasharray="3 5" />
                    <circle cx="282" cy="160" r="22" stroke="#83e8ff" strokeDasharray="3 5" />
                    <path
                        d="M185 160h26m-13-13v26m71-13h26m-13-13v26"
                        stroke="#ff3152"
                        strokeWidth="1"
                    />
                </g>

                <g transform="translate(331 461) rotate(-12)">
                    <rect
                        width="68"
                        height="46"
                        rx="12"
                        fill="#06121d"
                        stroke="#83e8ff"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M12 15h42M12 23h31M12 31h48"
                        stroke="#83e8ff"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                    <circle cx="55" cy="15" r="5" fill="#ff3152" />
                    <path d="M20 39v25m12-25v25m12-25v25" stroke="#83e8ff" opacity=".7" />
                </g>

                <g filter={`url(#${idPrefix}-tech-glow)`}>
                    <circle cx="240" cy="421" r="10" fill="#ff3152" opacity=".9" />
                    <circle
                        cx="240"
                        cy="421"
                        r="24"
                        fill="none"
                        stroke="#ff3152"
                        strokeWidth="1.5"
                        opacity=".65"
                    />
                    <path
                        d="M240 431c8 0 12 10 12 22s-5 25-12 34c-7-9-12-22-12-34s4-22 12-22Z"
                        fill="none"
                        stroke="#83e8ff"
                        strokeWidth="3"
                    />
                    <path
                        d="m231 437-33-24-27-12m78 36 33-24 27-12m-80 51-37 10-22 20m82-30 37 10 22 20"
                        fill="none"
                        stroke="#83e8ff"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </g>

                {Array.from({ length: 17 }, (_, index) => (
                    <path
                        key={index}
                        d={`M${82 + index * 20} 310v280`}
                        stroke={index % 4 === 0 ? '#ff3152' : '#83e8ff'}
                        strokeWidth={index % 4 === 0 ? 1 : 0.55}
                        strokeDasharray={index % 3 === 0 ? '4 8' : '2 12'}
                        opacity={index % 4 === 0 ? 0.34 : 0.18}
                    />
                ))}
            </g>

            <g fill="none" stroke="#83e8ff" opacity=".45">
                <path d="M24 96h24m-24 0v24M456 96h-24m24 0v24M24 552h24m-24 0v-24M456 552h-24m24 0v-24" />
                <path d="M32 160h18m-18 40h10m-10 40h18m-18 40h10m-10 40h18m-18 40h10m-10 40h18m-18 40h10m-10 40h18" />
            </g>
        </svg>
    );
}

function BaseSuit({ idPrefix }: { idPrefix: string }) {
    return (
        <svg viewBox="0 0 480 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
                <linearGradient id={`${idPrefix}-suit-red`} x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="#ff3152" />
                    <stop offset=".52" stopColor="#c31331" />
                    <stop offset="1" stopColor="#760b20" />
                </linearGradient>
                <linearGradient id={`${idPrefix}-suit-blue`} x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="#184f8a" />
                    <stop offset="1" stopColor="#071a37" />
                </linearGradient>
                <pattern
                    id={`${idPrefix}-web-pattern`}
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M16 0v32M0 16h32M4 4l24 24M28 4 4 28"
                        stroke="#26050c"
                        strokeWidth="1.2"
                        opacity=".58"
                    />
                </pattern>
                <clipPath id={`${idPrefix}-mask-clip`}>
                    <path d="M240 58c-59 0-99 47-96 112 1 42 17 87 46 107 14 10 31 16 50 16s36-6 50-16c29-20 45-65 46-107 3-65-37-112-96-112Z" />
                </clipPath>
                <filter id={`${idPrefix}-lens-glow`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <path
                d="M240 58c-59 0-99 47-96 112 1 42 17 87 46 107l-15 42c-68 25-111 88-121 190l-6 91h384l-6-91c-10-102-53-165-121-190l-15-42c29-20 45-65 46-107 3-65-37-112-96-112Z"
                fill={`url(#${idPrefix}-suit-red)`}
            />
            <path
                d="M240 58c-59 0-99 47-96 112 1 42 17 87 46 107l-15 42c-68 25-111 88-121 190l-6 91h384l-6-91c-10-102-53-165-121-190l-15-42c29-20 45-65 46-107 3-65-37-112-96-112Z"
                fill={`url(#${idPrefix}-web-pattern)`}
            />
            <path
                d="M174 319c20 28 41 46 66 59 25-13 46-31 66-59 36 12 65 32 84 62l-55 65-31 154H176l-31-154-55-65c19-30 48-50 84-62Z"
                fill={`url(#${idPrefix}-suit-blue)`}
            />
            <path
                d="M174 319c20 28 41 46 66 59 25-13 46-31 66-59"
                fill="none"
                stroke="#2e73b9"
                strokeWidth="3"
            />
            <path
                d="M145 446l31 154m159-154-31 154M90 381l55 65m245-65-55 65"
                stroke="#07152d"
                strokeWidth="5"
                opacity=".75"
            />

            <g
                clipPath={`url(#${idPrefix}-mask-clip)`}
                stroke="#2b040c"
                strokeWidth="2"
                fill="none"
                opacity=".62"
            >
                <path d="M240 175V60M240 175 205 62M240 175 275 62M240 175 165 85M240 175 315 85M240 175 146 150M240 175 334 150M240 175 150 220M240 175 330 220M240 175 185 262M240 175 295 262M240 175V293" />
                <circle cx="240" cy="175" r="38" />
                <circle cx="240" cy="175" r="72" />
                <circle cx="240" cy="175" r="106" />
            </g>

            <path
                d="M225 142c-15-21-37-28-58-22 2 42 14 70 44 84 12-18 17-39 14-62Zm30 0c15-21 37-28 58-22-2 42-14 70-44 84-12-18-17-39-14-62Z"
                fill="none"
                stroke="#080c13"
                strokeWidth="8"
            />
            <path
                d="M225 142c-15-21-37-28-58-22 2 42 14 70 44 84 12-18 17-39 14-62Zm30 0c15-21 37-28 58-22-2 42-14 70-44 84-12-18-17-39-14-62Z"
                fill="#effcff"
                filter={`url(#${idPrefix}-lens-glow)`}
            />

            <circle cx="240" cy="400" r="8" fill="#07090d" />
            <path
                d="M240 410c8 0 12 10 12 22s-5 26-12 34c-7-8-12-22-12-34s4-22 12-22Z"
                fill="#07090d"
            />
            <path
                d="m233 406-27-20-18-24m59 44 27-20 18-24m-61 56-35-6-24-14m77 20 35-6 24-14m-77 32-31 6-20 18m69-24 31 6 20 18m-65-10-19 22-10 22m39-44 19 22 10 22"
                stroke="#07090d"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}

function SuitFigure({
    reveal,
    active,
    symbioteActive,
}: {
    reveal: number;
    active: SuitModule;
    symbioteActive: boolean;
}) {
    const reduceMotion = useReducedMotion();
    const rawId = useId();
    const idPrefix = `suit-${rawId.replace(/:/g, '')}`;
    const displayModule = symbioteActive
        ? {
              id: 'symbiote',
              index: '05',
              shortTitle: 'VENOM / SIMBIOSIS',
              metric: 'HOSTIL',
              point: [286, 330] as [number, number],
              label: [438, 268] as [number, number],
          }
        : active;
    const [pointX, pointY] = displayModule.point;
    const [labelX, labelY] = displayModule.label;
    const labelOnLeft = labelX < pointX;
    const elbowX = labelOnLeft ? pointX - 44 : pointX + 44;
    const labelLineX = labelOnLeft ? labelX + 8 : labelX - 8;
    const calloutColor = symbioteActive ? '#f4f0ff' : '#f5c978';
    const metricColor = symbioteActive ? '#b99cff' : '#83e8ff';

    return (
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050810] shadow-[0_30px_90px_rgba(0,0,0,.45)] lg:h-[clamp(420px,62dvh,560px)] lg:w-auto lg:max-w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(220,24,56,.22),transparent_38%),linear-gradient(180deg,#0b101a_0%,#04060b_100%)]" />
            <div className="city-grid absolute inset-0 opacity-20" />
            <BaseSuit idPrefix={idPrefix} />

            <div
                className="absolute inset-0 overflow-hidden"
                style={{
                    clipPath: `polygon(0 0, ${reveal}% 0, ${Math.max(0, reveal - 9)}% 100%, 0 100%)`,
                }}
            >
                <div className="blueprint-grid absolute inset-0 opacity-35" />
                <TechnicalSuit idPrefix={idPrefix} />
            </div>

            <AnimatePresence>
                {symbioteActive && (
                    <m.svg
                        viewBox="0 0 480 600"
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        aria-hidden="true"
                        initial={
                            reduceMotion ? false : { opacity: 0, clipPath: 'circle(0% at 72% 55%)' }
                        }
                        animate={{ opacity: 1, clipPath: 'circle(78% at 72% 55%)' }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.55,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <defs>
                            <clipPath id={`${idPrefix}-symbiote-clip`}>
                                <path d="M240 58c-59 0-99 47-96 112 1 42 17 87 46 107l-15 42c-68 25-111 88-121 190l-6 91h384l-6-91c-10-102-53-165-121-190l-15-42c29-20 45-65 46-107 3-65-37-112-96-112Z" />
                            </clipPath>
                            <linearGradient
                                id={`${idPrefix}-symbiote-oil`}
                                x1="0"
                                x2="1"
                                y1="0"
                                y2="1"
                            >
                                <stop stopColor="#010204" />
                                <stop offset=".58" stopColor="#09070f" />
                                <stop offset="1" stopColor="#241831" />
                            </linearGradient>
                        </defs>
                        <g clipPath={`url(#${idPrefix}-symbiote-clip)`}>
                            <path
                                d="M480 600H205c68-46 65-98 120-135 42-29 62-73 76-132 27 64 50 155 79 267Z"
                                fill={`url(#${idPrefix}-symbiote-oil)`}
                                opacity=".98"
                            />
                            <path
                                d="M240 58c-59 0-99 47-96 112 1 42 17 87 46 107 14 10 31 16 50 16s36-6 50-16c29-20 45-65 46-107 3-65-37-112-96-112Z"
                                fill="#010204"
                                opacity=".98"
                            />
                            <path
                                d="M445 590C354 523 417 444 321 394S394 275 300 223M422 604C312 552 367 484 274 455S331 352 248 310M470 541C379 490 449 398 351 366"
                                fill="none"
                                stroke="#020306"
                                strokeWidth="34"
                                strokeLinecap="round"
                            />
                            <path
                                d="M445 590C354 523 417 444 321 394S394 275 300 223M422 604C312 552 367 484 274 455S331 352 248 310"
                                fill="none"
                                stroke="#513863"
                                strokeWidth="3"
                                strokeLinecap="round"
                                opacity=".65"
                            />
                            <path
                                d="M158 126c20-13 47-8 70 18-27-5-46 10-62 43 3-24 0-44-8-61Zm164 0c-20-13-47-8-70 18 27-5 46 10 62 43-3-24 0-44 8-61Z"
                                fill="#f8fbff"
                            />
                            <path
                                d="M178 218c33 21 91 21 124 0-9 43-29 65-62 65s-53-22-62-65Z"
                                fill="#26040d"
                                stroke="#6f1636"
                                strokeWidth="2"
                            />
                            <path
                                d="m184 222 14 25 12-20 13 29 12-25 11 27 13-27 12 25 13-29 12 20 14-25c-38 16-82 16-120 0Z"
                                fill="#f7fbff"
                            />
                            <path
                                d="M226 269c8-11 20-11 28 0l-4 34c-3 16-17 16-20 0Z"
                                fill="#8f1748"
                                stroke="#d84c83"
                                strokeWidth="1.5"
                            />
                        </g>
                    </m.svg>
                )}
            </AnimatePresence>

            <div
                aria-hidden="true"
                className="via-skyline-blue/20 absolute inset-y-0 w-6 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent blur-[1px]"
                style={{
                    left: `${reveal}%`,
                    transform: 'translateX(-50%) skewX(-6deg)',
                }}
            />
            <div
                aria-hidden="true"
                className="absolute inset-y-0 w-px bg-white shadow-[0_0_8px_2px_rgba(131,232,255,.9),0_0_28px_7px_rgba(131,232,255,.3)]"
                style={{ left: `${reveal}%`, transform: 'skewX(-6deg)' }}
            />

            <svg
                viewBox="0 0 480 600"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                {SUIT_MODULES.map((module) => {
                    const discovered = reveal >= module.scanAt - 2;
                    const selected = !symbioteActive && module.id === active.id;
                    return (
                        <g key={module.id} opacity={selected ? 1 : discovered ? 0.48 : 0.14}>
                            <circle
                                cx={module.point[0]}
                                cy={module.point[1]}
                                r={selected ? 8 : 4}
                                fill={selected ? '#f5c978' : '#83e8ff'}
                            />
                            <circle
                                cx={module.point[0]}
                                cy={module.point[1]}
                                r={selected ? 15 : 9}
                                fill="none"
                                stroke={selected ? '#f5c978' : '#83e8ff'}
                                strokeWidth="1"
                            />
                        </g>
                    );
                })}

                <AnimatePresence mode="wait">
                    <m.g
                        key={displayModule.id}
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.22 }}
                    >
                        {!reduceMotion && (
                            <m.circle
                                cx={pointX}
                                cy={pointY}
                                r="12"
                                fill="none"
                                stroke={calloutColor}
                                strokeWidth="1.5"
                                initial={{ r: 10, opacity: 0.9 }}
                                animate={{ r: [10, 25], opacity: [0.9, 0] }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: 'easeOut',
                                }}
                            />
                        )}
                        <path
                            d={`M${pointX} ${pointY} L${elbowX} ${labelY - 10} L${labelLineX} ${labelY - 10}`}
                            fill="none"
                            stroke={calloutColor}
                            strokeWidth="1.25"
                        />
                        <text
                            x={labelX}
                            y={labelY - 17}
                            textAnchor={labelOnLeft ? 'start' : 'end'}
                            fill={calloutColor}
                            fontSize="8"
                            fontWeight="700"
                            letterSpacing="1.3"
                        >
                            MÓDULO {displayModule.index}
                        </text>
                        <text
                            x={labelX}
                            y={labelY}
                            textAnchor={labelOnLeft ? 'start' : 'end'}
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="800"
                            letterSpacing=".8"
                        >
                            {displayModule.shortTitle}
                        </text>
                        <text
                            x={labelX}
                            y={labelY + 15}
                            textAnchor={labelOnLeft ? 'start' : 'end'}
                            fill={metricColor}
                            fontSize="9"
                            fontWeight="700"
                            letterSpacing="1"
                        >
                            {displayModule.metric}
                        </text>
                    </m.g>
                </AnimatePresence>
            </svg>

            <div
                className="text-skyline-blue absolute top-4 -translate-x-1/2 font-sans text-[8px] font-extrabold tabular-nums"
                style={{ left: `${reveal}%` }}
            >
                {String(reveal).padStart(2, '0')}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#03050a]/80 to-transparent" />
            <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between font-sans text-[7px] font-bold tracking-[0.18em] text-white/38 uppercase">
                <span>Exterior</span>
                <span className={symbioteActive ? 'text-violet-200/80' : 'text-skyline-blue/65'}>
                    {symbioteActive ? 'Material no catalogado' : 'Corte técnico'}
                </span>
            </div>
        </div>
    );
}

export default function SuitLab({
    isSymbioteBreachActive = false,
    onSymbioteBreach,
}: SuitLabProps) {
    const [reveal, setReveal] = useState(44);
    const [activeId, setActiveId] = useState<ModuleId>('optics');
    const [symbioteDetected, setSymbioteDetected] = useState(false);
    const [symbioteConfirmed, setSymbioteConfirmed] = useState(false);
    const reduceMotion = useReducedMotion();
    const figureRef = useRef<HTMLDivElement>(null);
    const headingId = useId();
    const active = SUIT_MODULES.find((module) => module.id === activeId) ?? SUIT_MODULES[0];
    const anomalyPending = symbioteDetected && !symbioteConfirmed;
    const symbioteActive = symbioteConfirmed && isSymbioteBreachActive;

    const updateScan = (value: number) => {
        const nextScan = clampScan(value);
        setReveal(nextScan);
        setActiveId(getNearestModule(nextScan).id);

        if (nextScan >= SYMBIOTE_SCAN_THRESHOLD) {
            setSymbioteDetected(true);
        }
    };

    const analyzeSymbiote = () => {
        setReveal(90);
        setSymbioteDetected(true);
        setSymbioteConfirmed(true);
        onSymbioteBreach?.();
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === 'touch') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        updateScan(((event.clientX - bounds.left) / bounds.width) * 100);
    };

    const selectModule = (module: SuitModule) => {
        setActiveId(module.id);
        setReveal(module.scanAt);
    };

    return (
        <section
            id="traje"
            aria-labelledby={headingId}
            className="chapter-section relative overflow-hidden bg-[#06080e] py-20 sm:py-24 lg:flex lg:min-h-[100dvh] lg:items-center lg:py-10"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_55%,rgba(13,65,121,.2),transparent_36%),radial-gradient(circle_at_80%_25%,rgba(220,24,56,.14),transparent_30%)]" />
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:64px_64px] opacity-20" />

            <div className="webline-gutter relative z-[40] mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14 xl:px-20">
                <div
                    data-nav-anchor
                    className="grid items-center gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(350px,1.1fr)] lg:gap-12 xl:gap-16"
                >
                    <div>
                        <div className="mb-5 flex items-center gap-3 font-sans text-[9px] font-extrabold tracking-[0.22em] text-white/50 uppercase">
                            <span className="border-spider-red/50 text-spider-red inline-grid size-8 shrink-0 place-items-center rounded-full border leading-none tracking-normal tabular-nums">
                                02
                            </span>
                            Ingeniería del traje
                            <span className="h-px w-10 bg-gradient-to-r from-white/35 to-transparent" />
                        </div>

                        <h2
                            id={headingId}
                            className="display-title text-[clamp(3.8rem,6.6vw,7rem)] leading-[0.76] text-white"
                        >
                            CADA CAPA
                            <br />
                            <span className="brand-stroke text-transparent">RESPONDE.</span>
                        </h2>
                        <p className="mt-5 max-w-xl text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
                            Desliza el corte para descubrir cómo el traje absorbe, interpreta y
                            responde antes de que Peter toque el suelo.
                        </p>

                        <div
                            className="mt-6 grid grid-cols-2 gap-2"
                            aria-label="Módulos técnicos del traje"
                        >
                            {SUIT_MODULES.map((module) => {
                                const Icon = module.icon;
                                const selected = !symbioteActive && module.id === active.id;
                                return (
                                    <button
                                        key={module.id}
                                        type="button"
                                        onClick={() => selectModule(module)}
                                        aria-pressed={selected}
                                        className={`group min-h-[72px] rounded-xl border p-3 text-left transition outline-none sm:p-3.5 ${
                                            selected
                                                ? 'border-skyline-blue/65 bg-skyline-blue/[0.12] shadow-[inset_0_0_30px_rgba(131,232,255,.07)]'
                                                : 'border-white/[0.14] bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <Icon
                                                className={`size-[18px] shrink-0 ${selected ? 'text-skyline-blue' : 'text-white/55'}`}
                                                strokeWidth={1.9}
                                            />
                                            <span className="font-sans text-[11px] leading-4 font-extrabold tracking-[-0.01em] text-white/90 sm:text-xs">
                                                {module.cardTitle}
                                            </span>
                                        </span>
                                        <span className="mt-2 flex items-baseline gap-2 pl-7">
                                            <span className="font-display text-xl leading-none text-white sm:text-2xl">
                                                {module.metric}
                                            </span>
                                            <span
                                                className={`font-sans text-[10px] leading-none font-extrabold tracking-[0.06em] uppercase sm:text-[11px] ${
                                                    selected ? 'text-skyline-blue' : 'text-white/75'
                                                }`}
                                            >
                                                {module.cardMetricLabel}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div
                            className={`mt-3 min-h-[92px] overflow-hidden rounded-xl border p-4 transition-colors ${symbioteActive || anomalyPending ? 'border-violet-300/35 bg-[#07050b]' : 'border-white/[0.08] bg-black/20'}`}
                            aria-live="polite"
                        >
                            <AnimatePresence mode="wait">
                                <m.div
                                    key={
                                        symbioteActive
                                            ? 'symbiote'
                                            : anomalyPending
                                              ? 'anomaly'
                                              : active.id
                                    }
                                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: reduceMotion ? 0 : 0.18 }}
                                    className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-4"
                                >
                                    <span
                                        className={`font-display text-3xl leading-none ${symbioteActive || anomalyPending ? 'text-violet-200' : 'text-dawn'}`}
                                    >
                                        {symbioteActive
                                            ? '05'
                                            : anomalyPending
                                              ? '??'
                                              : active.index}
                                    </span>
                                    <div className="min-w-0">
                                        <p
                                            className={`font-sans text-[9px] font-extrabold tracking-[0.14em] uppercase ${symbioteActive || anomalyPending ? 'text-violet-200' : 'text-skyline-blue'}`}
                                        >
                                            {symbioteActive
                                                ? 'Firma Venom confirmada'
                                                : anomalyPending
                                                  ? 'Firma no catalogada'
                                                  : 'Módulo detectado'}
                                        </p>
                                        <p className="mt-1 text-[13px] leading-5 text-white/68 sm:text-sm">
                                            {symbioteActive
                                                ? 'La fibra no responde al diseño BND-01. La firma coincide con Venom: está creciendo y buscando un huésped.'
                                                : anomalyPending
                                                  ? 'Hay tejido orgánico fuera del patrón BND-01. La lectura necesita confirmación manual.'
                                                  : active.copy}
                                        </p>
                                    </div>
                                    {anomalyPending && (
                                        <button
                                            type="button"
                                            onClick={analyzeSymbiote}
                                            className="col-start-2 inline-flex min-h-10 items-center justify-center gap-2 justify-self-start rounded-lg border border-violet-200/35 bg-violet-300/[0.09] px-3 font-sans text-[9px] font-extrabold tracking-[0.12em] whitespace-nowrap text-violet-100 uppercase transition hover:border-violet-100/70 hover:bg-violet-300/[0.16] focus-visible:ring-2 focus-visible:ring-violet-200 sm:col-start-auto sm:row-start-1 sm:justify-self-end"
                                        >
                                            <ScanSearch className="size-3.5" aria-hidden="true" />
                                            Analizar firma
                                        </button>
                                    )}
                                </m.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="min-w-0 lg:justify-self-end">
                        <div className="mb-3 flex items-center justify-between font-sans text-[8px] font-bold tracking-[0.2em] text-white/35 uppercase sm:text-[9px]">
                            <span>Prototype // BND-01</span>
                            <span
                                className={
                                    symbioteDetected || reveal >= 72
                                        ? 'text-violet-200'
                                        : 'text-skyline-blue/70'
                                }
                            >
                                {symbioteConfirmed
                                    ? symbioteActive
                                        ? 'Firma Venom activa'
                                        : 'Firma Venom registrada'
                                    : anomalyPending
                                      ? 'Firma no catalogada'
                                      : reveal >= 72
                                        ? 'Pulso irregular // 88%'
                                        : `${active.title} detectado`}
                            </span>
                        </div>
                        <div
                            ref={figureRef}
                            onPointerMove={handlePointerMove}
                            className="cursor-ew-resize touch-pan-y select-none"
                        >
                            <SuitFigure
                                reveal={reveal}
                                active={active}
                                symbioteActive={symbioteActive}
                            />
                        </div>

                        <label className="mt-2 block font-sans text-[8px] font-bold tracking-[0.18em] text-white/42 uppercase">
                            <span className="flex items-center justify-between">
                                <span>Control del corte</span>
                                <span className="text-skyline-blue tabular-nums">
                                    {String(reveal).padStart(2, '0')}%
                                </span>
                            </span>
                            <input
                                type="range"
                                min="10"
                                max="90"
                                value={reveal}
                                onChange={(event) => updateScan(Number(event.target.value))}
                                className="scan-range w-full"
                                aria-label="Posición del escáner del traje"
                                aria-valuetext={
                                    symbioteConfirmed
                                        ? `${reveal} por ciento. Firma Venom ${symbioteActive ? 'activa' : 'registrada'}`
                                        : anomalyPending
                                          ? `${reveal} por ciento. Firma no catalogada lista para analizar`
                                          : `${reveal} por ciento. ${active.title}: ${active.metric}`
                                }
                            />
                        </label>
                        <div
                            className="-mt-1 flex min-h-4 justify-end font-sans text-[8px] font-extrabold tracking-[0.12em] uppercase"
                            aria-live="polite"
                        >
                            {!symbioteDetected && (
                                <span
                                    className={reveal >= 72 ? 'text-violet-200' : 'text-white/38'}
                                >
                                    {reveal >= 72
                                        ? 'Señal irregular adelante · continúa hasta 88%'
                                        : 'Lectura extendida disponible // 88%'}
                                </span>
                            )}
                            {anomalyPending && (
                                <span className="text-violet-200">
                                    Firma bloqueada · confirma el análisis
                                </span>
                            )}
                            {symbioteConfirmed &&
                                (symbioteActive ? (
                                    <span className="text-violet-200/75">
                                        Protocolo de contención activo
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={analyzeSymbiote}
                                        className="-my-2 inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-violet-200/80 transition hover:bg-violet-300/10 hover:text-violet-100 focus-visible:ring-2 focus-visible:ring-violet-200"
                                        aria-label="Repetir invasión de Venom"
                                    >
                                        <RotateCcw className="size-3" aria-hidden="true" />
                                        Repetir registro 05
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
