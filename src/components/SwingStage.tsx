import { useCallback, useEffect, useRef, useState } from 'react';
import {
    m,
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from 'motion/react';

const DESKTOP_SWING_PATH =
    'M -35 330 C 70 -5 285 70 365 505 C 430 855 655 780 718 326 C 772 -58 970 60 1070 470';

const MOBILE_SWING_PATH =
    'M -28 285 C 75 80 265 115 345 520 C 405 735 560 650 635 305 C 705 90 860 120 1035 510';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function FarSkyline() {
    return (
        <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
            <defs>
                <linearGradient id="swing-far-buildings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#132b4c" />
                    <stop offset="1" stopColor="#07101d" />
                </linearGradient>
                <pattern
                    id="swing-far-windows"
                    width="28"
                    height="34"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="4" height="7" x="8" y="9" rx="1" fill="#8fd8e6" opacity=".25" />
                    <rect width="4" height="7" x="18" y="9" rx="1" fill="#f4c06b" opacity=".16" />
                </pattern>
            </defs>

            <g fill="url(#swing-far-buildings)" opacity=".78">
                <path d="M0 900V610h78v-76h51v366z" />
                <path d="M112 900V565h116v335z" />
                <path d="M205 900V646h134v254z" />
                <path d="M312 900V514h61v-62h18v-104h9v104h17v62h62v386z" />
                <path d="M455 900V592h127v308z" />
                <path d="M548 900V624h118v276z" />
                <path d="M643 900V542h158v358z" />
                <path d="M780 900V633h92v267z" />
                <path d="M844 900V487h116v413z" />
                <path d="M932 900V592h146v308z" />
                <path d="M1049 900V526h79v-48h25v48h52v374z" />
                <path d="M1180 900V627h104v273z" />
                <path d="M1259 900V548h181v352z" />
            </g>
            <path
                d="M0 900V610h78v-76h51v31h99v81h111V514h34v-62h44v62h62v78h103v32h84v-82h135v91h71V487h116v105h118v-66h79v-48h25v48h52v101h79v-79h181v352z"
                fill="url(#swing-far-windows)"
                opacity=".75"
            />
        </svg>
    );
}

function MidSkyline() {
    return (
        <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
            <defs>
                <linearGradient id="swing-mid-buildings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0c1d31" />
                    <stop offset="1" stopColor="#040911" />
                </linearGradient>
                <pattern
                    id="swing-mid-windows"
                    width="38"
                    height="46"
                    patternUnits="userSpaceOnUse"
                >
                    <rect x="10" y="12" width="7" height="11" rx="1" fill="#86d7e8" opacity=".28" />
                    <rect x="24" y="12" width="7" height="11" rx="1" fill="#d83a4d" opacity=".18" />
                </pattern>
            </defs>

            <g fill="url(#swing-mid-buildings)">
                <path d="M0 900V684h102v-66h92v282z" />
                <path d="M155 900V565h176v335z" />
                <path d="M298 900V662h144v238z" />
                <path d="M409 900V519h155v381z" />
                <path d="M530 900V610h177v290z" />
                <path d="M679 900V468h141v432z" />
                <path d="M789 900V601h203v299z" />
                <path d="M956 900V548h154v352z" />
                <path d="M1078 900V650h135v250z" />
                <path d="M1177 900V507h181v393z" />
                <path d="M1324 900V596h116v304z" />
            </g>
            <g fill="url(#swing-mid-windows)" opacity=".72">
                <path d="M155 900V565h176v335zM409 900V519h155v381zM679 900V468h141v432z" />
                <path d="M956 900V548h154v352zM1177 900V507h181v393z" />
            </g>

            <g fill="#060b13">
                <path d="M730 468v-31h40v31z" />
                <path d="M736 437v-17h28v17z" />
                <path d="M742 420l4-18h10l4 18z" />
                <path d="M211 565v-26h65v26z" />
                <path d="M223 539v-17h41v17z" />
            </g>
        </svg>
    );
}

function NearSkyline() {
    return (
        <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
            <defs>
                <linearGradient id="swing-near-buildings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#07101b" />
                    <stop offset="1" stopColor="#010205" />
                </linearGradient>
                <pattern
                    id="swing-near-windows"
                    width="48"
                    height="56"
                    patternUnits="userSpaceOnUse"
                >
                    <rect x="13" y="13" width="9" height="14" rx="1" fill="#bceef1" opacity=".28" />
                    <rect x="29" y="13" width="9" height="14" rx="1" fill="#f1a860" opacity=".22" />
                </pattern>
            </defs>

            <g fill="url(#swing-near-buildings)">
                <path d="M0 900V733h236v167z" />
                <path d="M184 900V642h214v258z" />
                <path d="M363 900V716h201v184z" />
                <path d="M521 900V604h251v296z" />
                <path d="M736 900V711h206v189z" />
                <path d="M898 900V626h231v274z" />
                <path d="M1081 900V724h172v176z" />
                <path d="M1212 900V584h228v316z" />
            </g>
            <g fill="url(#swing-near-windows)" opacity=".62">
                <path d="M184 900V642h214v258zM521 900V604h251v296z" />
                <path d="M898 900V626h231v274zM1212 900V584h228v316z" />
            </g>

            <g fill="#020409" stroke="#0d1724" strokeWidth="5">
                <path d="M78 733v-74h84v74z" />
                <path d="M66 659h108l-12-18H78z" />
                <path d="M91 641v-38h8v38zM143 641v-38h8v38z" />
                <path d="M1120 724v-91h82v91z" />
                <ellipse cx="1161" cy="633" rx="47" ry="13" />
                <path d="M1131 633v-21h60v21zM1140 612v-17h42v17z" />
            </g>
            <g stroke="#101b27" strokeWidth="4" opacity=".8">
                <path d="M408 716v-58m0 11h73m-73 20h73m-55-31 55 58m0-58-55 58" />
                <path d="M1017 626v-76m0 13h78m-78 24h78m-61-37 61 76m0-76-61 76" />
            </g>
        </svg>
    );
}

function SpiderHero() {
    return (
        <svg
            className="h-full w-full overflow-visible drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)]"
            viewBox="0 0 120 160"
            fill="none"
        >
            <g stroke="#05070b" strokeLinecap="round" strokeLinejoin="round">
                <path d="M49 94c-5 20-17 34-30 48" stroke="#164f91" strokeWidth="17" />
                <path d="M19 142l-8 10" stroke="#e52d46" strokeWidth="16" />
                <path d="M69 96c13 14 24 27 38 36" stroke="#164f91" strokeWidth="17" />
                <path d="M107 132l7 13" stroke="#e52d46" strokeWidth="16" />

                <path d="M47 61C35 66 27 73 17 80" stroke="#174b89" strokeWidth="15" />
                <path d="M19 79 7 88" stroke="#e52d46" strokeWidth="13" />
                <path d="M71 60c3-18 7-31 12-44" stroke="#e52d46" strokeWidth="14" />
                <path d="m82 17 4-10" stroke="#e52d46" strokeWidth="11" />

                <path
                    d="M43 58c10-8 25-8 34 1l5 36c-6 9-15 13-25 12-9-1-17-5-22-12z"
                    fill="#e52d46"
                    strokeWidth="3.5"
                />
                <path
                    d="M42 60c3 13 4 26 2 40 5 4 10 6 15 7V53c-7 0-12 2-17 7ZM77 59c-4 12-5 27-3 42-4 3-9 5-15 6V53c7 0 13 2 18 6Z"
                    fill="#164f91"
                    stroke="none"
                />

                <path
                    d="M42 35c0-12 6-20 18-20s19 8 19 20c0 13-7 23-19 23S42 48 42 35Z"
                    fill="#e52d46"
                    strokeWidth="3.5"
                />
            </g>

            <path
                d="m47 38 10-3-9-8c-3 3-3 7-1 11Z"
                fill="#f4fbff"
                stroke="#07101d"
                strokeWidth="2"
            />
            <path
                d="m73 38-10-3 9-8c3 3 3 7 1 11Z"
                fill="#f4fbff"
                stroke="#07101d"
                strokeWidth="2"
            />

            <g stroke="#3a0c19" strokeWidth="1.2" opacity=".72">
                <path d="M60 17v34M48 22l12 12 13-12M43 34l17 4 18-4M45 47l15-5 15 5" />
                <path d="M60 55v43M42 65l18 7 18-7M39 80l21 4 20-4M38 94h44" />
            </g>

            <g fill="#07101b" stroke="#07101b" strokeLinecap="round" strokeWidth="2.2">
                <ellipse cx="60" cy="78" rx="3.2" ry="5" />
                <path d="M58 75 52 69m6 9-8-2m8 5-7 4m11-10 6-6m-6 9 8-2m-8 5 7 4" />
            </g>

            <path
                d="M86 7c9-12 20-9 28-3"
                stroke="#dffaff"
                strokeWidth="1.7"
                strokeLinecap="round"
                opacity=".82"
            />
            <circle cx="86" cy="7" r="2.6" fill="#f0ffff" />
        </svg>
    );
}

function StaticStage() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-[35] h-[100svh] overflow-hidden select-none"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_12%,rgba(37,86,128,0.08),transparent_34%)]" />
            <div className="absolute inset-0 hidden opacity-[0.08] sm:block">
                <FarSkyline />
            </div>
            <div className="absolute inset-0 hidden opacity-[0.12] sm:block">
                <MidSkyline />
            </div>
            <div className="absolute inset-0 opacity-[0.1] sm:opacity-[0.18]">
                <NearSkyline />
            </div>

            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
            >
                <path
                    d={DESKTOP_SWING_PATH}
                    fill="none"
                    stroke="#dffaff"
                    strokeWidth="2"
                    opacity=".22"
                />
            </svg>

            <div className="absolute top-0 right-[calc(7vw+3rem)] h-[21vh] w-px -rotate-6 bg-white/45 shadow-[0_0_6px_rgba(233,253,255,.45)]" />

            <div className="absolute top-[19vh] right-[7vw] h-24 w-[4.5rem] rotate-6 sm:h-32 sm:w-24">
                <SpiderHero />
            </div>
        </div>
    );
}

export default function SwingStage() {
    const pathRef = useRef<SVGPathElement>(null);
    const viewportRef = useRef({ width: 1, height: 1 });
    const [isCompact, setIsCompact] = useState(
        () => typeof window !== 'undefined' && window.innerWidth < 640,
    );
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const swingProgress = useSpring(scrollYProgress, {
        stiffness: 88,
        damping: 24,
        mass: 0.36,
        restDelta: 0.0005,
    });

    const heroX = useMotionValue(-120);
    const heroY = useMotionValue(260);
    const heroRotation = useMotionValue(-20);
    const anchorX = useMotionValue(0);
    const anchorY = useMotionValue(0);

    const webDraw = useTransform(swingProgress, [0, 0.97], [0, 1]);
    const webGlow = useTransform(swingProgress, [0, 0.025, 0.9, 1], [0.15, 0.88, 0.72, 0.2]);
    const heroOpacity = useTransform(swingProgress, [0, 0.004, 0.955, 1], [0, 1, 1, 0]);
    const heroScale = useTransform(swingProgress, [0, 0.44, 0.72, 1], [0.76, 1.04, 0.9, 0.72]);
    const tetherOpacity = useTransform(
        swingProgress,
        [0, 0.02, 0.31, 0.34, 0.36, 0.64, 0.67, 0.69, 0.96, 1],
        [0, 0.78, 0.78, 0, 0.78, 0.78, 0, 0.78, 0.78, 0],
    );

    const farX = useTransform(swingProgress, [0, 1], [-10, 18]);
    const farY = useTransform(swingProgress, [0, 1], [8, -20]);
    const midX = useTransform(swingProgress, [0, 1], [12, -28]);
    const midY = useTransform(swingProgress, [0, 1], [24, -38]);
    const nearX = useTransform(swingProgress, [0, 1], [-18, 42]);
    const nearY = useTransform(swingProgress, [0, 1], [42, -62]);

    const positionHero = useCallback(
        (progress: number) => {
            if (shouldReduceMotion) return;

            const path = pathRef.current;
            if (!path) return;

            const length = path.getTotalLength();
            const distance = clamp(progress, 0, 1) * length;
            const point = path.getPointAtLength(distance);
            const previous = path.getPointAtLength(Math.max(0, distance - 4));
            const next = path.getPointAtLength(Math.min(length, distance + 4));
            const { width, height } = viewportRef.current;

            heroX.set((point.x / 1000) * width);
            heroY.set((point.y / 1000) * height);

            const tangentX = ((next.x - previous.x) / 1000) * width;
            const tangentY = ((next.y - previous.y) / 1000) * height;
            const tangentAngle = (Math.atan2(tangentY, tangentX) * 180) / Math.PI;
            heroRotation.set(clamp(tangentAngle * 0.52, -38, 40));

            const anchor =
                progress < 0.34 ? [0.17, 0.12] : progress < 0.67 ? [0.58, 0.09] : [0.9, 0.13];
            anchorX.set(anchor[0] * width);
            anchorY.set(anchor[1] * height);
        },
        [anchorX, anchorY, heroRotation, heroX, heroY, shouldReduceMotion],
    );

    useMotionValueEvent(swingProgress, 'change', positionHero);

    useEffect(() => {
        let frame = 0;

        const updateViewport = () => {
            viewportRef.current = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            setIsCompact(window.innerWidth < 640);
            window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(() => positionHero(swingProgress.get()));
        };

        updateViewport();
        window.addEventListener('resize', updateViewport, { passive: true });
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('resize', updateViewport);
        };
    }, [positionHero, swingProgress]);

    if (shouldReduceMotion) {
        return <StaticStage />;
    }

    const activePath = isCompact ? MOBILE_SWING_PATH : DESKTOP_SWING_PATH;

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[35] overflow-hidden select-none"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(37,86,128,0.07),transparent_33%)]" />

            <m.div
                className="absolute -inset-x-12 inset-y-0 hidden opacity-[0.08] sm:block"
                style={{ x: farX, y: farY }}
            >
                <FarSkyline />
            </m.div>
            <m.div
                className="absolute -inset-x-14 inset-y-0 hidden opacity-[0.12] sm:block"
                style={{ x: midX, y: midY }}
            >
                <MidSkyline />
            </m.div>
            <m.div
                className="absolute -inset-x-20 inset-y-0 opacity-[0.1] sm:opacity-[0.18]"
                style={{ x: nearX, y: nearY }}
            >
                <NearSkyline />
            </m.div>

            <svg
                className="absolute inset-0 h-full w-full overflow-visible mix-blend-difference"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="swing-web-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <path ref={pathRef} d={activePath} fill="none" stroke="transparent" />
                <path
                    d={activePath}
                    fill="none"
                    stroke="#d9f7ff"
                    strokeWidth="1.2"
                    opacity=".12"
                    strokeDasharray="4 12"
                />
                <m.path
                    d={activePath}
                    fill="none"
                    stroke="#e9fdff"
                    strokeLinecap="round"
                    strokeWidth="2.4"
                    filter="url(#swing-web-glow)"
                    style={{ pathLength: webDraw, opacity: webGlow }}
                />

                <g fill="#e9fdff" opacity=".42">
                    <circle cx="365" cy="505" r="3" />
                    <circle cx="718" cy="326" r="3" />
                </g>

                <g fill="none" stroke="#e9fdff" strokeWidth="2" opacity=".38">
                    <path d="M112 120h116v16M156 120v-28h28v28M170 92V66" />
                    <path d="M522 90h116v16M566 90V59h28v31M580 59V34" />
                    <path d="M842 130h116v16M886 130V96h28v34M900 96V70" />
                </g>
            </svg>

            <svg className="absolute inset-0 h-full w-full overflow-visible mix-blend-difference">
                <defs>
                    <filter id="swing-tether-glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="2" result="tetherBlur" />
                        <feMerge>
                            <feMergeNode in="tetherBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <m.line
                    x1={heroX}
                    y1={heroY}
                    x2={anchorX}
                    y2={anchorY}
                    stroke="#efffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    filter="url(#swing-tether-glow)"
                    style={{ opacity: tetherOpacity }}
                />
            </svg>

            <m.div
                className="absolute top-0 left-0 z-10"
                style={{ x: heroX, y: heroY, opacity: heroOpacity }}
            >
                <m.div style={{ rotate: heroRotation, scale: heroScale, transformOrigin: '0% 0%' }}>
                    <div className="h-20 w-[3.75rem] -translate-x-[72%] -translate-y-[4%] sm:h-28 sm:w-[5.25rem] lg:h-32 lg:w-24">
                        <SpiderHero />
                    </div>
                </m.div>
            </m.div>

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,8,0.035),transparent_20%,transparent_80%,rgba(2,4,8,0.05))]" />
        </div>
    );
}
