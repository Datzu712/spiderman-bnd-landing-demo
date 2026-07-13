import { useState } from 'react';
import { LazyMotion } from 'motion/react';
import ScrollProgress from './components/ScrollProgress';
import SwingStage from './components/SwingStage';
import SymbioteBreach from './components/SymbioteBreach';
import WebNav from './components/WebNav';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
import ReleaseChapter from './sections/ReleaseChapter';
import StoryChapter from './sections/StoryChapter';
import SuitLab from './sections/SuitLab';
import TrailerChapter from './sections/TrailerChapter';

const loadMotionFeatures = () => import('./lib/motion-features').then((mod) => mod.default);

export default function App() {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [symbioteBreachActive, setSymbioteBreachActive] = useState(false);

    return (
        <LazyMotion features={loadMotionFeatures} strict>
            <a href="#main-content" className="skip-link">
                Saltar al contenido
            </a>
            <ScrollProgress />
            <WebNav />
            <SwingStage />
            <SymbioteBreach
                active={symbioteBreachActive}
                onComplete={() => setSymbioteBreachActive(false)}
            />
            <main id="main-content">
                <Hero onOpenTrailer={() => setIsTrailerOpen(true)} />
                <StoryChapter />
                <SuitLab
                    isSymbioteBreachActive={symbioteBreachActive}
                    onSymbioteBreach={() => setSymbioteBreachActive(true)}
                />
                <TrailerChapter
                    isTrailerOpen={isTrailerOpen}
                    onTrailerOpenChange={setIsTrailerOpen}
                />
                <ReleaseChapter />
            </main>
            <Footer />
        </LazyMotion>
    );
}
