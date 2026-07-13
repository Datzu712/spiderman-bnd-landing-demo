import { useEffect, useId, useRef, useState, type MouseEvent, type RefObject } from 'react';
import { m, useReducedMotion, useScroll, useSpring, type MotionValue } from 'motion/react';

const WEB_PATH =
    'M210 -20 C248 90 162 170 198 270 C230 360 150 440 176 520 C210 620 160 710 188 810 C202 858 176 892 178 920';

const NAV_ITEMS = [
    { id: 'inicio', label: 'Inicio', code: '00', x: 210, y: 90 },
    { id: 'historia', label: 'Historia', code: '01', x: 198, y: 270 },
    { id: 'traje', label: 'El traje', code: '02', x: 172, y: 450 },
    { id: 'trailer', label: 'Tráiler', code: '03', x: 190, y: 630 },
    { id: 'estreno', label: 'Estreno', code: '04', x: 188, y: 810 },
] as const;

const LAST_CHAPTER_CODE = NAV_ITEMS[NAV_ITEMS.length - 1].code;

type SectionId = (typeof NAV_ITEMS)[number]['id'];
type NavClickHandler = (event: MouseEvent<HTMLAnchorElement>) => void;

function isSectionId(value: string): value is SectionId {
    return NAV_ITEMS.some(({ id }) => id === value);
}

function scrollToSectionElement(
    target: HTMLElement,
    options: { instant: boolean; mobileNavHeight: number },
) {
    const isFullscreenChapter = target.hasAttribute('data-nav-fullscreen');
    const anchor = isFullscreenChapter
        ? target
        : (target.querySelector<HTMLElement>('[data-nav-anchor]') ?? target);
    const usesDesktopRail = window.matchMedia('(min-width: 80rem)').matches;
    const visualOffset = isFullscreenChapter
        ? 0
        : usesDesktopRail
          ? 32
          : options.mobileNavHeight + 12;
    const absoluteTop = anchor.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: Math.max(0, absoluteTop - visualOffset),
        behavior: options.instant ? 'auto' : 'smooth',
    });
}

function SpiderSignal({ className = '' }: { className?: string }) {
    return (
        <svg aria-hidden="true" className={className} viewBox="0 0 32 32" fill="none">
            <path
                d="M16 7.5c2.6 0 4.5 2.2 4.5 5 0 1.7-.7 3.1-1.8 4.1 2 1.5 3.2 3.9 3.2 6.6 0 2.1-.7 4-1.9 5.3l-4-7.7-4 7.7a8.1 8.1 0 0 1-1.9-5.3c0-2.7 1.2-5.1 3.2-6.6a5.6 5.6 0 0 1-1.8-4.1c0-2.8 1.9-5 4.5-5Z"
                fill="currentColor"
            />
            <path
                d="m12.7 14.5-6.1-4M11.6 18l-7.3-.5m8.2 4.2-6.1 4.8m12.9-12 6.1-4M20.4 18l7.3-.5m-8.2 4.2 6.1 4.8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path d="M16 2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    );
}

type DesktopRailProps = {
    activeId: SectionId;
    progress: MotionValue<number>;
    prefersReducedMotion: boolean;
    onNavClick: NavClickHandler;
};

function DesktopRail({ activeId, progress, prefersReducedMotion, onNavClick }: DesktopRailProps) {
    const activeItem = NAV_ITEMS.find(({ id }) => id === activeId) ?? NAV_ITEMS[0];
    const activeTensionPath = `M ${activeItem.x} ${activeItem.y} C ${activeItem.x - 44} ${activeItem.y - 18}, 68 ${activeItem.y + 18}, 0 ${activeItem.y - 8}`;

    return (
        <nav
            aria-label="Navegación principal"
            className="pointer-events-none fixed inset-y-0 right-0 z-[80] hidden w-[260px] xl:block"
        >
            <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 260 900"
                preserveAspectRatio="none"
                fill="none"
            >
                <path
                    d={WEB_PATH}
                    stroke="rgba(242,235,221,.18)"
                    strokeWidth="1"
                    strokeDasharray="2 7"
                />
                <m.path
                    d={WEB_PATH}
                    stroke="#f2ebdd"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    style={{ pathLength: progress }}
                />

                <g stroke="rgba(242,235,221,.18)" strokeWidth="1">
                    <path d="M210 90 258 48M210 90l48 56" />
                    <path d="M198 270 258 222M198 270l60 58" />
                    <path d="M172 450 258 390M172 450l86 62" />
                    <path d="M190 630 258 578M190 630l68 58" />
                    <path d="M188 810 258 760M188 810l70 64" />
                </g>

                <m.path
                    key={activeId}
                    d={activeTensionPath}
                    stroke="#dc1838"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.72 }}
                    transition={{
                        duration: prefersReducedMotion ? 0 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />
            </svg>

            <ol className="absolute inset-0">
                {NAV_ITEMS.map((item) => {
                    const isActive = item.id === activeId;

                    return (
                        <li
                            key={item.id}
                            className="pointer-events-auto absolute"
                            style={{
                                top: `${(item.y / 900) * 100}%`,
                                right: `${260 - item.x}px`,
                                transform: 'translateY(-50%)',
                            }}
                        >
                            <a
                                href={`#${item.id}`}
                                onClick={onNavClick}
                                aria-current={isActive ? 'location' : undefined}
                                className="group relative flex min-h-11 items-center justify-end gap-3 pr-0 text-right focus-visible:outline-none"
                            >
                                <span
                                    className={`flex items-baseline gap-2 whitespace-nowrap transition-all duration-300 [text-shadow:0_1px_8px_#000,0_0_12px_#000] group-hover:-translate-x-1 group-hover:opacity-100 group-focus-visible:-translate-x-1 group-focus-visible:opacity-100 ${
                                        isActive
                                            ? '-translate-x-1 opacity-100'
                                            : 'translate-x-2 opacity-0'
                                    }`}
                                >
                                    <span className="text-spider-red font-mono text-[8px] tracking-[0.18em]">
                                        {item.code}
                                    </span>
                                    <span
                                        className={`font-display tracking-[0.08em] uppercase ${
                                            isActive
                                                ? 'text-lg text-white'
                                                : 'text-sm text-white/75'
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </span>

                                <span className="relative grid size-11 place-items-center">
                                    {isActive && (
                                        <m.span
                                            layoutId="webline-active-node"
                                            className="border-spider-red/70 absolute inset-1 rounded-full border shadow-[0_0_20px_rgba(220,24,56,.65)]"
                                            transition={
                                                prefersReducedMotion
                                                    ? { duration: 0 }
                                                    : {
                                                          type: 'spring',
                                                          stiffness: 360,
                                                          damping: 29,
                                                      }
                                            }
                                        />
                                    )}
                                    <span
                                        className={`relative size-2.5 rotate-45 border transition-all duration-300 ${
                                            isActive
                                                ? 'border-spider-red bg-spider-red scale-110'
                                                : 'border-white/55 bg-[#070910] group-hover:border-white group-hover:bg-white'
                                        }`}
                                    />
                                    <span className="group-focus-visible:ring-skyline-blue group-focus-visible:ring-offset-ink absolute -inset-1 rounded-full group-focus-visible:ring-2 group-focus-visible:ring-offset-2" />
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ol>

            <span className="absolute right-5 bottom-7 origin-bottom-right -rotate-90 font-mono text-[7px] tracking-[0.28em] text-white/28 uppercase [text-shadow:0_1px_6px_#000]">
                Webline navigation · Scroll
            </span>
        </nav>
    );
}

type MobileBarProps = {
    activeId: SectionId;
    progress: MotionValue<number>;
    isMapOpen: boolean;
    mapId: string;
    navRef: RefObject<HTMLElement | null>;
    menuButtonRef: RefObject<HTMLButtonElement | null>;
    onNavClick: NavClickHandler;
    onOpenMap: () => void;
};

function MobileBar({
    activeId,
    progress,
    isMapOpen,
    mapId,
    navRef,
    menuButtonRef,
    onNavClick,
    onOpenMap,
}: MobileBarProps) {
    const activeItem = NAV_ITEMS.find(({ id }) => id === activeId) ?? NAV_ITEMS[0];

    return (
        <nav
            ref={navRef}
            aria-label="Navegación principal móvil"
            className="from-ink via-ink/90 fixed inset-x-0 top-0 z-[80] bg-gradient-to-b to-transparent pb-4 text-white xl:hidden"
        >
            <div className="flex h-14 items-center justify-between px-4 pt-[env(safe-area-inset-top)]">
                <a
                    href="#inicio"
                    onClick={onNavClick}
                    aria-label="Volver al inicio"
                    className="focus-visible:ring-skyline-blue flex min-h-11 items-center gap-2 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <span className="font-display text-2xl font-black tracking-[-0.08em]">BND</span>
                    <span className="bg-spider-red h-5 w-px" />
                    <span className="font-mono text-[7px] leading-[1.3] tracking-[0.16em] text-white/45 uppercase">
                        NYC
                        <br />
                        07.31.26
                    </span>
                </a>

                <div className="min-w-0 px-3 text-right">
                    <span className="text-spider-red block font-mono text-[7px] tracking-[0.22em] uppercase">
                        {activeItem.code} / {LAST_CHAPTER_CODE}
                    </span>
                    <span className="font-display block truncate text-sm tracking-[0.08em] uppercase">
                        {activeItem.label}
                    </span>
                </div>

                <button
                    ref={menuButtonRef}
                    type="button"
                    onClick={onOpenMap}
                    aria-haspopup="dialog"
                    aria-expanded={isMapOpen}
                    aria-controls={mapId}
                    className="group focus-visible:ring-skyline-blue flex min-h-11 items-center gap-2 border-l border-white/15 pl-3 font-mono text-[8px] tracking-[0.18em] text-white/65 uppercase focus-visible:ring-2 focus-visible:outline-none"
                >
                    Mapa
                    <SpiderSignal className="text-spider-red size-5 transition-transform duration-300 group-hover:rotate-12" />
                </button>
            </div>

            <div className="relative mx-4 h-9">
                <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
                <m.div
                    aria-hidden="true"
                    className="bg-spider-red absolute inset-x-0 top-1/2 h-px origin-left shadow-[0_0_10px_rgba(220,24,56,.7)]"
                    style={{ scaleX: progress }}
                />
                <ol className="relative grid h-full grid-cols-5">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.id === activeId;
                        return (
                            <li key={item.id} className="grid place-items-center">
                                <a
                                    href={`#${item.id}`}
                                    onClick={onNavClick}
                                    aria-label={`Ir a ${item.label}`}
                                    aria-current={isActive ? 'location' : undefined}
                                    className="group grid size-11 place-items-center focus-visible:outline-none"
                                >
                                    <span
                                        className={`size-2.5 rotate-45 border shadow-[0_0_0_4px_#03050a] transition-all ${
                                            isActive
                                                ? 'border-spider-red bg-spider-red scale-125 shadow-[0_0_12px_rgba(220,24,56,.9)]'
                                                : 'bg-ink border-white/45 group-hover:border-white'
                                        }`}
                                    />
                                    <span className="sr-only">{item.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}

type MapDialogProps = {
    activeId: SectionId;
    mapId: string;
    dialogRef: RefObject<HTMLDialogElement | null>;
    onNavClick: NavClickHandler;
    onClose: () => void;
};

function MapDialog({ activeId, mapId, dialogRef, onNavClick, onClose }: MapDialogProps) {
    return (
        <dialog
            ref={dialogRef}
            id={mapId}
            aria-label="Mapa de navegación"
            onClose={onClose}
            className="bg-ink m-0 h-[100dvh] max-h-none w-full max-w-none overflow-hidden p-0 text-white backdrop:bg-black/80 xl:hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(220,24,56,.18),transparent_32%),radial-gradient(circle_at_10%_85%,rgba(13,65,121,.22),transparent_38%)]" />
            <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full opacity-20"
                viewBox="0 0 400 800"
                preserveAspectRatio="none"
                fill="none"
            >
                <path d="M372 -20C287 100 391 204 302 310S374 534 246 820" stroke="white" />
                <path
                    d="M372 62 108 0M345 157 400 98M321 258 36 182M310 365 400 302M318 474 44 428M288 596 400 554M264 711 58 800"
                    stroke="white"
                />
                <path
                    d="M372 62 321 258 318 474 264 711M345 157 310 365 288 596"
                    stroke="white"
                    strokeDasharray="3 9"
                />
            </svg>

            <div className="relative z-10 flex h-full flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-8">
                <header className="flex items-start justify-between border-b border-white/12 pb-5">
                    <div>
                        <span className="font-display text-4xl font-black tracking-[-0.08em]">
                            BND
                        </span>
                        <p className="mt-2 font-mono text-[8px] tracking-[0.26em] text-white/38 uppercase">
                            Webline navigation · NYC
                        </p>
                    </div>
                    <button
                        type="button"
                        autoFocus
                        onClick={onClose}
                        className="border-spider-red focus-visible:ring-skyline-blue flex min-h-11 items-center gap-2 border-b py-2 font-mono text-[9px] tracking-[0.2em] text-white/65 uppercase focus-visible:ring-2 focus-visible:outline-none"
                    >
                        Cerrar
                        <span aria-hidden="true" className="text-spider-red text-lg leading-none">
                            ×
                        </span>
                    </button>
                </header>

                <nav aria-label="Mapa de capítulos" className="flex flex-1 items-center">
                    <ol className="w-full space-y-1">
                        {NAV_ITEMS.map((item, index) => {
                            const isActive = item.id === activeId;
                            return (
                                <li key={item.id} className={index % 2 ? 'pl-8' : ''}>
                                    <a
                                        href={`#${item.id}`}
                                        onClick={onNavClick}
                                        aria-current={isActive ? 'location' : undefined}
                                        className="group focus-visible:ring-skyline-blue flex min-h-16 items-center gap-4 border-b border-white/[0.08] focus-visible:ring-2 focus-visible:outline-none"
                                    >
                                        <span
                                            className={`font-mono text-[9px] tracking-[0.22em] ${
                                                isActive ? 'text-spider-red' : 'text-white/28'
                                            }`}
                                        >
                                            {item.code}
                                        </span>
                                        <span
                                            className={`font-display text-[clamp(2rem,10vw,4.5rem)] leading-none tracking-[-0.035em] uppercase transition-transform duration-300 group-hover:translate-x-2 ${
                                                isActive ? 'text-white' : 'text-white/46'
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className={`ml-auto size-3 rotate-45 border ${
                                                isActive
                                                    ? 'border-spider-red bg-spider-red'
                                                    : 'border-white/25'
                                            }`}
                                        />
                                    </a>
                                </li>
                            );
                        })}
                    </ol>
                </nav>

                <p className="font-mono text-[8px] leading-5 tracking-[0.2em] text-white/28 uppercase">
                    Sigue la línea.
                    <br />
                    Cada nodo abre un capítulo.
                </p>
            </div>
        </dialog>
    );
}

export default function WebNav() {
    const [activeId, setActiveId] = useState<SectionId>(() => {
        const hashId = window.location.hash.slice(1);
        return isSectionId(hashId) ? hashId : 'inicio';
    });
    const [isMapOpen, setIsMapOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion() ?? false;
    const mapId = useId();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileNavRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll();
    const webProgress = useSpring(scrollYProgress, {
        stiffness: 110,
        damping: 26,
        mass: 0.28,
    });
    const effectiveProgress = prefersReducedMotion ? scrollYProgress : webProgress;

    useEffect(() => {
        const visibleSections = new Map<SectionId, IntersectionObserverEntry>();
        const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(
            (section): section is HTMLElement => section !== null,
        );

        if (!('IntersectionObserver' in window)) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id as SectionId;
                    if (entry.isIntersecting) visibleSections.set(id, entry);
                    else visibleSections.delete(id);
                });

                const focusLine = window.innerHeight * 0.38;
                const closestSection = [...visibleSections.entries()].sort(
                    ([, first], [, second]) => {
                        const firstDistance = Math.abs(first.boundingClientRect.top - focusLine);
                        const secondDistance = Math.abs(second.boundingClientRect.top - focusLine);
                        return firstDistance - secondDistance;
                    },
                )[0];

                if (closestSection) setActiveId(closestSection[0]);
            },
            {
                rootMargin: '-22% 0px -52% 0px',
                threshold: [0, 0.15, 0.35, 0.65, 1],
            },
        );

        sections.forEach((section) => observer.observe(section));

        const handleHashChange = () => {
            const id = window.location.hash.slice(1);
            if (isSectionId(id)) setActiveId(id);
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            observer.disconnect();
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isMapOpen && !dialog.open) dialog.showModal();
        if (!isMapOpen && dialog.open) dialog.close();
    }, [isMapOpen]);

    const handleNavClick: NavClickHandler = (event) => {
        const id = event.currentTarget.hash.slice(1);
        if (!isSectionId(id)) return;

        event.preventDefault();
        setActiveId(id);
        window.history.pushState(null, '', `#${id}`);

        const target = document.getElementById(id);
        if (!target) return;

        const scrollOptions = {
            instant: prefersReducedMotion,
            mobileNavHeight: mobileNavRef.current?.getBoundingClientRect().height ?? 96,
        };

        if (isMapOpen) {
            dialogRef.current?.close();
            setIsMapOpen(false);
            window.requestAnimationFrame(() => scrollToSectionElement(target, scrollOptions));
        } else {
            scrollToSectionElement(target, scrollOptions);
        }
    };

    const handleMapClose = () => {
        setIsMapOpen(false);
        menuButtonRef.current?.focus();
    };

    return (
        <>
            <DesktopRail
                activeId={activeId}
                progress={effectiveProgress}
                prefersReducedMotion={prefersReducedMotion}
                onNavClick={handleNavClick}
            />
            <MobileBar
                activeId={activeId}
                progress={effectiveProgress}
                isMapOpen={isMapOpen}
                mapId={mapId}
                navRef={mobileNavRef}
                menuButtonRef={menuButtonRef}
                onNavClick={handleNavClick}
                onOpenMap={() => setIsMapOpen(true)}
            />
            <MapDialog
                activeId={activeId}
                mapId={mapId}
                dialogRef={dialogRef}
                onNavClick={handleNavClick}
                onClose={handleMapClose}
            />
        </>
    );
}
