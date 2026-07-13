import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

console.info(
    [
        '╭──────────────────────────────────────────────────────────────╮',
        '│  🕷  EY, MIDU, O QUIEN ESTÉ REVISANDO ESTA LANDING          │',
        '╰──────────────────────────────────────────────────────────────╯',
        '',
        'Si abriste DevTools, supongo que viniste a revisar cómo está',
        'tejida la experiencia. Muchas gracias por tomarte el tiempo :)',
    ].join('\n'),
);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
