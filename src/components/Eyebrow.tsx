import type { ReactNode } from 'react';

type EyebrowProps = {
    index: string;
    children: ReactNode;
};

export default function Eyebrow({ index, children }: EyebrowProps) {
    return (
        <div className="mb-7 flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.3em] text-white/55 uppercase sm:text-xs">
            <span className="border-spider-red/50 text-spider-red inline-grid size-8 shrink-0 place-items-center rounded-full border font-sans text-[10px] leading-none font-extrabold tracking-normal tabular-nums">
                {index}
            </span>
            <span>{children}</span>
            <span className="h-px w-12 bg-gradient-to-r from-white/40 to-transparent" />
        </div>
    );
}
