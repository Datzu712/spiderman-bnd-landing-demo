import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, MapPin, Ticket } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';
import { getTimeLeft, type TimeLeft } from '../lib/countdown';

function Countdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());

    useEffect(() => {
        const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => window.clearInterval(timer);
    }, []);

    const values = useMemo(
        () => [
            { label: 'días', value: timeLeft.days },
            { label: 'horas', value: timeLeft.hours },
            { label: 'min', value: timeLeft.minutes },
            { label: 'seg', value: timeLeft.seconds },
        ],
        [timeLeft],
    );

    if (timeLeft.released) {
        return (
            <p className="font-display text-dawn text-3xl tracking-wider uppercase">Ya en cines</p>
        );
    }

    return (
        <div
            className="grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
            aria-label="Cuenta regresiva para el estreno"
        >
            {values.map(({ label, value }) => (
                <div
                    key={label}
                    className="bg-[#07090f]/90 px-3 py-5 text-center backdrop-blur-md sm:px-7 sm:py-6"
                >
                    <span className="font-display block text-3xl text-white tabular-nums sm:text-5xl">
                        {String(value).padStart(2, '0')}
                    </span>
                    <span className="mt-2 block font-mono text-[8px] tracking-[0.2em] text-white/38 uppercase sm:text-[9px]">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function ReleaseChapter() {
    return (
        <section
            id="estreno"
            className="chapter-section bg-ink relative min-h-[92svh] overflow-hidden py-28 sm:py-36"
        >
            <div className="absolute inset-0">
                <img
                    src="/images/nyc-brand-new-day.webp"
                    alt=""
                    className="h-full w-full scale-110 object-cover object-[68%_center] opacity-28 grayscale"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#03050a_0%,rgba(3,5,10,.84)_45%,rgba(3,5,10,.45)),linear-gradient(0deg,#03050a,transparent_45%,#03050a)]" />
            </div>
            <div className="border-spider-red/15 absolute top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border shadow-[0_0_120px_rgba(220,24,56,.12)]" />

            <div className="webline-gutter relative z-[40] mx-auto flex min-h-[70svh] max-w-[1440px] items-center px-5 sm:px-8 lg:px-14 xl:px-20">
                <div data-nav-anchor className="max-w-4xl">
                    <Eyebrow index="04">Estreno mundial</Eyebrow>
                    <h2
                        className="display-title text-[clamp(3.55rem,11vw,10.5rem)] leading-[0.82] text-white"
                        style={{ letterSpacing: '-0.035em' }}
                    >
                        <span className="block whitespace-nowrap">
                            UN NUEVO <span className="inline-block pl-[0.02em]">DÍA</span>
                        </span>
                        <span className="brand-stroke block whitespace-nowrap text-transparent">
                            COMIENZA.
                        </span>
                    </h2>
                    <div className="mt-10 max-w-2xl">
                        <Countdown />
                    </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <a
                            href="https://www.sonypictures.com/movies/spidermanbrandnewday"
                            target="_blank"
                            rel="noreferrer"
                            className="web-button web-button-primary group"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <Ticket className="size-4" />
                                Sitio oficial
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </a>
                        <div className="flex items-center gap-3 text-xs text-white/45">
                            <MapPin className="text-spider-red size-4" />
                            Exclusivamente en cines · 31 julio 2026
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
