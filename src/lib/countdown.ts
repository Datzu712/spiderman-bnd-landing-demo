const RELEASE_DATE = new Date('2026-07-31T00:00:00-04:00');

export type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    released: boolean;
};

export function getTimeLeft(): TimeLeft {
    const difference = RELEASE_DATE.getTime() - Date.now();
    const total = Math.max(0, difference);

    return {
        days: Math.floor(total / 86_400_000),
        hours: Math.floor((total / 3_600_000) % 24),
        minutes: Math.floor((total / 60_000) % 60),
        seconds: Math.floor((total / 1000) % 60),
        released: difference <= 0,
    };
}
