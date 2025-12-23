import React, { useState, useEffect, useCallback } from 'react';
import { Logo } from './components/Logo';
import { Navigation } from './components/Navigation';
import { WelcomeSlide, AgendaSlide, ProblemSlide, DataSlide, DataSlide2, SolutionSlide1, SolutionSlide2, SolutionSlide3, SolutionSlide4, OperationsSlide, PartnersSlide, PlanSlide, DiscussionSlide } from './components/Slides';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_SLIDES = 13;

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for up, 1 for down
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle slide change
  const changeSlide = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < TOTAL_SLIDES && newIndex !== currentSlide && !isAnimating) {
      setDirection(newIndex > currentSlide ? 1 : -1);
      setCurrentSlide(newIndex);
      setIsAnimating(true);
    }
  }, [currentSlide, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        changeSlide(currentSlide + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        changeSlide(currentSlide - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeSlide, currentSlide]);

  // Wheel navigation (Throttled)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (e.deltaY > 50) {
          changeSlide(currentSlide + 1);
        } else if (e.deltaY < -50) {
          changeSlide(currentSlide - 1);
        }
      }, 100);
    };

    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(timeout);
    };
  }, [changeSlide, currentSlide, isAnimating]);

  // Reset animation lock
  const onAnimationComplete = () => {
    setIsAnimating(false);
  };

  // Variants for slide transition
  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom expensive easing
      }
    },
    exit: (dir: number) => ({
      y: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }
    })
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: return <WelcomeSlide />;
      case 1: return <AgendaSlide />;
      case 2: return <ProblemSlide />;
      case 3: return <DataSlide />;
      case 4: return <DataSlide2 />;
      case 5: return <SolutionSlide1 />;
      case 6: return <SolutionSlide2 />;
      case 7: return <SolutionSlide3 />;
      case 8: return <SolutionSlide4 />;
      case 9: return <OperationsSlide />;
      case 10: return <PartnersSlide />;
      case 11: return <PlanSlide />;
      case 12: return <DiscussionSlide />;
      default: return <WelcomeSlide />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-uremont-dark overflow-hidden text-white selection:bg-uremont-blue selection:text-white">
      
      {/* --- Fixed Header --- */}
      <div className="absolute top-8 left-8 md:left-12 z-50">
        <Logo className="cursor-pointer hover:opacity-80 transition-opacity" />
      </div>

      {/* --- Right Navigation --- */}
      <Navigation 
        currentSlide={currentSlide} 
        totalSlides={TOTAL_SLIDES} 
        onNavigate={changeSlide} 
      />

      {/* --- Fixed Footer (Only slides > 0) --- */}
      <AnimatePresence>
        {currentSlide > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 right-12 z-40 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Презентация</p>
                <p className="text-sm font-bold text-uremont-blue">UREMONT AI 2.0</p>
              </div>
              <div className="h-8 w-[1px] bg-gray-700"></div>
              <div className="text-xl font-mono text-gray-500">
                {currentSlide < 10 ? `0${currentSlide + 1}` : currentSlide + 1} <span className="text-gray-700 text-sm">/ {TOTAL_SLIDES}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main Content Area --- */}
      <div className="w-full h-full relative">
        <AnimatePresence initial={false} custom={direction} mode="wait" onExitComplete={onAnimationComplete}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background Noise/Grid overlay for texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
      </div>
    </div>
  );
};

export default App;