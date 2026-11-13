import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { TransformationCase } from '../data/transformationsData';
import { DentalVisualizer } from './DentalVisualizer';

interface BeforeAfterSliderProps {
  caseItem: TransformationCase;
  isAm: boolean;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  caseItem,
  isAm,
  className = '',
}) => {
  // Slider position from 0 to 100 (percentage revealed of the AFTER image)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [prevCaseId, setPrevCaseId] = useState<string>(caseItem.id);
  const [beforeImgFailed, setBeforeImgFailed] = useState<boolean>(false);
  const [afterImgFailed, setAfterImgFailed] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync position to default 50 and reset image error state when the case changes
  if (prevCaseId !== caseItem.id) {
    setPrevCaseId(caseItem.id);
    setSliderPosition(50);
    setBeforeImgFailed(false);
    setAfterImgFailed(false);
  }

  const renderView = (view: 'before' | 'after') => {
    const imgSrc = view === 'before' ? caseItem.beforeImage : caseItem.afterImage;
    const hasFailed = view === 'before' ? beforeImgFailed : afterImgFailed;

    if (imgSrc && !hasFailed) {
      return (
        <img
          src={imgSrc}
          alt={`${caseItem.titleEn} - ${view}`}
          className="w-full h-full object-cover select-none pointer-events-none"
          onError={() => {
            if (view === 'before') setBeforeImgFailed(true);
            else setAfterImgFailed(true);
          }}
        />
      );
    }
    return <DentalVisualizer caseItem={caseItem} view={view} />;
  };

  // Handle pointer/touch/mouse movement
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    } else if (e.key === 'Home') {
      setSliderPosition(0);
    } else if (e.key === 'End') {
      setSliderPosition(100);
    }
  };

  return (
    <div className={`flex flex-col space-y-3.5 ${className}`}>
      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Dental Before and After comparison slider"
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 cursor-ew-resize select-none touch-none focus:outline-hidden focus:ring-3 focus:ring-teal-400 bg-slate-950 group"
      >
        {/* Layer 1: BEFORE View (Full background) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {renderView('before')}
        </div>

        {/* Layer 2: AFTER View (Clipped according to sliderPosition from 0 to 100%) */}
        <div
          className="absolute inset-0 h-full overflow-hidden pointer-events-none transition-[clip-path] duration-75 ease-out"
          style={{
            clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`,
          }}
        >
          {renderView('after')}
        </div>

        {/* Floating Badges */}
        {/* 'BEFORE' Badge (Fades slightly when slider moves far left) */}
        <div
          className="absolute top-4 left-4 z-20 transition-opacity duration-200 pointer-events-none"
          style={{ opacity: sliderPosition < 15 ? 0.2 : 1 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-slate-950/85 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-lg">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAm ? 'ከህክምና በፊት' : 'BEFORE'}</span>
          </span>
        </div>

        {/* 'AFTER' Badge (Fades slightly when slider moves far right) */}
        <div
          className="absolute top-4 right-4 z-20 transition-opacity duration-200 pointer-events-none"
          style={{ opacity: sliderPosition > 85 ? 0.2 : 1 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-teal-950/85 text-teal-300 border border-teal-400/40 backdrop-blur-md shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>{isAm ? 'ከህክምና በኋላ' : 'AFTER'}</span>
          </span>
        </div>

        {/* Center Draggable Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none transition-[left] duration-75 ease-out flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Glowing vertical line */}
          <div className="w-0.5 h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(45,212,191,0.8)]" />

          {/* Center Draggable Knob */}
          <motion.div
            animate={{
              scale: isDragging ? 1.15 : 1,
            }}
            className="absolute w-10 h-10 sm:w-12 sm:h-12 -translate-x-1/2 rounded-full bg-gradient-to-tr from-slate-900 via-teal-700 to-cyan-500 text-white shadow-2xl border-2 border-white flex items-center justify-center cursor-ew-resize group-hover:shadow-teal-500/50"
          >
            {/* Left and Right directional arrows */}
            <div className="flex items-center gap-1 text-[11px] font-black tracking-tighter">
              <span>◀</span>
              <span className="text-teal-200">|</span>
              <span>▶</span>
            </div>

            {/* Glowing ring animation while dragging */}
            {isDragging && (
              <span className="absolute -inset-1 rounded-full bg-teal-400 opacity-60 animate-ping pointer-events-none" />
            )}
          </motion.div>
        </div>

        {/* Mobile / First-time hint tooltip (fades out on interaction) */}
        {!isDragging && sliderPosition === 50 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-slate-200 bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2 animate-pulse">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              <span>{isAm ? 'ለማየት ወደ ግራና ቀኝ ይጎትቱ' : 'Drag left & right to compare'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Comparison Presets Bar */}
      <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-100/80 p-2 sm:p-2.5 rounded-2xl border border-slate-200/90">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSliderPosition(100)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              sliderPosition >= 90
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isAm ? 'ከህክምና በፊት ብቻ (100%)' : 'Before View'}
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              sliderPosition > 20 && sliderPosition < 80
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isAm ? '50 / 50 ንጽጽር' : '50/50 Split'}
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(0)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              sliderPosition <= 10
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isAm ? 'ውጤቱ ብቻ' : 'After View'}
          </button>
        </div>

        {/* Revealed Percentage Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-500 font-semibold text-[11px] pr-1">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>
            {Math.round(100 - sliderPosition)}% {isAm ? 'የውጤት ገጽታ' : 'Transformation Revealed'}
          </span>
        </div>
      </div>
    </div>
  );
};
