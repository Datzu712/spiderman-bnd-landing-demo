export default function SpiderGlyph({ className = '' }: { className?: string }) {
    return (
        <svg aria-hidden="true" className={className} viewBox="0 0 64 64" fill="none">
            <path
                d="M32 18c5 0 8 4 8 9 0 3-1 5-3 7 3 5 4 10 3 16h-5l-3-10-3 10h-5c-1-6 0-11 3-16-2-2-3-4-3-7 0-5 3-9 8-9Z"
                fill="currentColor"
            />
            <path
                d="m27 25-10-8M37 25l10-8M25 31 13-1M39 31l13-1M25 36 14 6M39 36l14 6M24 41 9 12M40 41l9 12"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
