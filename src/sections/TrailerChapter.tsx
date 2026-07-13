import TrailerPortal from '../components/TrailerPortal';

type TrailerChapterProps = {
    isTrailerOpen: boolean;
    onTrailerOpenChange: (isOpen: boolean) => void;
};

export default function TrailerChapter({
    isTrailerOpen,
    onTrailerOpenChange,
}: TrailerChapterProps) {
    return (
        <section
            id="trailer"
            data-nav-fullscreen
            className="chapter-section trailer-viewport bg-ink relative overflow-hidden"
        >
            <div className="bg-ink absolute inset-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(220,24,56,.17),transparent_27%),radial-gradient(circle_at_50%_52%,rgba(131,232,255,.07),transparent_48%)]" />
            <div className="absolute inset-0 min-[80rem]:-translate-x-[7rem]">
                <div className="absolute top-1/2 left-1/2 aspect-square w-[min(92vw,92vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
                <div className="border-spider-red/[0.08] absolute top-1/2 left-1/2 aspect-square w-[min(68vw,68vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border" />
            </div>

            <div className="trailer-viewport webline-gutter relative z-[40] mx-auto flex max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-14 xl:px-20">
                <div className="max-w-4xl text-center">
                    <div className="mb-5 inline-flex items-center gap-3 font-sans text-[9px] font-extrabold tracking-[0.2em] text-white/45 uppercase">
                        <span className="border-spider-red/50 text-spider-red inline-grid size-8 place-items-center rounded-full border leading-none tracking-normal tabular-nums">
                            03
                        </span>
                        Transmisión oficial
                    </div>
                    <h2 className="display-title text-[clamp(4rem,9vw,8.5rem)] leading-[0.78] text-white uppercase">
                        Abre el <span className="text-spider-red">portal.</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/48 sm:text-base">
                        Una sola entrada. Pantalla completa. El tráiler aparece cuando la energía
                        termina de abrirse.
                    </p>
                    <div className="mt-7 sm:mt-9">
                        <TrailerPortal isOpen={isTrailerOpen} onOpenChange={onTrailerOpenChange} />
                    </div>
                </div>
            </div>
        </section>
    );
}
