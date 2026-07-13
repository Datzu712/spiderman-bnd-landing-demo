import SpiderGlyph from '../components/SpiderGlyph';

export default function Footer() {
    return (
        <footer className="webline-gutter bg-ink relative z-[40] border-t border-white/[0.08] px-5 py-8 sm:px-8 lg:px-14 xl:px-20">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-6 text-[10px] tracking-[0.18em] text-white/35 uppercase sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <SpiderGlyph className="text-spider-red size-6" />
                    <span>Fan-made interactive concept · No oficial</span>
                </div>
                <div className="flex flex-wrap items-center gap-5">
                    <a href="#inicio" className="transition-colors hover:text-white">
                        Volver arriba
                    </a>
                    <a
                        href="https://www.marvel.com/movies/spider-man-brand-new-day"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white"
                    >
                        Marvel
                    </a>
                    <span>Demo 2026</span>
                </div>
            </div>
        </footer>
    );
}
