'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Product } from '../data/products';
import MedicalDevice3D from './MedicalDevice3D';

interface ProductShowcaseProps {
  product: Product;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ product }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [isInView, setIsInView] = useState(true);

  // Enhanced scroll tracking with velocity
  useEffect(() => {
    let lastScrollY = 0;
    let lastTime = Date.now();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / (docHeight || 1), 1);
      
      // Calculate velocity
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime;
      const scrollDelta = scrollTop - lastScrollY;
      const velocity = Math.abs(scrollDelta / timeDelta) * 10;
      
      setScrollProgress(progress);
      setScrollVelocity(Math.min(velocity, 5)); // Cap velocity
      
      lastScrollY = scrollTop;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll phase detection
  const getScrollPhase = () => {
    if (scrollProgress < 0.15) return 'intro';
    if (scrollProgress < 0.35) return 'explore';
    if (scrollProgress < 0.55) return 'analyze';
    if (scrollProgress < 0.75) return 'discover';
    return 'complete';
  };

  const currentPhase = getScrollPhase();

  return (
    <motion.div 
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Enhanced 3D Model Display */}
      <div className="w-full h-full relative">
        <MedicalDevice3D
          modelUrl={product.model3d}
          fallbackImage={product.image}
          deviceName={product.name}
          category={product.category}
          rating={product.rating}
        />
        
        {/* Advanced Scroll Progress Visualization */}
        <motion.div 
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* Main progress line */}
          <div className="relative">
            <div className="w-1 h-48 bg-gradient-to-b from-slate-600/30 via-slate-500/50 to-slate-600/30 rounded-full">
              <motion.div 
                className="w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 rounded-full origin-top"
                style={{ 
                  height: `${scrollProgress * 100}%`,
                  boxShadow: `0 0 20px ${scrollProgress > 0.5 ? '#a855f7' : '#60a5fa'}40`
                }}
              />
            </div>
            
            {/* Phase indicators */}
            <div className="absolute -right-16 top-0 space-y-12">
              {['Intro', 'Explore', 'Analyze', 'Discover', 'Complete'].map((phase, index) => {
                const isActive = index === ['intro', 'explore', 'analyze', 'discover', 'complete'].indexOf(currentPhase);
                const threshold = index * 0.2;
                const isPassed = scrollProgress > threshold;
                
                return (
                  <motion.div
                    key={phase}
                    className={`flex items-center space-x-3 ${isActive ? 'text-white' : isPassed ? 'text-gray-400' : 'text-gray-600'}`}
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      x: isActive ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      isActive ? 'bg-white border-white shadow-lg' : 
                      isPassed ? 'bg-gray-400 border-gray-400' : 'border-gray-600'
                    }`} />
                    <span className="text-sm font-medium tracking-wide">{phase}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Velocity-Based Visual Effects */}
        <AnimatePresence>
          {scrollVelocity > 1 && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Speed lines effect */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: '0%',
                      width: '100%',
                    }}
                    animate={{
                      x: ['0%', '100%'],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase-Based Contextual Information */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            className="absolute bottom-8 left-8 z-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-slate-900/90 backdrop-blur-lg border border-white/10 rounded-xl p-4 max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-white font-semibold text-sm uppercase tracking-wide">
                  {currentPhase}
                </span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                {getPhaseDescription(currentPhase, product.name)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll Encouragement */}
        <AnimatePresence>
          {scrollProgress < 0.1 && (
            <motion.div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <div className="flex flex-col items-center space-y-3">
                <span className="text-white/80 text-sm font-medium tracking-wide">
                  Scroll to explore
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
                >
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-3 bg-white/60 rounded-full mt-2"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Immersive Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Dynamic gradient overlay */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, #8b5cf6 0%, transparent 50%)',
                'radial-gradient(circle at 20% 80%, #06b6d4 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Subtle floor gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
          
          {/* Edge vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/20" />
        </div>

        {/* Completion Celebration */}
        <AnimatePresence>
          {scrollProgress > 0.95 && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-purple-500/5 to-transparent" />
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="text-6xl">✨</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Phase descriptions
const getPhaseDescription = (phase: string, deviceName: string): string => {
  const descriptions: Record<string, string> = {
    intro: `Begin your journey exploring the ${deviceName}. Watch as it comes to life with interactive 3D visualization.`,
    explore: `Discover the exterior design and build quality. Notice the premium materials and precision engineering.`,
    analyze: `Examine the advanced features and technology components. See how each system integrates seamlessly.`,
    discover: `Uncover the therapeutic capabilities and medical-grade specifications that set this device apart.`,
    complete: `Experience complete. You've explored every aspect of this revolutionary medical technology.`
  };
  return descriptions[phase] || 'Continue scrolling to explore more features.';
};

export default ProductShowcase; 