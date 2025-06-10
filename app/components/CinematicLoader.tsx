'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicLoaderProps {
  onComplete: () => void;
  isMobile?: boolean;
}

const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete, isMobile = false }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  const phases = [
    {
      title: "ROLLINS INTERNATIONAL",
      subtitle: "Premium Medical Technology",
      description: "A subsidiary of Singapore-based RHA Holdings",
      buttonText: "Continue"
    },
    {
      title: "WELLNESS INNOVATION",
      subtitle: "Cutting-Edge Therapeutic Devices",
      description: "Partnering with global leaders from Germany, Poland, Italy & USA",
      buttonText: "Learn More"
    },
    {
      title: "MEDICAL EXCELLENCE",
      subtitle: "Professional Healthcare Solutions",
      description: "Delivering innovative health & wellness solutions since inception",
      buttonText: "Discover"
    },
    {
      title: "WELCOME TO",
      subtitle: "The Future of Wellness",
      description: "Experience luxury medical technology",
      buttonText: "Enter Experience"
    }
  ];

  // Check if user has already seen the intro
  useEffect(() => {
    const hasSeenBefore = localStorage.getItem('rollins-intro-seen') === 'true';
    if (hasSeenBefore) {
      setHasSeenIntro(true);
      // Skip intro for returning users
      setTimeout(onComplete, 100);
    }
  }, [onComplete]);

  // Handle next phase or completion
  const handleNext = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    } else {
      // Mark as seen and complete
      localStorage.setItem('rollins-intro-seen', 'true');
      onComplete();
    }
  };

  // Handle skip to end
  const handleSkip = () => {
    localStorage.setItem('rollins-intro-seen', 'true');
    onComplete();
  };

  // Don't render if user has already seen it
  if (hasSeenIntro) {
    return null;
  }

  const currentPhaseData = phases[currentPhase];
  const progress = ((currentPhase + 1) / phases.length) * 100;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Enhanced Mobile Background Elements */}
      <div className="absolute inset-0">
        {/* Device-responsive Floating Orbs */}
        <motion.div
          className={`absolute ${isMobile ? 'top-16 left-8 w-24 h-24' : 'top-20 left-20 w-32 h-32'} bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-full blur-xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, isMobile ? 30 : 50, 0],
            y: [0, isMobile ? -20 : -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute ${isMobile ? 'bottom-24 right-8 w-32 h-32' : 'bottom-32 right-32 w-40 h-40'} bg-gradient-to-br from-red-500/15 to-orange-600/10 rounded-full blur-xl`}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            x: [0, isMobile ? -25 : -40, 0],
            y: [0, isMobile ? 25 : 40, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute top-1/2 left-1/2 ${isMobile ? 'w-16 h-16' : 'w-24 h-24'} bg-gradient-to-br from-teal-500/25 to-cyan-600/15 rounded-full blur-lg`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Mobile-optimized Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className={`w-full h-full bg-grid-white/[0.05] ${isMobile ? 'bg-[size:30px_30px]' : 'bg-[size:50px_50px]'}`} />
        </div>

        {/* Enhanced Gradient Overlay for Mobile */}
        <div className={`absolute inset-0 ${isMobile ? 'bg-gradient-to-t from-black/90 via-transparent to-black/70' : 'bg-gradient-to-t from-black/80 via-transparent to-black/60'}`} />
      </div>

      {/* Skip Button - Mobile Optimized */}
      <motion.button
        onClick={handleSkip}
        className={`absolute ${isMobile ? 'top-4 right-4 px-3 py-2 text-xs' : 'top-6 right-6 px-4 py-2 text-xs'} z-20 font-light text-white/60 hover:text-white tracking-[0.2em] uppercase transition-colors duration-300`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Skip Intro
      </motion.button>

      {/* Main Content Container - Enhanced Mobile Layout */}
      <div className={`relative z-10 flex flex-col items-center justify-center h-full ${isMobile ? 'px-6' : 'px-8'} text-center`}>
        {/* Logo/Brand Section - Mobile Optimized */}
        <motion.div
          className={isMobile ? "mb-12" : "mb-16"}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} mx-auto ${isMobile ? 'mb-4' : 'mb-6'} bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center`}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(34, 211, 238, 0.3)",
                "0 0 40px rgba(34, 211, 238, 0.6)",
                "0 0 20px rgba(34, 211, 238, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>R</span>
          </motion.div>
        </motion.div>

        {/* Phase Content - Enhanced Mobile Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            className={`text-center ${isMobile ? 'space-y-3 max-w-sm' : 'space-y-6 max-w-lg'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Title - Mobile Optimized Typography */}
            <motion.h1
              className={`font-light tracking-[0.2em] text-white ${isMobile ? 'text-xl leading-tight' : 'text-4xl md:text-5xl'}`}
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: isMobile ? "0.2em" : "0.3em" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {currentPhaseData.title}
            </motion.h1>

            {/* Subtitle - Mobile Optimized */}
            <motion.h2
              className={`font-light text-cyan-300 ${isMobile ? 'text-base' : 'text-xl md:text-2xl'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentPhaseData.subtitle}
            </motion.h2>

            {/* Description - Mobile Optimized */}
            <motion.p
              className={`text-white/70 font-light leading-relaxed ${isMobile ? 'text-sm px-2' : 'text-base'} mx-auto`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {currentPhaseData.description}
            </motion.p>

            {/* Action Button - Mobile Optimized */}
            <motion.div
              className={isMobile ? "pt-6" : "pt-8"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                onClick={handleNext}
                className={`group relative ${isMobile ? 'px-6 py-3 text-xs' : 'px-8 py-4 text-sm'} bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-light tracking-[0.2em] uppercase rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center justify-center">
                  {currentPhaseData.buttonText}
                  <motion.svg
                    className={`${isMobile ? 'w-3 h-3 ml-1' : 'w-4 h-4 ml-2'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Section - Mobile Optimized */}
        <motion.div
          className={`absolute ${isMobile ? 'bottom-12' : 'bottom-16'} left-1/2 transform -translate-x-1/2 w-full ${isMobile ? 'max-w-xs px-6' : 'max-w-md px-8'}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Progress Bar */}
          <div className="relative">
            <div className="h-px bg-white/20 w-full rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
                  animate={{
                    boxShadow: [
                      "0 0 8px rgba(255, 255, 255, 0.6)",
                      "0 0 16px rgba(255, 255, 255, 0.8)",
                      "0 0 8px rgba(255, 255, 255, 0.6)"
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>

          {/* Progress Text */}
          <motion.div
            className={`flex justify-between items-center mt-3 ${isMobile ? 'text-xs' : 'text-xs'} text-white/60 font-light tracking-wider`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span>INTRODUCTION</span>
            <span>{currentPhase + 1} / {phases.length}</span>
          </motion.div>

          {/* Phase Navigation Dots */}
          <div className={`flex justify-center space-x-2 ${isMobile ? 'mt-3' : 'mt-4'}`}>
            {phases.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPhase(index)}
                className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full transition-all duration-300 ${
                  index === currentPhase 
                    ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                    : index < currentPhase 
                    ? 'bg-cyan-600/60' 
                    : 'bg-white/30'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements - Mobile Responsive */}
        <div className={`absolute ${isMobile ? 'top-6 left-6' : 'top-8 left-8'}`}>
          <motion.div
            className={`w-1 ${isMobile ? 'h-8' : 'h-12'} bg-gradient-to-b from-cyan-400 to-transparent`}
            initial={{ height: 0 }}
            animate={{ height: isMobile ? 32 : 48 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>
        <div className={`absolute ${isMobile ? 'top-6 right-6' : 'top-8 right-8'}`}>
          <motion.div
            className={`${isMobile ? 'w-8' : 'w-12'} h-1 bg-gradient-to-r from-cyan-400 to-transparent`}
            initial={{ width: 0 }}
            animate={{ width: isMobile ? 32 : 48 }}
            transition={{ duration: 2, delay: 0.7 }}
          />
        </div>
        <div className={`absolute ${isMobile ? 'bottom-6 left-6' : 'bottom-8 left-8'}`}>
          <motion.div
            className={`${isMobile ? 'w-8' : 'w-12'} h-1 bg-gradient-to-r from-transparent to-cyan-400`}
            initial={{ width: 0 }}
            animate={{ width: isMobile ? 32 : 48 }}
            transition={{ duration: 2, delay: 0.9 }}
          />
        </div>
        <div className={`absolute ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'}`}>
          <motion.div
            className={`w-1 ${isMobile ? 'h-8' : 'h-12'} bg-gradient-to-t from-cyan-400 to-transparent`}
            initial={{ height: 0 }}
            animate={{ height: isMobile ? 32 : 48 }}
            transition={{ duration: 2, delay: 1.1 }}
          />
        </div>
      </div>

      {/* Subtle Particle Effect - Mobile Optimized */}
      {Array.from({ length: isMobile ? 10 : 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, isMobile ? -60 : -100, isMobile ? -120 : -200]
          }}
          transition={{
            duration: isMobile ? 3 : 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>
  );
};

export default CinematicLoader; 