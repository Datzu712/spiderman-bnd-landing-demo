import Eyebrow from '../components/Eyebrow';

const FACTS = [
    { value: '04', label: 'años desde que todo cambió' },
    { value: '01', label: 'ciudad que todavía lo necesita' },
    { value: '00', label: 'personas que recuerdan su nombre' },
];

export default function StoryChapter() {
    return (
        <section
            id="historia"
            className="chapter-section bg-ink relative overflow-hidden py-28 sm:py-36 lg:py-48"
        >
            <div className="absolute inset-y-0 right-0 w-[46%] bg-[linear-gradient(135deg,transparent_30%,rgba(220,24,56,.08))]" />
            <div className="absolute top-20 -right-28 size-[42rem] rounded-full border border-white/[0.035]" />
            <div className="absolute top-48 -right-10 size-[28rem] rounded-full border border-white/[0.035]" />

            <div
                data-nav-anchor
                className="webline-gutter relative z-[40] mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-14 xl:px-20"
            >
                <div className="lg:sticky lg:top-32 lg:self-start">
                    <Eyebrow index="01">La historia</Eyebrow>
                    <h2 className="display-title text-[clamp(4rem,9vw,9rem)] leading-[0.78] text-white">
                        NADIE
                        <br />
                        <span className="text-spider-red">RECUERDA</span>
                        <br />
                        SU NOMBRE.
                    </h2>
                    <p className="border-spider-red/60 mt-8 max-w-lg border-l pl-5 text-base leading-7 text-white/58 sm:text-lg">
                        Peter eligió desaparecer de la memoria de quienes ama. Ahora protege una
                        ciudad que conoce el símbolo, pero ya no conoce al hombre detrás de la
                        máscara.
                    </p>
                </div>

                <div className="space-y-6 lg:pt-52">
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm sm:p-10">
                        <div className="absolute top-0 right-0 size-28 bg-[radial-gradient(circle_at_top_right,rgba(220,24,56,.2),transparent_70%)]" />
                        <div className="mb-16 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-white/35 uppercase">
                            <span>Archivo PP-616</span>
                            <span className="text-spider-red flex items-center gap-2">
                                <span className="bg-spider-red size-1.5 animate-pulse rounded-full" />
                                Identidad desconocida
                            </span>
                        </div>
                        <blockquote className="font-display max-w-2xl text-3xl leading-[1.08] tracking-wide text-white uppercase sm:text-5xl">
                            “Ser olvidado no significa dejar de importar.”
                        </blockquote>
                    </div>

                    <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-3">
                        {FACTS.map((fact) => (
                            <div
                                key={fact.value}
                                className="group bg-[#080b12] p-7 transition-colors hover:bg-[#0d111c] sm:min-h-56 sm:p-8"
                            >
                                <span className="font-display group-hover:text-spider-red text-6xl text-white transition-colors sm:text-7xl">
                                    {fact.value}
                                </span>
                                <span className="mt-10 block max-w-[13ch] text-sm leading-5 text-white/44">
                                    {fact.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
