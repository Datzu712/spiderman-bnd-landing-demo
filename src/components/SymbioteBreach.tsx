import { useEffect, useRef } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';

type SymbioteBreachProps = {
    active: boolean;
    onComplete: () => void;
};

type Tendril = {
    d: string;
    width: number;
    delay: number;
    mobile?: boolean;
};

const BREACH_DURATION = 3200;
const REDUCED_DURATION = 1050;

const TENDRILS: Tendril[] = [
    {
        d: 'M-90 92 C155 58 236 190 188 292 C138 399 343 448 515 337 C646 252 728 320 790 414',
        width: 92,
        delay: 0,
        mobile: true,
    },
    {
        d: 'M-82 836 C151 864 276 755 250 623 C226 500 374 430 571 510 C678 553 754 516 823 432',
        width: 76,
        delay: 0.09,
        mobile: true,
    },
    {
        d: 'M1518 106 C1284 68 1191 173 1231 280 C1270 385 1100 457 924 357 C832 305 752 337 683 418',
        width: 88,
        delay: 0.04,
        mobile: true,
    },
    {
        d: 'M1514 822 C1278 881 1163 755 1195 622 C1226 494 1072 430 891 519 C802 562 738 522 674 444',
        width: 72,
        delay: 0.14,
        mobile: true,
    },
    {
        d: 'M493 -72 C455 118 546 191 658 154 C778 115 859 202 811 322 C786 386 744 420 714 474',
        width: 64,
        delay: 0.17,
        mobile: true,
    },
    {
        d: 'M882 972 C909 780 829 709 715 753 C602 797 527 705 580 592 C609 530 660 486 708 435',
        width: 68,
        delay: 0.2,
        mobile: true,
    },
    {
        d: 'M-76 467 C160 417 322 502 393 592 C454 669 557 625 592 523 C614 458 655 425 711 414',
        width: 54,
        delay: 0.23,
    },
    {
        d: 'M1512 462 C1314 427 1152 491 1073 574 C1000 650 906 605 861 517 C828 452 785 418 727 414',
        width: 58,
        delay: 0.25,
    },
];

const BRANCHES = [
    { d: 'M218 292 C302 256 331 179 303 112', width: 31, delay: 0.18 },
    { d: 'M253 624 C344 661 376 741 346 826', width: 27, delay: 0.24 },
    { d: 'M1219 281 C1125 246 1099 170 1129 95', width: 30, delay: 0.21 },
    { d: 'M1193 623 C1103 666 1074 744 1102 833', width: 25, delay: 0.28 },
    { d: 'M653 155 C727 202 714 262 677 302', width: 22, delay: 0.3 },
    { d: 'M716 754 C649 703 662 638 701 599', width: 24, delay: 0.32 },
];

const SPORES = Array.from({ length: 16 }, (_, index) => ({
    cx: 110 + ((index * 211) % 1220),
    cy: 96 + ((index * 157) % 708),
    r: 4 + (index % 4) * 2.3,
    delay: 0.55 + (index % 6) * 0.08,
}));

const pathTransition = (delay: number, reduced: boolean) =>
    reduced
        ? { duration: 0.86, delay: delay * 0.15, times: [0, 0.18, 0.72, 1] }
        : {
              duration: 2.58,
              delay,
              times: [0, 0.29, 0.69, 1],
              ease: [0.16, 1, 0.3, 1] as const,
          };

function TendrilCanvas({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
    return (
        <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
        >
            <defs>
                <linearGradient id="symbiote-oil" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#070309" />
                    <stop offset=".26" stopColor="#6f3d80" />
                    <stop offset=".47" stopColor="#101319" />
                    <stop offset=".7" stopColor="#9bcbd0" />
                    <stop offset="1" stopColor="#100514" />
                </linearGradient>
                <linearGradient id="symbiote-gloss" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset=".32" stopColor="#d58cff" stopOpacity=".72" />
                    <stop offset=".57" stopColor="#86f8ff" stopOpacity=".82" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <filter id="symbiote-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow
                        dx="0"
                        dy="7"
                        stdDeviation="10"
                        floodColor="#000000"
                        floodOpacity=".8"
                    />
                </filter>
            </defs>

            <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#symbiote-shadow)"
            >
                {TENDRILS.map((tendril, index) => {
                    const animation = shouldReduceMotion
                        ? { pathLength: 1, opacity: [0, 0.9, 0.9, 0] }
                        : { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] };
                    const className = tendril.mobile ? undefined : 'hidden sm:block';

                    return (
                        <g key={tendril.d} className={className}>
                            <m.path
                                d={tendril.d}
                                stroke="url(#symbiote-oil)"
                                strokeWidth={tendril.width + 14}
                                vectorEffect="non-scaling-stroke"
                                initial={
                                    shouldReduceMotion
                                        ? { pathLength: 1, opacity: 0 }
                                        : { pathLength: 0, opacity: 0 }
                                }
                                animate={animation}
                                transition={pathTransition(tendril.delay, shouldReduceMotion)}
                            />
                            <m.path
                                d={tendril.d}
                                stroke="#010104"
                                strokeWidth={tendril.width}
                                vectorEffect="non-scaling-stroke"
                                initial={
                                    shouldReduceMotion
                                        ? { pathLength: 1, opacity: 0 }
                                        : { pathLength: 0, opacity: 0 }
                                }
                                animate={animation}
                                transition={pathTransition(
                                    tendril.delay + 0.025,
                                    shouldReduceMotion,
                                )}
                            />
                            <m.path
                                d={tendril.d}
                                stroke="url(#symbiote-gloss)"
                                strokeWidth={Math.max(3, tendril.width * 0.075)}
                                strokeDasharray="18 54 5 76"
                                vectorEffect="non-scaling-stroke"
                                initial={
                                    shouldReduceMotion
                                        ? { pathLength: 1, opacity: 0, strokeDashoffset: 0 }
                                        : { pathLength: 0, opacity: 0, strokeDashoffset: 90 }
                                }
                                animate={{
                                    ...animation,
                                    strokeDashoffset: shouldReduceMotion ? 0 : -150,
                                }}
                                transition={{
                                    ...pathTransition(tendril.delay + 0.08, shouldReduceMotion),
                                    strokeDashoffset: { duration: 1.8, ease: 'linear' },
                                }}
                            />
                            {index < 4 && (
                                <m.circle
                                    cx={index % 2 === 0 ? 710 : 730}
                                    cy={index < 2 ? 420 : 442}
                                    r={tendril.width * 0.18}
                                    fill="#010104"
                                    initial={
                                        shouldReduceMotion
                                            ? { scale: 1, opacity: 0 }
                                            : { scale: 0, opacity: 0 }
                                    }
                                    animate={{
                                        scale: shouldReduceMotion ? 1 : [0, 1.35, 1, 0],
                                        opacity: shouldReduceMotion
                                            ? [0, 0.8, 0.8, 0]
                                            : [0, 1, 1, 0],
                                    }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0.85 : 2.25,
                                        delay: shouldReduceMotion ? 0 : 0.5 + index * 0.05,
                                        times: [0, 0.3, 0.72, 1],
                                    }}
                                />
                            )}
                        </g>
                    );
                })}

                {BRANCHES.map((branch) => (
                    <g key={branch.d} className="hidden sm:block">
                        <m.path
                            d={branch.d}
                            stroke="url(#symbiote-oil)"
                            strokeWidth={branch.width + 8}
                            vectorEffect="non-scaling-stroke"
                            initial={
                                shouldReduceMotion
                                    ? { pathLength: 1, opacity: 0 }
                                    : { pathLength: 0, opacity: 0 }
                            }
                            animate={
                                shouldReduceMotion
                                    ? { pathLength: 1, opacity: [0, 0.72, 0.72, 0] }
                                    : { pathLength: [0, 1, 1, 0], opacity: [0, 0.86, 0.86, 0] }
                            }
                            transition={pathTransition(branch.delay, shouldReduceMotion)}
                        />
                        <m.path
                            d={branch.d}
                            stroke="#010104"
                            strokeWidth={branch.width}
                            vectorEffect="non-scaling-stroke"
                            initial={
                                shouldReduceMotion
                                    ? { pathLength: 1, opacity: 0 }
                                    : { pathLength: 0, opacity: 0 }
                            }
                            animate={
                                shouldReduceMotion
                                    ? { pathLength: 1, opacity: [0, 0.95, 0.95, 0] }
                                    : { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
                            }
                            transition={pathTransition(branch.delay + 0.03, shouldReduceMotion)}
                        />
                    </g>
                ))}
            </g>

            <g>
                {SPORES.map((spore, index) => (
                    <m.circle
                        key={`${spore.cx}-${spore.cy}`}
                        cx={spore.cx}
                        cy={spore.cy}
                        r={spore.r}
                        fill={index % 3 === 0 ? '#18051f' : '#010104'}
                        stroke={index % 3 === 0 ? '#9f42c7' : '#3cd9e4'}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                        initial={
                            shouldReduceMotion ? { scale: 1, opacity: 0 } : { scale: 0, opacity: 0 }
                        }
                        animate={
                            shouldReduceMotion
                                ? { scale: 1, opacity: [0, 0.55, 0.55, 0] }
                                : { scale: [0, 1.4, 0.8, 0], opacity: [0, 0.8, 0.65, 0] }
                        }
                        transition={{
                            duration: shouldReduceMotion ? 0.8 : 1.75,
                            delay: shouldReduceMotion ? 0 : spore.delay,
                            times: [0, 0.28, 0.72, 1],
                        }}
                    />
                ))}
            </g>
        </svg>
    );
}

function VenomFace({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
    return (
        <svg
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 size-full"
            aria-hidden="true"
        >
            <defs>
                <radialGradient id="venom-head" cx="42%" cy="30%" r="76%">
                    <stop offset="0" stopColor="#19151f" />
                    <stop offset=".42" stopColor="#050407" />
                    <stop offset=".82" stopColor="#010103" />
                    <stop offset="1" stopColor="#160d1c" />
                </radialGradient>
                <linearGradient id="venom-mouth" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#180208" />
                    <stop offset=".55" stopColor="#430718" />
                    <stop offset="1" stopColor="#120106" />
                </linearGradient>
                <linearGradient id="venom-tongue" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#d04476" />
                    <stop offset=".52" stopColor="#8d1648" />
                    <stop offset="1" stopColor="#3e0826" />
                </linearGradient>
                <linearGradient id="venom-edge" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#211327" />
                    <stop offset=".42" stopColor="#765080" />
                    <stop offset=".68" stopColor="#8ebdc1" />
                    <stop offset="1" stopColor="#120a16" />
                </linearGradient>
                <filter id="venom-face-shadow" x="-40%" y="-30%" width="180%" height="180%">
                    <feDropShadow
                        dx="0"
                        dy="18"
                        stdDeviation="24"
                        floodColor="#000"
                        floodOpacity=".92"
                    />
                </filter>
                <filter id="venom-eye-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <m.g
                filter="url(#venom-face-shadow)"
                style={{ transformOrigin: '500px 500px' }}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.72 }}
                animate={
                    shouldReduceMotion
                        ? { opacity: [0, 0.9, 0.9, 0], scale: 1 }
                        : {
                              opacity: [0, 0, 1, 1, 0],
                              scale: [0.72, 0.72, 1.04, 1, 1.1],
                          }
                }
                transition={{
                    duration: shouldReduceMotion ? 0.9 : 2.9,
                    times: shouldReduceMotion ? [0, 0.18, 0.76, 1] : [0, 0.3, 0.42, 0.76, 1],
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <path
                    d="M500 160C337 160 238 286 254 474c15 179 105 311 246 350 141-39 231-171 246-350 16-188-83-314-246-314Z"
                    fill="url(#venom-head)"
                    stroke="url(#venom-edge)"
                    strokeWidth="8"
                />
                <path
                    d="M313 286c55-74 118-101 187-103-83 35-127 76-157 135Z"
                    fill="#6f4d7d"
                    opacity=".2"
                />
                <path
                    d="M687 286c-55-74-118-101-187-103 83 35 127 76 157 135Z"
                    fill="#b1e4e8"
                    opacity=".09"
                />
                <path
                    d="M294 348c55-51 126-43 183 35-62-24-116 10-169 93 13-51 8-94-14-128Z"
                    fill="#f9fdff"
                    filter="url(#venom-eye-glow)"
                />
                <path
                    d="M706 348c-55-51-126-43-183 35 62-24 116 10 169 93-13-51-8-94 14-128Z"
                    fill="#f9fdff"
                    filter="url(#venom-eye-glow)"
                />
                <path
                    d="M326 370c45-22 88-11 122 31-44-17-82-2-119 44"
                    fill="none"
                    stroke="#161019"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity=".76"
                />
                <path
                    d="M674 370c-45-22-88-11-122 31 44-17 82-2 119 44"
                    fill="none"
                    stroke="#161019"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity=".76"
                />

                <m.g
                    style={{ transformOrigin: '500px 552px' }}
                    initial={{ scaleY: shouldReduceMotion ? 1 : 0.55 }}
                    animate={{ scaleY: shouldReduceMotion ? 1 : [0.55, 0.55, 1.08, 1, 1.13] }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 2.75,
                        times: [0, 0.34, 0.48, 0.76, 1],
                        ease: 'easeOut',
                    }}
                >
                    <path
                        d="M309 518c63 53 319 53 382 0-23 159-92 233-191 239-99-6-168-80-191-239Z"
                        fill="url(#venom-mouth)"
                        stroke="#6e1736"
                        strokeWidth="4"
                    />
                    <path
                        d="m326 530 36 73 27-61 35 86 31-75 45 91 45-91 31 75 35-86 27 61 36-73c-109 38-239 38-348 0Z"
                        fill="#fffdf3"
                        stroke="#c7dce0"
                        strokeWidth="2"
                    />
                    <path
                        d="m354 700 32-62 30 72 35-81 28 91 21-78 21 78 28-91 35 81 30-72 32 62c-87 70-215 70-302 0Z"
                        fill="#fffdf3"
                        stroke="#c7dce0"
                        strokeWidth="2"
                    />
                    <m.path
                        d="M479 663c-8 63 39 91 20 165-9 35-39 38-51 9-26-62 24-108 31-174Z"
                        fill="url(#venom-tongue)"
                        stroke="#e15486"
                        strokeWidth="3"
                        style={{ transformOrigin: '488px 663px' }}
                        initial={{ opacity: 0, scaleY: shouldReduceMotion ? 1 : 0.15 }}
                        animate={
                            shouldReduceMotion
                                ? { opacity: 0.88, scaleY: 1 }
                                : { opacity: [0, 0, 1, 1, 0], scaleY: [0.15, 0.15, 1.12, 1, 0.35] }
                        }
                        transition={{
                            duration: shouldReduceMotion ? 0 : 2.72,
                            times: [0, 0.4, 0.55, 0.78, 1],
                            ease: 'easeOut',
                        }}
                    />
                    <path
                        d="M470 680c5 42 30 64 22 116"
                        fill="none"
                        stroke="#ff91b3"
                        strokeWidth="5"
                        strokeLinecap="round"
                        opacity=".48"
                    />
                    <m.path
                        d="M370 591c-8 60-4 112-23 153M630 591c8 60 4 112 23 153"
                        fill="none"
                        stroke="#e9ffff"
                        strokeWidth="5"
                        strokeLinecap="round"
                        initial={
                            shouldReduceMotion
                                ? { pathLength: 1, opacity: 0.5 }
                                : { pathLength: 0, opacity: 0 }
                        }
                        animate={
                            shouldReduceMotion
                                ? undefined
                                : { pathLength: [0, 1, 0.7], opacity: [0, 0.72, 0] }
                        }
                        transition={{ duration: 1.3, delay: 1.35, ease: 'easeOut' }}
                        className="hidden sm:block"
                    />
                </m.g>
            </m.g>
        </svg>
    );
}

function BreachCallout({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
    return (
        <m.div
            className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 max-w-[calc(100vw-2rem)] sm:top-8 sm:left-8"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -18 }}
            animate={
                shouldReduceMotion
                    ? { opacity: [0, 1, 1, 0], x: 0 }
                    : { opacity: [0, 1, 1, 0], x: [-18, 0, 0, 14] }
            }
            transition={{
                duration: shouldReduceMotion ? 0.92 : 2.85,
                times: [0, 0.2, 0.72, 1],
                ease: 'easeOut',
            }}
        >
            <div className="flex items-stretch overflow-hidden rounded-md border border-violet-200/45 bg-black/95 shadow-[0_0_34px_rgba(141,87,158,.25)] backdrop-blur-md">
                <m.span
                    className="w-1 bg-gradient-to-b from-violet-300 via-white to-cyan-200"
                    animate={shouldReduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 0.28, repeat: Infinity }}
                />
                <div className="px-3.5 py-2.5 sm:px-5 sm:py-3.5">
                    <div className="mb-1 flex items-center gap-2 font-sans text-[10px] font-extrabold tracking-[0.12em] text-violet-100/85 uppercase sm:text-[11px]">
                        <span className="bg-spider-red size-2 rounded-full shadow-[0_0_10px_#e31c3d]" />
                        Firma simbiótica confirmada
                    </div>
                    <p className="font-sans text-xs leading-5 font-black tracking-[0.08em] text-white uppercase sm:text-sm sm:tracking-[0.14em]">
                        FIRMA SIMBIÓTICA <span className="text-violet-300">//</span> VENOM
                    </p>
                </div>
            </div>
            <m.div
                className="mt-1 h-px bg-gradient-to-r from-violet-200/90 via-white/55 to-transparent"
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: shouldReduceMotion ? 1 : [0, 1, 0.72, 0] }}
                transition={{ duration: shouldReduceMotion ? 0 : 2.5, times: [0, 0.25, 0.7, 1] }}
            />
        </m.div>
    );
}

export default function SymbioteBreach({ active, onComplete }: SymbioteBreachProps) {
    const shouldReduceMotion = Boolean(useReducedMotion());
    const onCompleteRef = useRef(onComplete);
    const completedRef = useRef(false);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        if (!active) {
            completedRef.current = false;
            return;
        }

        const timer = window.setTimeout(
            () => {
                if (completedRef.current) return;
                completedRef.current = true;
                onCompleteRef.current();
            },
            shouldReduceMotion ? REDUCED_DURATION : BREACH_DURATION,
        );

        return () => window.clearTimeout(timer);
    }, [active, shouldReduceMotion]);

    return (
        <AnimatePresence>
            {active && (
                <m.div
                    aria-hidden="true"
                    className="pointer-events-none fixed inset-0 isolate z-[140] overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: shouldReduceMotion ? [0, 1, 1, 0] : 1 }}
                    exit={{ opacity: 0 }}
                    transition={
                        shouldReduceMotion
                            ? { duration: 0.95, times: [0, 0.18, 0.78, 1] }
                            : { duration: 0.08 }
                    }
                >
                    <m.div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(1,1,4,.9)_0%,rgba(9,4,13,.58)_28%,transparent_65%),linear-gradient(105deg,rgba(19,6,24,.28),transparent_42%,rgba(6,18,20,.14))]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: shouldReduceMotion ? 0.5 : [0, 0.82, 0.72, 0] }}
                        transition={{
                            duration: shouldReduceMotion ? 0 : 2.95,
                            times: [0, 0.24, 0.7, 1],
                        }}
                    />

                    <TendrilCanvas shouldReduceMotion={shouldReduceMotion} />
                    <VenomFace shouldReduceMotion={shouldReduceMotion} />
                    <BreachCallout shouldReduceMotion={shouldReduceMotion} />

                    {!shouldReduceMotion && (
                        <m.div
                            className="absolute inset-x-0 top-[47%] h-px bg-gradient-to-r from-transparent via-cyan-100/55 to-transparent mix-blend-screen"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: [0, 0.8, 0], scaleX: [0, 1, 0.3], y: [0, 9, -6] }}
                            transition={{ duration: 0.46, delay: 1.15, ease: 'easeOut' }}
                        />
                    )}
                </m.div>
            )}
        </AnimatePresence>
    );
}
