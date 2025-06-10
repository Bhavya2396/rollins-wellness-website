'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import to prevent SSR issues
const MedicalDevice3D = dynamic(() => import('./components/MedicalDevice3D'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#2a3142]" />
});

const devices = [
  {
    id: 'hyperbaric',
    name: 'HYPERBARIC CHAMBER',
    model: 'SAMBO VENTEC 3 ATA',
    description: 'Hyperbaric Oxygen Therapy (HBOT) is a cutting-edge, safe, simple, and effective therapy that improves the concentration & supply of oxygen in our blood, which in turn supercharges the rate at which our bodies heal. Under pressurized conditions, your lungs can gather much more oxygen than would be possible breathing pure oxygen at normal air pressure.',
    rating: 4.9,
    modelPath: '/images/f4c77ac8-5524-49b4-9e81-299746ebc08d.glb',
    fallbackImage: '/images/device-placeholder.svg',
    benefits: [
      'Improved brain function and metabolism',
      'Increased tissue oxygenation',
      'Reduced inflammation and swelling',
      'Enhanced wound healing',
      'Strengthened immune system',
      'New blood vessel growth stimulation'
    ],
    specs: [
      { name: 'Pressure Rating', value: '200kPa/2bar (3 ATA)', trigger: 0.1 },
      { name: 'Internal Volume', value: '1.0 ㎥', trigger: 0.25 },
      { name: 'Dimensions', value: 'Ø 760mm x 2,200mm L x 850mm H', trigger: 0.4 },
      { name: 'Weight', value: '270 kg (including controller)', trigger: 0.55 },
      { name: 'Pressurization Time', value: '~15 minutes to 200kPa', trigger: 0.7 },
      { name: 'Material', value: 'Galvanized Steel with powder coating', trigger: 0.85 }
    ]
  },
  {
    id: 'collagen',
    name: 'UBODY COLLAGEN',
    model: 'BED 3.0',
    description: 'Advanced Red Light Therapy device offering a relaxed but powerful solution towards a healthy, balanced lifestyle. It enhances cellular function through targeted wavelengths, stimulating collagen production and promoting tissue repair. The full-body 360° coverage ensures optimal therapeutic light exposure for maximum benefits.',
    rating: 4.8,
    modelPath: '/images/1f6493e2-5cc3-4feb-81b6-ceac68867fe1.glb',
    fallbackImage: '/images/device-placeholder.svg',
    benefits: [
      'Enhanced collagen production',
      'Improved skin texture and tone',
      'Reduced fine lines and wrinkles',
      'Faster muscle recovery',
      'Increased cellular energy (ATP)',
      'Better circulation and healing'
    ],
    specs: [
      { name: 'LED Wavelengths', value: '660nm (Red) + 850nm (NIR)', trigger: 0.1 },
      { name: 'Total Power Output', value: '1000W medical-grade LEDs', trigger: 0.25 },
      { name: 'Coverage Area', value: 'Full body 360° exposure', trigger: 0.4 },
      { name: 'Treatment Time', value: '10-20 minutes per session', trigger: 0.55 },
      { name: 'Control System', value: 'Digital touchscreen interface', trigger: 0.7 },
      { name: 'Safety Features', value: 'Eye protection & timer controls', trigger: 0.85 }
    ]
  },
  {
    id: 'cryotherapy',
    name: 'CRYO ARCTIC',
    model: 'PERFORMANCE™',
    description: '°CRYO Arctic Performance is a single person whole-body cryotherapy chamber designed to deliver the safest and most effective Cryo treatments. Built with state-of-the-art technology innovatively engineered to ensure that clients never come into direct contact with nitrogen vapors, only breathable air.',
    rating: 4.9,
    modelPath: '/images/2a63cebe-5eb0-4618-a1ef-1664be442c11.glb',
    fallbackImage: '/images/device-placeholder.svg',
    benefits: [
      'Enhanced athletic performance',
      'Accelerated muscle recovery',
      'Natural skin rejuvenation',
      'Mood elevation and stress relief',
      'Improved sleep quality',
      'Reduced inflammation throughout body'
    ],
    specs: [
      { name: 'Temperature Range', value: 'Up to -140°C / -220°F', trigger: 0.1 },
      { name: 'Treatment Duration', value: '2-3 minutes per session', trigger: 0.25 },
      { name: 'Safety System', value: 'Breathable air only (no nitrogen contact)', trigger: 0.4 },
      { name: 'Interior Features', value: 'Touch screen, sound system, adjustable window', trigger: 0.55 },
      { name: 'Smart Technology', value: 'Wi-Fi connectivity for remote assistance', trigger: 0.7 },
      { name: 'Safety Monitoring', value: 'Built-in oxygen & temperature sensors', trigger: 0.85 }
    ]
  }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDevice, setCurrentDevice] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  
  const { scrollYProgress } = useScroll();
  
  // Enhanced loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll progress tracking for feature highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollTop / Math.max(documentHeight, 1), 1);
      
      setScrollProgress(progress);
      
      // Determine active spec based on scroll progress
      const currentSpecs = devices[currentDevice].specs;
      const activeIndex = currentSpecs.findIndex((spec, index) => {
        const nextSpec = currentSpecs[index + 1];
        return progress >= spec.trigger && (!nextSpec || progress < nextSpec.trigger);
      });
      
      if (activeIndex >= 0) {
        setActiveSpecIndex(activeIndex);
      } else if (progress < currentSpecs[0].trigger) {
        setActiveSpecIndex(0);
      }
    };

    // Initial call to set correct state
    handleScroll();
    
    // Add both scroll and touch events for better mobile support
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [currentDevice]);

  // Benefits cycling system
  useEffect(() => {
    const benefitInterval = setInterval(() => {
      setActiveBenefitIndex(prev => {
        const maxBenefits = Math.min(currentDeviceData.benefits.length, 4);
        return (prev + 1) % maxBenefits;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(benefitInterval);
  }, [currentDevice, devices]);

  // Device switching with scroll reset
  const switchDevice = (index: number) => {
    if (index !== currentDevice) {
      setCurrentDevice(index);
      setActiveSpecIndex(0);
      setActiveBenefitIndex(0);
      setScrollProgress(0);
      // Reset scroll position to top for new device
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentDeviceData = devices[currentDevice];

  // Map benefits to anatomical systems for targeted animations - BENEFIT-SPECIFIC
  const getBenefitAnimationSystem = (benefitIndex: number, deviceName: string) => {
    if (deviceName.includes('HYPERBARIC')) {
      // 0: Brain function, 1: Tissue oxygenation, 2: Inflammation, 3: Wound healing
      const systems = ['brain-function', 'tissue-oxygenation', 'inflammation-reduction', 'wound-healing'];
      return systems[benefitIndex] || 'brain-function';
    } else if (deviceName.includes('UBODY')) {
      // 0: Collagen production, 1: Skin texture, 2: Fine lines, 3: Muscle recovery
      const systems = ['collagen-production', 'skin-texture', 'anti-aging', 'muscle-recovery'];
      return systems[benefitIndex] || 'collagen-production';
    } else {
      // 0: Athletic performance, 1: Muscle recovery, 2: Skin rejuvenation, 3: Mood/stress
      const systems = ['athletic-performance', 'muscle-recovery', 'skin-rejuvenation', 'mood-stress'];
      return systems[benefitIndex] || 'athletic-performance';
    }
  };

  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div 
          className="min-h-screen bg-[#2a3142] flex items-center justify-center relative overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 border-2 border-white/30 border-t-white rounded-full mx-auto mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <h1 className="text-2xl font-light text-white mb-4 tracking-[0.3em] uppercase">ROLLINS WELLNESS</h1>
            <p className="text-white/60 text-sm tracking-wide">Wellness Technology</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background System - Changes per product */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic primary gradient based on current device */}
        <motion.div 
          className="absolute inset-0"
          key={currentDevice}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {currentDevice === 0 && (
            <>
              {/* Hyperbaric Chamber - Deep Ocean Blue Theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-blue-900/20 to-slate-900/60" />
              
              <motion.div 
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/25 to-cyan-500/20 rounded-full blur-3xl"
                animate={{ 
                  x: [0, 120, 0],
                  y: [0, -60, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-blue-600/15 rounded-full blur-3xl"
                animate={{ 
                  x: [0, -100, 0],
                  y: [0, 80, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              />
            </>
          )}
          
          {currentDevice === 1 && (
            <>
              {/* Collagen Bed - Warm Red Light Therapy Theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900/25 to-slate-900" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-red-900/15 to-slate-900/60" />
              
              <motion.div 
                className="absolute top-1/3 left-1/5 w-[400px] h-[400px] bg-gradient-to-r from-red-500/20 to-orange-500/15 rounded-full blur-3xl"
                animate={{ 
                  x: [0, 80, 0],
                  y: [0, -40, 0],
                  scale: [1, 1.4, 1]
                }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-gradient-to-r from-amber-500/18 to-red-500/12 rounded-full blur-3xl"
                animate={{ 
                  x: [0, -90, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              />
            </>
          )}
          
          {currentDevice === 2 && (
            <>
              {/* Cryotherapy - Cool Ice Blue Theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-cyan-900/15 to-slate-900/65" />
              
              <motion.div 
                className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-r from-cyan-400/25 to-blue-400/20 rounded-full blur-3xl"
                animate={{ 
                  x: [0, 110, 0],
                  y: [0, -70, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-teal-500/22 to-cyan-500/18 rounded-full blur-3xl"
                animate={{ 
                  x: [0, -70, 0],
                  y: [0, 90, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 6 }}
              />
            </>
          )}
        </motion.div>
        
        {/* Universal elements */}
        {/* Subtle grid pattern - adapts to current device */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '60px 60px'
               }}
          />
        </div>
        
        {/* Dynamic light rays based on current device */}
        <motion.div 
          className="absolute inset-0 opacity-8"
          key={`rays-${currentDevice}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.5 }}
        >
          {currentDevice === 0 && (
            <>
              <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-blue-300 via-transparent to-transparent transform -translate-x-1/2 rotate-12" />
              <div className="absolute top-0 left-1/3 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-transparent to-transparent transform rotate-8" />
            </>
          )}
          {currentDevice === 1 && (
            <>
              <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-red-300 via-transparent to-transparent transform -translate-x-1/2 rotate-15" />
              <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-orange-400 via-transparent to-transparent transform -rotate-10" />
            </>
          )}
          {currentDevice === 2 && (
            <>
              <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-cyan-200 via-transparent to-transparent transform -translate-x-1/2 rotate-10" />
              <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-teal-400 via-transparent to-transparent transform rotate-5" />
            </>
          )}
        </motion.div>
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-transparent backdrop-blur-sm">
        <div className="flex justify-between items-center px-4 md:px-12 py-4 md:py-8">
          {/* Left - Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className={`text-xs md:text-sm font-light tracking-[0.4em] uppercase font-mono transition-colors duration-1000 ${
              currentDevice === 0 ? 'text-cyan-200' : 
              currentDevice === 1 ? 'text-red-200' : 
              'text-teal-200'
            }`}>
              ROLLINS WELLNESS
            </h1>
          </motion.div>
          
          {/* Right - Navigation - Hidden on mobile */}
          <motion.div 
            className="hidden md:flex gap-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a href="#" className="text-white/70 hover:text-white text-xs tracking-[0.2em] uppercase font-light transition-colors duration-300">GALLERY</a>
            <a href="#" className="text-white/70 hover:text-white text-xs tracking-[0.2em] uppercase font-light transition-colors duration-300">ABOUT</a>
            <a href="#" className="text-white/70 hover:text-white text-xs tracking-[0.2em] uppercase font-light transition-colors duration-300">CONTACT</a>
          </motion.div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="fixed inset-0 flex flex-col md:flex-row">
        
        {/* Left Side - Product Info */}
        <div className="w-full md:w-1/4 flex flex-col justify-center px-4 md:px-8 py-16 md:py-20 order-2 md:order-1">
          <motion.div
            key={currentDevice}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-sm mx-auto md:mx-0"
          >
            {/* Product Name - Enhanced McLaren Style */}
            <div className="mb-8 md:mb-16 text-center md:text-left">
              <motion.h2 
                className={`text-2xl md:text-6xl lg:text-7xl font-thin leading-[0.8] mb-2 tracking-[-0.02em] uppercase font-mono transition-colors duration-1000 ${
                  currentDevice === 0 ? 'text-cyan-200' : 
                  currentDevice === 1 ? 'text-red-200' : 
                  'text-cyan-100'
                }`}
                style={{
                  textShadow: currentDevice === 0 ? '0 0 40px rgba(34, 211, 238, 0.3)' : 
                             currentDevice === 1 ? '0 0 40px rgba(248, 113, 113, 0.3)' : 
                             '0 0 40px rgba(34, 211, 238, 0.2)',
                  fontFeatureSettings: '"ss01" 1, "kern" 1'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {currentDeviceData.name}
              </motion.h2>
              <motion.h3 
                className={`text-lg md:text-2xl font-light leading-tight tracking-[0.1em] uppercase transition-colors duration-1000 ${
                  currentDevice === 0 ? 'text-blue-300/90' : 
                  currentDevice === 1 ? 'text-orange-300/90' : 
                  'text-teal-300/90'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {currentDeviceData.model}
              </motion.h3>
            </div>
            


            {/* Description - Enhanced McLaren Style */}
            <motion.p 
              className="text-white/75 text-sm md:text-base leading-relaxed mb-12 md:mb-20 font-light max-w-sm text-center md:text-left"
              style={{ lineHeight: '1.6' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Rollins has mechanically advanced, powerful and captivating medical devices that deliver {currentDeviceData.description.toLowerCase()}
            </motion.p>
            
            {/* Human Body Effects - Enhanced Medical Visualization */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <div className="relative flex-shrink-0">
                {/* Human Body SVG - Enhanced Anatomy */}
                <svg 
                  width="80" 
                  height="140" 
                  viewBox="0 0 120 200" 
                  className="md:w-[120px] md:h-[200px] filter drop-shadow-lg"
                >
                  {/* Enhanced Body Silhouette with more anatomical detail */}
                  <path
                    d="M60 8 C67 8 72 13 72 22 C72 30 67 36 60 38 C53 36 48 30 48 22 C48 13 53 8 60 8 Z
                       M60 38 C67 38 70 42 70 48 L70 56 C70 62 67 64 60 64 C53 64 50 62 50 56 L50 48 C50 42 53 38 60 38 Z
                       M60 64 C72 64 77 67 77 77 L77 122 C77 132 72 137 60 137 C48 137 43 132 43 122 L43 77 C43 67 48 64 60 64 Z
                       M60 137 L58 162 L55 192 L48 197 L43 192 L46 162 L50 137
                       M60 137 L62 162 L65 192 L72 197 L77 192 L74 162 L70 137
                       M50 72 L32 77 L27 87 L32 97 L43 92 L50 87
                       M70 72 L88 77 L93 87 L88 97 L77 92 L70 87"
                    fill="rgba(255, 255, 255, 0.12)"
                    stroke="rgba(255, 255, 255, 0.35)"
                    strokeWidth="1.2"
                  />
                  
                  {/* Anatomical Reference Lines */}
                  <defs>
                    <radialGradient id="energyGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </radialGradient>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                      <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0.4)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Device-Specific Therapeutic Effects - Accurate Benefit Representation */}
                  {currentDeviceData.name.includes('HYPERBARIC') ? (
                    <>
                      {/* BENEFIT 0: Improved brain function and metabolism */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'brain-function' && (
                        <motion.g key="brain-function">
                          {/* Enhanced brain with metabolic activity */}
                          <motion.circle
                            cx="60"
                            cy="22"
                            r="16"
                            fill="rgba(59, 130, 246, 0.15)"
                            stroke="rgba(59, 130, 246, 0.8)"
                            strokeWidth="2"
                            animate={{ 
                              scale: [1, 1.15, 1], 
                              opacity: [0.6, 1, 0.6] 
                            }}
                            transition={{ 
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          {/* Neural firing patterns - representing improved function */}
                          {[...Array(8)].map((_, i) => (
                            <motion.circle
                              key={i}
                              cx={60 + Math.cos(i * Math.PI / 4) * 12}
                              cy={22 + Math.sin(i * Math.PI / 4) * 12}
                              r="2"
                              fill="rgba(251, 191, 36, 0.8)"
                              animate={{ 
                                scale: [0, 1.5, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{ 
                                delay: i * 0.2, 
                                duration: 1.6,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                          {/* Metabolic energy indicators */}
                          <motion.path
                            d="M50 22 Q60 15 70 22 Q60 29 50 22"
                            fill="none"
                            stroke="rgba(251, 191, 36, 0.9)"
                            strokeWidth="2"
                            strokeDasharray="2,2"
                            animate={{ 
                              strokeDashoffset: [0, -8],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                        </motion.g>
                      )}
                      
                      {/* BENEFIT 1: Increased tissue oxygenation */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'tissue-oxygenation' && (
                        <motion.g key="tissue-oxygenation">
                          {/* Oxygen saturation throughout body tissues */}
                          <motion.rect
                            x="40"
                            y="60"
                            width="40"
                            height="80"
                            rx="20"
                            fill="rgba(16, 185, 129, 0.1)"
                            stroke="rgba(16, 185, 129, 0.6)"
                            strokeWidth="2"
                            strokeDasharray="6,3"
                            animate={{ 
                              strokeDashoffset: [0, -18],
                              opacity: [0.4, 0.9, 0.4]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          {/* Oxygen molecules flowing through tissues */}
                          {[...Array(12)].map((_, i) => (
                            <motion.circle
                              key={i}
                              cx={45 + (i % 3) * 15}
                              cy={70 + Math.floor(i / 3) * 20}
                              r="2"
                              fill="rgba(16, 185, 129, 0.9)"
                              animate={{ 
                                scale: [1, 1.8, 1],
                                opacity: [0.4, 1, 0.4]
                              }}
                              transition={{ 
                                delay: i * 0.15, 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                          {/* Oxygen flow from lungs */}
                          <motion.path
                            d="M60 45 Q50 50 45 60 Q55 70 65 75 Q70 65 75 60 Q65 50 60 45"
                            fill="none"
                            stroke="rgba(16, 185, 129, 0.8)"
                            strokeWidth="3"
                            strokeDasharray="4,2"
                            animate={{ strokeDashoffset: [0, -12] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.g>
                      )}
                      
                      {/* BENEFIT 2: Reduced inflammation and swelling */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'inflammation-reduction' && (
                        <motion.g key="inflammation-reduction">
                          {/* Anti-inflammatory field reducing swelling */}
                          <motion.ellipse
                            cx="60"
                            cy="85"
                            rx="32"
                            ry="40"
                            fill="rgba(59, 130, 246, 0.1)"
                            stroke="rgba(59, 130, 246, 0.7)"
                            strokeWidth="2"
                            strokeDasharray="8,4"
                            animate={{ 
                              strokeDashoffset: [0, -24],
                              scale: [1.1, 1, 1.1],
                              opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                              opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          {/* Inflammation markers being reduced */}
                          {[
                            { x: 45, y: 75, delay: 0.0 },
                            { x: 75, y: 80, delay: 0.3 },
                            { x: 50, y: 100, delay: 0.6 },
                            { x: 70, y: 110, delay: 0.9 },
                            { x: 60, y: 90, delay: 1.2 }
                          ].map((point, i) => (
                            <motion.g key={i}>
                              {/* Inflammation marker shrinking */}
                              <motion.circle
                                cx={point.x}
                                cy={point.y}
                                r="4"
                                fill="rgba(239, 68, 68, 0.6)"
                                stroke="rgba(239, 68, 68, 0.8)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [1.5, 0.5, 1.5],
                                  opacity: [0.8, 0.2, 0.8]
                                }}
                                transition={{ 
                                  delay: point.delay, 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              {/* Healing wave */}
                              <motion.circle
                                cx={point.x}
                                cy={point.y}
                                r="8"
                                fill="none"
                                stroke="rgba(59, 130, 246, 0.4)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [1, 2.5],
                                  opacity: [0.6, 0]
                                }}
                                transition={{ 
                                  delay: point.delay + 0.5, 
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeOut"
                                }}
                              />
                            </motion.g>
                          ))}
                        </motion.g>
                      )}
                      
                      {/* BENEFIT 3: Enhanced wound healing */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'wound-healing' && (
                        <motion.g key="wound-healing">
                          {/* Wound sites with active healing */}
                          {[
                            { x: 48, y: 80, size: 6, delay: 0.0 },
                            { x: 72, y: 95, size: 5, delay: 0.4 },
                            { x: 55, y: 115, size: 4, delay: 0.8 }
                          ].map((wound, i) => (
                            <motion.g key={i}>
                              {/* Wound area - healing from outside in */}
                              <motion.circle
                                cx={wound.x}
                                cy={wound.y}
                                r={wound.size}
                                fill="rgba(139, 92, 246, 0.2)"
                                stroke="rgba(139, 92, 246, 0.9)"
                                strokeWidth="2"
                                animate={{ 
                                  scale: [1.2, 0.8, 1.2],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                  delay: wound.delay, 
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              {/* Tissue regeneration particles */}
                              {[...Array(6)].map((_, j) => (
                                <motion.circle
                                  key={j}
                                  cx={wound.x + Math.cos(j * Math.PI / 3) * wound.size * 1.5}
                                  cy={wound.y + Math.sin(j * Math.PI / 3) * wound.size * 1.5}
                                  r="1.5"
                                  fill="rgba(16, 185, 129, 0.8)"
                                  animate={{ 
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0]
                                  }}
                                  transition={{ 
                                    delay: wound.delay + j * 0.1, 
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                  }}
                                />
                              ))}
                              {/* Healing progression waves */}
                              <motion.circle
                                cx={wound.x}
                                cy={wound.y}
                                r={wound.size * 2}
                                fill="none"
                                stroke="rgba(16, 185, 129, 0.5)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [1, 2],
                                  opacity: [0.8, 0]
                                }}
                                transition={{ 
                                  delay: wound.delay + 0.5, 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeOut"
                                }}
                              />
                            </motion.g>
                          ))}
                        </motion.g>
                      )}
                    </>
                  ) : currentDeviceData.name.includes('UBODY') ? (
                    <>
                      {/* BENEFIT 0: Enhanced collagen production */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'collagen-production' && (
                        <motion.g key="collagen-production">
                          {/* Collagen synthesis in dermis */}
                          <motion.path
                            d="M40 40 Q60 35 80 40 Q85 55 80 70 Q60 75 40 70 Q35 55 40 40 Z"
                            fill="rgba(248, 113, 113, 0.2)"
                            stroke="rgba(248, 113, 113, 0.8)"
                            strokeWidth="2"
                            strokeDasharray="6,3"
                            animate={{ 
                              strokeDashoffset: [0, -18],
                              opacity: [0.4, 0.9, 0.4]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          {/* Collagen fiber formation */}
                          {[...Array(8)].map((_, i) => (
                            <motion.path
                              key={i}
                              d={`M${45 + i * 4} 45 Q${50 + i * 4} ${40 + Math.sin(i) * 5} ${55 + i * 4} 55 Q${50 + i * 4} ${60 + Math.sin(i) * 5} ${45 + i * 4} 65`}
                              fill="none"
                              stroke="rgba(251, 191, 36, 0.7)"
                              strokeWidth="2"
                              strokeDasharray="3,2"
                              animate={{ 
                                strokeDashoffset: [0, -10],
                                opacity: [0.3, 1, 0.3]
                              }}
                              transition={{ 
                                delay: i * 0.1, 
                                strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" },
                                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                              }}
                            />
                          ))}
                          {/* Red light penetration waves */}
                          {[...Array(3)].map((_, i) => (
                            <motion.ellipse
                              key={i}
                              cx="60"
                              cy="55"
                              rx={20 + i * 8}
                              ry={15 + i * 6}
                              fill="none"
                              stroke="rgba(248, 113, 113, 0.5)"
                              strokeWidth="1"
                              animate={{ 
                                opacity: [0, 0.8, 0],
                                scale: [0.9, 1.2]
                              }}
                              transition={{ 
                                delay: i * 0.4, 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </motion.g>
                      )}
                      
                      {/* BENEFIT 1: Improved skin texture and tone */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'skin-texture' && (
                        <motion.g key="skin-texture">
                          {/* Skin surface improvement */}
                          <motion.path
                            d="M42 38 Q60 33 78 38 Q82 52 78 66 Q60 71 42 66 Q38 52 42 38 Z"
                            fill="rgba(251, 146, 60, 0.2)"
                            stroke="rgba(251, 146, 60, 0.8)"
                            strokeWidth="2"
                            animate={{ 
                              opacity: [0.5, 1, 0.5],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          {/* Texture smoothing pattern */}
                          {[...Array(6)].map((_, i) => (
                            <motion.line
                              key={i}
                              x1={45 + i * 5}
                              y1={42}
                              x2={45 + i * 5}
                              y2={62}
                              stroke="rgba(251, 146, 60, 0.6)"
                              strokeWidth="1"
                              strokeDasharray="2,4"
                              animate={{ 
                                strokeDashoffset: [0, -12],
                                opacity: [0.4, 1, 0.4]
                              }}
                              transition={{ 
                                delay: i * 0.1, 
                                strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" },
                                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                              }}
                            />
                          ))}
                          {/* Skin tone evening effect */}
                          {[
                            { x: 48, y: 45, delay: 0.0 },
                            { x: 60, y: 48, delay: 0.3 },
                            { x: 72, y: 52, delay: 0.6 },
                            { x: 55, y: 58, delay: 0.9 }
                          ].map((spot, i) => (
                            <motion.circle
                              key={i}
                              cx={spot.x}
                              cy={spot.y}
                              r="3"
                              fill="rgba(251, 146, 60, 0.6)"
                              animate={{ 
                                scale: [0.8, 1.4, 0.8],
                                opacity: [0.4, 1, 0.4]
                              }}
                              transition={{ 
                                delay: spot.delay, 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </motion.g>
                      )}
                      
                      {/* BENEFIT 2: Reduced fine lines and wrinkles */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'anti-aging' && (
                        <motion.g key="anti-aging">
                          {/* Wrinkle lines being smoothed */}
                          {[
                            { path: "M45 45 Q55 42 65 45", delay: 0.0 },
                            { path: "M48 50 Q58 47 68 50", delay: 0.3 },
                            { path: "M46 55 Q56 52 66 55", delay: 0.6 },
                            { path: "M50 60 Q60 57 70 60", delay: 0.9 }
                          ].map((wrinkle, i) => (
                            <motion.g key={i}>
                              {/* Wrinkle line - fading out */}
                              <motion.path
                                d={wrinkle.path}
                                fill="none"
                                stroke="rgba(156, 163, 175, 0.8)"
                                strokeWidth="1.5"
                                strokeDasharray="3,2"
                                animate={{ 
                                  opacity: [0.8, 0.2, 0.8],
                                  strokeDashoffset: [0, -10]
                                }}
                                transition={{ 
                                  delay: wrinkle.delay, 
                                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                  strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
                                }}
                              />
                              {/* Smoothing effect */}
                              <motion.path
                                d={wrinkle.path}
                                fill="none"
                                stroke="rgba(251, 191, 36, 0.9)"
                                strokeWidth="2"
                                strokeDasharray="1,3"
                                animate={{ 
                                  strokeDashoffset: [0, -8],
                                  opacity: [0, 1, 0]
                                }}
                                transition={{ 
                                  delay: wrinkle.delay + 1, 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            </motion.g>
                          ))}
                          {/* Facial rejuvenation field */}
                          <motion.ellipse
                            cx="60"
                            cy="52"
                            rx="22"
                            ry="18"
                            fill="rgba(251, 191, 36, 0.1)"
                            stroke="rgba(251, 191, 36, 0.6)"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                            animate={{ 
                              strokeDashoffset: [0, -16],
                              scale: [1, 1.1, 1],
                              opacity: [0.3, 0.7, 0.3]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                              opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                        </motion.g>
                      )}
                      
                      {/* BENEFIT 3: Faster muscle recovery */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'muscle-recovery' && (
                        <motion.g key="muscle-recovery">
                          {/* Major muscle groups being restored */}
                          <motion.ellipse
                            cx="60"
                            cy="90"
                            rx="28"
                            ry="35"
                            fill="rgba(96, 165, 250, 0.15)"
                            stroke="rgba(96, 165, 250, 0.7)"
                            strokeWidth="2"
                            strokeDasharray="8,4"
                            animate={{ 
                              strokeDashoffset: [0, -24],
                              opacity: [0.6, 1, 0.6],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 2.5, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          {/* Muscle fiber repair zones */}
                          {[
                            { x: 48, y: 78, delay: 0.0 },
                            { x: 72, y: 82, delay: 0.2 },
                            { x: 50, y: 98, delay: 0.4 },
                            { x: 70, y: 105, delay: 0.6 },
                            { x: 60, y: 88, delay: 0.8 },
                            { x: 55, y: 110, delay: 1.0 }
                          ].map((fiber, i) => (
                            <motion.g key={i}>
                              {/* Muscle fiber restoration */}
                              <motion.circle
                                cx={fiber.x}
                                cy={fiber.y}
                                r="3"
                                fill="rgba(96, 165, 250, 0.8)"
                                stroke="rgba(96, 165, 250, 1)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [0.8, 1.5, 0.8],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                  delay: fiber.delay, 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              {/* Recovery wave */}
                              <motion.circle
                                cx={fiber.x}
                                cy={fiber.y}
                                r="6"
                                fill="none"
                                stroke="rgba(96, 165, 250, 0.4)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [1, 2.5],
                                  opacity: [0.6, 0]
                                }}
                                transition={{ 
                                  delay: fiber.delay + 0.3, 
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeOut"
                                }}
                              />
                            </motion.g>
                          ))}
                        </motion.g>
                      )}
                    </>
                  ) : (
                    <>
                      {/* BENEFIT 0: Enhanced athletic performance */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'athletic-performance' && (
                        <motion.g key="athletic-performance">
                          {/* Athletic optimization - full body enhancement */}
                          <motion.ellipse
                            cx="60"
                            cy="85"
                            rx="35"
                            ry="45"
                            fill="rgba(6, 182, 212, 0.1)"
                            stroke="rgba(6, 182, 212, 0.8)"
                            strokeWidth="2"
                            strokeDasharray="12,6"
                            animate={{ 
                              strokeDashoffset: [0, -36],
                              scale: [1, 1.08, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                              opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          {/* Performance enhancement zones */}
                          {[
                            { x: 60, y: 22, label: 'Mental Focus', delay: 0.0 },
                            { x: 48, y: 75, label: 'Endurance', delay: 0.3 },
                            { x: 72, y: 75, label: 'Strength', delay: 0.6 },
                            { x: 50, y: 110, label: 'Power', delay: 0.9 },
                            { x: 70, y: 110, label: 'Agility', delay: 1.2 }
                          ].map((zone, i) => (
                            <motion.g key={i}>
                              {/* Performance boost indicator */}
                              <motion.circle
                                cx={zone.x}
                                cy={zone.y}
                                r="5"
                                fill="rgba(6, 182, 212, 0.6)"
                                stroke="rgba(6, 182, 212, 1)"
                                strokeWidth="2"
                                animate={{ 
                                  scale: [1, 1.4, 1],
                                  opacity: [0.6, 1, 0.6]
                                }}
                                transition={{ 
                                  delay: zone.delay, 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              {/* Performance energy waves */}
                              <motion.circle
                                cx={zone.x}
                                cy={zone.y}
                                r="10"
                                fill="none"
                                stroke="rgba(6, 182, 212, 0.4)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [1, 2.2],
                                  opacity: [0.6, 0]
                                }}
                                transition={{ 
                                  delay: zone.delay + 0.4, 
                                  duration: 1.8,
                                  repeat: Infinity,
                                  ease: "easeOut"
                                }}
                              />
                            </motion.g>
                          ))}
                        </motion.g>
                      )}
                      
                      {/* BENEFIT 1: Accelerated muscle recovery */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'muscle-recovery' && (
                        <motion.g key="muscle-recovery">
                          {/* Major muscle groups being rapidly restored */}
                          <motion.ellipse
                            cx="60"
                            cy="85"
                            rx="32"
                            ry="38"
                            fill="rgba(16, 185, 129, 0.15)"
                            stroke="rgba(16, 185, 129, 0.7)"
                            strokeWidth="2"
                            strokeDasharray="10,5"
                            animate={{ 
                              strokeDashoffset: [0, -30],
                              scale: [1, 1.05, 1],
                              opacity: [0.6, 0.9, 0.6]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                              opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          {/* Accelerated recovery points */}
                          {[
                            { x: 45, y: 65, label: 'Arms', delay: 0.0 },
                            { x: 75, y: 65, label: 'Shoulders', delay: 0.2 },
                            { x: 48, y: 85, label: 'Core', delay: 0.4 },
                            { x: 72, y: 85, label: 'Back', delay: 0.6 },
                            { x: 50, y: 110, label: 'Legs', delay: 0.8 },
                            { x: 70, y: 110, label: 'Glutes', delay: 1.0 }
                          ].map((muscle, i) => (
                            <motion.g key={i}>
                              {/* Rapid recovery visualization */}
                              <motion.circle
                                cx={muscle.x}
                                cy={muscle.y}
                                r="4"
                                fill="rgba(16, 185, 129, 0.8)"
                                stroke="rgba(16, 185, 129, 1)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [0.8, 1.6, 0.8],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                  delay: muscle.delay, 
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              {/* Recovery acceleration wave */}
                              <motion.circle
                                cx={muscle.x}
                                cy={muscle.y}
                                r="8"
                                fill="none"
                                stroke="rgba(16, 185, 129, 0.5)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [1, 2.8],
                                  opacity: [0.7, 0]
                                }}
                                transition={{ 
                                  delay: muscle.delay + 0.2, 
                                  duration: 1.2,
                                  repeat: Infinity,
                                  ease: "easeOut"
                                }}
                              />
                            </motion.g>
                          ))}
                        </motion.g>
                      )}
                      
                      {/* BENEFIT 2: Natural skin rejuvenation */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'skin-rejuvenation' && (
                        <motion.g key="skin-rejuvenation">
                          {/* Skin revitalization field */}
                          <motion.path
                            d="M40 35 Q60 30 80 35 Q85 50 80 65 Q60 70 40 65 Q35 50 40 35 Z"
                            fill="rgba(139, 92, 246, 0.2)"
                            stroke="rgba(139, 92, 246, 0.8)"
                            strokeWidth="2"
                            strokeDasharray="8,4"
                            animate={{ 
                              strokeDashoffset: [0, -24],
                              opacity: [0.4, 0.9, 0.4],
                              scale: [1, 1.03, 1]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 2.5, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          {/* Skin cell regeneration */}
                          {[...Array(12)].map((_, i) => (
                            <motion.circle
                              key={i}
                              cx={45 + (i % 4) * 10}
                              cy={42 + Math.floor(i / 4) * 8}
                              r="2"
                              fill="rgba(139, 92, 246, 0.8)"
                              animate={{ 
                                scale: [0.5, 1.5, 0.5],
                                opacity: [0.3, 1, 0.3]
                              }}
                              transition={{ 
                                delay: i * 0.1, 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                          {/* Collagen stimulation waves */}
                          {[...Array(4)].map((_, i) => (
                            <motion.ellipse
                              key={i}
                              cx="60"
                              cy="50"
                              rx={18 + i * 6}
                              ry={12 + i * 4}
                              fill="none"
                              stroke="rgba(139, 92, 246, 0.3)"
                              strokeWidth="1"
                              animate={{ 
                                opacity: [0, 0.7, 0],
                                scale: [0.9, 1.3]
                              }}
                              transition={{ 
                                delay: i * 0.3, 
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </motion.g>
                      )}
                      
                      {/* BENEFIT 3: Mood elevation and stress relief */}
                      {getBenefitAnimationSystem(activeBenefitIndex, currentDeviceData.name) === 'mood-stress' && (
                        <motion.g key="mood-stress">
                          {/* Brain mood enhancement */}
                          <motion.circle
                            cx="60"
                            cy="22"
                            r="18"
                            fill="rgba(251, 191, 36, 0.15)"
                            stroke="rgba(251, 191, 36, 0.8)"
                            strokeWidth="2"
                            strokeDasharray="6,4"
                            animate={{ 
                              strokeDashoffset: [0, -20],
                              scale: [1, 1.12, 1],
                              opacity: [0.6, 1, 0.6]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                              opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          {/* Stress relief radiating from brain */}
                          {[...Array(8)].map((_, i) => (
                            <motion.circle
                              key={i}
                              cx={60 + Math.cos(i * Math.PI / 4) * 15}
                              cy={22 + Math.sin(i * Math.PI / 4) * 15}
                              r="2.5"
                              fill="rgba(251, 191, 36, 0.7)"
                              animate={{ 
                                scale: [0, 1.5, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{ 
                                delay: i * 0.15, 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                          {/* Nervous system calming */}
                          <motion.path
                            d="M60 40 Q55 50 60 65 Q65 80 60 95 Q55 110 60 125"
                            fill="none"
                            stroke="rgba(251, 191, 36, 0.9)"
                            strokeWidth="3"
                            strokeDasharray="6,3"
                            animate={{ 
                              strokeDashoffset: [0, -18],
                              opacity: [0.4, 1, 0.4]
                            }}
                            transition={{ 
                              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          {/* Endorphin release visualization */}
                          {[
                            { x: 50, y: 70, delay: 0.0 },
                            { x: 70, y: 80, delay: 0.4 },
                            { x: 55, y: 100, delay: 0.8 },
                            { x: 65, y: 115, delay: 1.2 }
                          ].map((endorphin, i) => (
                            <motion.g key={i}>
                              <motion.circle
                                cx={endorphin.x}
                                cy={endorphin.y}
                                r="3"
                                fill="rgba(251, 191, 36, 0.8)"
                                stroke="rgba(251, 191, 36, 1)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [1, 1.6, 1],
                                  opacity: [0.6, 1, 0.6]
                                }}
                                transition={{ 
                                  delay: endorphin.delay, 
                                  duration: 2.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              <motion.circle
                                cx={endorphin.x}
                                cy={endorphin.y}
                                r="8"
                                fill="none"
                                stroke="rgba(251, 191, 36, 0.4)"
                                strokeWidth="1"
                                animate={{ 
                                  scale: [1, 2.5],
                                  opacity: [0.5, 0]
                                }}
                                transition={{ 
                                  delay: endorphin.delay + 0.5, 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeOut"
                                }}
                              />
                            </motion.g>
                          ))}
                        </motion.g>
                      )}
                    </>
                  )}
                </svg>
              </div>
              
              {/* Medical Benefits List */}
              <div className="flex-1 w-full md:w-auto">
                <h5 className={`text-xs font-light tracking-[0.3em] uppercase mb-3 md:mb-4 opacity-80 text-center md:text-left transition-colors duration-1000 ${
                  currentDevice === 0 ? 'text-cyan-300' : 
                  currentDevice === 1 ? 'text-red-300' : 
                  'text-teal-300'
                }`}>
                  Medical Effects
                </h5>
                <div className="space-y-2 md:space-y-3">
                  {currentDeviceData.benefits.slice(0, 4).map((benefit, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-start gap-3 justify-center md:justify-start transition-all duration-500 ${
                        index === activeBenefitIndex ? 'scale-105' : 'scale-100'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 md:mt-2 transition-all duration-500 ${
                          index === activeBenefitIndex 
                            ? 'bg-white shadow-white shadow-lg' 
                            : 'bg-white/40'
                        }`}
                        animate={index === activeBenefitIndex ? {
                          scale: [1, 1.4, 1],
                          opacity: [0.8, 1, 0.8],
                          boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 20px rgba(255,255,255,0.8)', '0 0 0px rgba(255,255,255,0)']
                        } : {
                          scale: 1,
                          opacity: 0.4
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                      <span className={`text-xs font-light leading-relaxed text-center md:text-left transition-all duration-500 ${
                        index === activeBenefitIndex ? 'text-white' : 'text-white/50'
                      }`}>
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center - 3D Showcase */}
        <div className="flex-1 relative order-1 md:order-2 h-1/2 md:h-full">
          <div className="absolute inset-0">
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-white text-xs md:text-sm">Loading 3D Model...</p>
                </div>
              </div>
            }>
              <MedicalDevice3D
                modelUrl={currentDeviceData.modelPath}
                fallbackImage={currentDeviceData.fallbackImage}
                deviceName={currentDeviceData.name}
                category={currentDeviceData.model}
                rating={currentDeviceData.rating}
                scrollProgress={scrollProgress}
              />
            </Suspense>
          </div>
        </div>

        {/* Right Side - Interactive Specs with Connected Dots */}
        <div className="w-full md:w-64 flex flex-col justify-center px-4 md:px-8 py-8 md:py-20 order-3 bg-black/20 md:bg-transparent">
          <motion.div
            key={currentDevice}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h4 
              className={`text-sm font-light tracking-[0.4em] uppercase mb-8 md:mb-16 text-center md:text-left font-mono transition-colors duration-1000 ${
                currentDevice === 0 ? 'text-cyan-300' : 
                currentDevice === 1 ? 'text-red-300' : 
                'text-teal-300'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SPECS
            </motion.h4>
            
            <div className="relative">
              {/* Connecting Line - Hidden on mobile or adjusted */}
              <div className="hidden md:block absolute left-1 top-0 bottom-0 w-px bg-white/20"></div>
              
              {/* Animated Progress Line - Hidden on mobile or adjusted */}
              <motion.div 
                className="hidden md:block absolute left-1 top-0 w-px bg-white origin-top"
                style={{
                  height: `${Math.min((activeSpecIndex + 1) / currentDeviceData.specs.length * 100, 100)}%`
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              
              <div className="space-y-6 md:space-y-12 relative">
                {currentDeviceData.specs.map((spec, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-3 md:gap-4 relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Interactive Dot */}
                    <motion.div 
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full border-2 flex-shrink-0 mt-1 relative z-10 transition-all duration-500 ${
                        index <= activeSpecIndex 
                          ? 'bg-white border-white shadow-white shadow-lg' 
                          : 'bg-transparent border-white/40'
                      }`}
                      animate={{
                        scale: index === activeSpecIndex ? 1.3 : 1,
                        boxShadow: index === activeSpecIndex 
                          ? '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)' 
                          : '0 0 0px rgba(255, 255, 255, 0)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Pulsing effect for active dot */}
                      {index === activeSpecIndex && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-white"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.8, 0, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.div 
                        className={`text-xs md:text-sm font-light leading-relaxed mb-1 transition-all duration-500 ${
                          index <= activeSpecIndex ? (
                            currentDevice === 0 ? 'text-blue-200' : 
                            currentDevice === 1 ? 'text-orange-200' : 
                            'text-teal-200'
                          ) : 'text-white/40'
                        }`}
                        animate={{
                          opacity: index <= activeSpecIndex ? 1 : 0.4,
                          scale: index === activeSpecIndex ? 1.05 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {spec.name}
                      </motion.div>
                      <motion.div 
                        className={`text-xs font-light transition-all duration-500 ${
                          index <= activeSpecIndex ? 'text-white/80' : 'text-white/30'
                        }`}
                        animate={{
                          opacity: index <= activeSpecIndex ? 0.8 : 0.3
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {spec.value}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom - Enhanced Explore Button */}
      <div className="fixed bottom-20 md:bottom-32 left-1/2 transform -translate-x-1/2 z-50">
        <motion.button
          className={`relative px-8 md:px-12 py-3 md:py-4 text-xs font-light tracking-[0.3em] uppercase transition-all duration-1000 backdrop-blur-sm bg-black/10 font-mono overflow-hidden group ${
            currentDevice === 0 ? 'border border-cyan-400/60 text-cyan-200 hover:bg-cyan-400 hover:text-slate-900' : 
            currentDevice === 1 ? 'border border-red-400/60 text-red-200 hover:bg-red-400 hover:text-slate-900' : 
            'border border-teal-400/60 text-teal-200 hover:bg-teal-400 hover:text-slate-900'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated background on hover */}
          <motion.div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-colors duration-1000 ${
              currentDevice === 0 ? 'bg-cyan-400' : 
              currentDevice === 1 ? 'bg-red-400' : 
              'bg-teal-400'
            }`}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ originX: 0 }}
          />
          <span className="relative z-10">EXPLORE</span>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 md:px-12 py-4 md:py-8 bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
          
          {/* Left - Copyright - Hidden on mobile */}
          <div className="hidden md:block text-white/40 text-xs font-light">
            Copyright 2024
          </div>
          
          {/* Center - Device Navigation */}
          <div className="flex items-center gap-4 md:gap-8 mx-auto md:mx-0">
            <button 
              onClick={() => switchDevice(Math.max(0, currentDevice - 1))}
              className="text-white/60 hover:text-white transition-colors p-2"
              disabled={currentDevice === 0}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            <div className="flex gap-3 md:gap-6">
              {devices.map((device, index) => (
                <button
                  key={device.id}
                  onClick={() => switchDevice(index)}
                  className={`w-12 h-8 md:w-16 md:h-10 rounded overflow-hidden transition-all duration-300 ${
                    index === currentDevice 
                      ? 'ring-1 ring-white opacity-100' 
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img
                    src={device.fallbackImage}
                    alt={device.name}
                    className="w-full h-full object-cover filter brightness-150"
                  />
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => switchDevice(Math.min(devices.length - 1, currentDevice + 1))}
              className="text-white/60 hover:text-white transition-colors p-2"
              disabled={currentDevice === devices.length - 1}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
          
          {/* Right - Social Icons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Area for Interaction */}
      <div className="relative z-10 h-[300vh] md:h-[500vh]" />
    </div>
  );
} 