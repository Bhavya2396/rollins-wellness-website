'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import to prevent SSR issues
const MedicalDevice3D = dynamic(() => import('../components/MedicalDevice3D'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#2a3142] rounded-xl" />
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
      { name: 'Pressure Rating', value: '200kPa/2bar (3 ATA)' },
      { name: 'Internal Volume', value: '1.0 ㎥' },
      { name: 'Dimensions', value: 'Ø 760mm x 2,200mm L x 850mm H' },
      { name: 'Weight', value: '270 kg (including controller)' },
      { name: 'Pressurization Time', value: '~15 minutes to 200kPa' },
      { name: 'Material', value: 'Galvanized Steel with powder coating' }
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
      { name: 'LED Wavelengths', value: '660nm (Red) + 850nm (NIR)' },
      { name: 'Total Power Output', value: '1000W medical-grade LEDs' },
      { name: 'Coverage Area', value: 'Full body 360° exposure' },
      { name: 'Treatment Time', value: '10-20 minutes per session' },
      { name: 'Control System', value: 'Digital touchscreen interface' },
      { name: 'Safety Features', value: 'Eye protection & timer controls' }
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
      { name: 'Temperature Range', value: 'Up to -140°C / -220°F' },
      { name: 'Treatment Duration', value: '2-3 minutes per session' },
      { name: 'Safety System', value: 'Breathable air only (no nitrogen contact)' },
      { name: 'Interior Features', value: 'Touch screen, sound system, adjustable window' },
      { name: 'Smart Technology', value: 'Wi-Fi connectivity for remote assistance' },
      { name: 'Safety Monitoring', value: 'Built-in oxygen & temperature sensors' }
    ]
  }
];

export default function MobilePage() {
  const [currentDevice, setCurrentDevice] = useState(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showBenefits, setShowBenefits] = useState(true);
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentDeviceData = devices[currentDevice];

  // Device-specific color themes matching desktop
  const getDeviceTheme = (deviceId: string) => {
    switch (deviceId) {
      case 'hyperbaric':
        return {
          primary: 'text-cyan-200',
          secondary: 'text-blue-300/90',
          accent: 'text-cyan-300',
          specActive: 'text-blue-200',
          glow: '0 0 40px rgba(34, 211, 238, 0.3)',
          border: 'border-cyan-400/60',
          bg: 'bg-cyan-400/10',
          bgGradient: 'bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900',
          overlay: 'bg-gradient-to-t from-slate-900/95 via-blue-900/20 to-slate-900/60',
          orb1: 'bg-gradient-to-r from-blue-500/25 to-cyan-500/20',
          orb2: 'bg-gradient-to-r from-indigo-500/20 to-blue-600/15'
        };
      case 'collagen':
        return {
          primary: 'text-red-200',
          secondary: 'text-orange-300/90',
          accent: 'text-red-300',
          specActive: 'text-orange-200',
          glow: '0 0 40px rgba(248, 113, 113, 0.3)',
          border: 'border-red-400/60',
          bg: 'bg-red-400/10',
          bgGradient: 'bg-gradient-to-br from-slate-900 via-red-900/25 to-slate-900',
          overlay: 'bg-gradient-to-t from-slate-900/95 via-red-900/15 to-slate-900/60',
          orb1: 'bg-gradient-to-r from-red-500/20 to-orange-500/15',
          orb2: 'bg-gradient-to-r from-amber-500/18 to-red-500/12'
        };
      case 'cryotherapy':
        return {
          primary: 'text-cyan-100',
          secondary: 'text-teal-300/90',
          accent: 'text-teal-300',
          specActive: 'text-teal-200',
          glow: '0 0 40px rgba(34, 211, 238, 0.2)',
          border: 'border-teal-400/60',
          bg: 'bg-teal-400/10',
          bgGradient: 'bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900',
          overlay: 'bg-gradient-to-t from-slate-900/95 via-cyan-900/15 to-slate-900/65',
          orb1: 'bg-gradient-to-r from-cyan-400/25 to-blue-400/20',
          orb2: 'bg-gradient-to-r from-teal-500/22 to-cyan-500/18'
        };
      default:
        return {
          primary: 'text-white',
          secondary: 'text-gray-300',
          accent: 'text-blue-300',
          specActive: 'text-blue-200',
          glow: '0 0 40px rgba(59, 130, 246, 0.3)',
          border: 'border-blue-500/30',
          bg: 'bg-blue-500/10',
          bgGradient: 'bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900',
          overlay: 'bg-gradient-to-t from-slate-900/95 via-blue-900/20 to-slate-900/60',
          orb1: 'bg-gradient-to-r from-blue-500/25 to-cyan-500/20',
          orb2: 'bg-gradient-to-r from-indigo-500/20 to-blue-600/15'
        };
    }
  };

  const theme = getDeviceTheme(currentDeviceData.id);

  // Auto-cycle benefits
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBenefitIndex((prev) => 
        (prev + 1) % Math.min(currentDeviceData.benefits.length, 4)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [currentDeviceData.benefits.length]);

  // Auto-cycle specs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpecIndex((prev) => 
        (prev + 1) % currentDeviceData.specs.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [currentDeviceData.specs.length]);

  // Handle device changes
  const handleDeviceChange = (index: number) => {
    setCurrentDevice(index);
    setActiveBenefitIndex(0);
    setActiveSpecIndex(0);
  };

  return (
    <div ref={containerRef} className="min-h-screen text-white overflow-x-hidden relative">
      {/* Animated Background matching desktop */}
      <motion.div 
        className="fixed inset-0"
        key={`bg-${currentDevice}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={`absolute inset-0 ${theme.bgGradient}`} />
        <div className={`absolute inset-0 ${theme.overlay}`} />
        
        {/* Floating orbs */}
        <motion.div 
          className={`absolute top-1/4 left-1/4 w-80 h-80 ${theme.orb1} rounded-full blur-3xl`}
          animate={{ 
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-1/3 right-1/4 w-64 h-64 ${theme.orb2} rounded-full blur-3xl`}
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '40px 40px'
               }}
          />
        </div>
      </motion.div>

      {/* Mobile Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-transparent backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="px-4 py-4 flex justify-center items-center">
          <motion.div
            className={`text-sm font-light tracking-[0.4em] uppercase font-mono transition-colors duration-1000 ${theme.primary}`}
            style={{ textShadow: theme.glow }}
          >
            ROLLINS WELLNESS
          </motion.div>
        </div>
      </motion.header>



      {/* Main Content */}
      <div className="pt-16 pb-40 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDevice}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            {/* Device Title Section */}
            <div className="text-center mb-4 relative z-10 mt-8">
              <motion.h1 
                className={`text-3xl font-medium leading-[0.9] mb-2 tracking-[-0.02em] uppercase font-mono transition-colors duration-1000 text-white`}
                style={{ 
                  textShadow: `${theme.glow}, 0 2px 4px rgba(0,0,0,0.8)`,
                  fontFeatureSettings: '"ss01" 1, "kern" 1' 
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {currentDeviceData.name}
              </motion.h1>
              <motion.p 
                className={`text-lg font-normal leading-tight tracking-[0.1em] uppercase transition-colors duration-1000 ${theme.secondary}`}
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {currentDeviceData.model}
              </motion.p>
            </div>

            {/* 3D Model Container - Optimized Size & Transparent */}
            <div className="relative h-80 rounded-xl mb-4 overflow-hidden">
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`animate-spin rounded-full h-12 w-12 border-2 border-transparent ${theme.border} border-t-current`}></div>
                    <p className="text-white/60 text-sm mt-4 font-light">Loading 3D Model...</p>
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

            {/* Human Body Effects Visualization - Mobile Optimized */}
            <div className="flex items-center justify-center mb-4 bg-black/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-4">
                {/* Human Body SVG - Mobile Optimized */}
                <svg width="60" height="120" viewBox="0 0 120 200" className="flex-shrink-0">
                  {/* Body silhouette */}
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
                    strokeWidth="1"
                  />
                  
                  {/* Device-specific animations */}
                  {currentDeviceData.id === 'hyperbaric' && (
                    <>
                      {activeBenefitIndex === 0 && (
                        // Brain function animation
                        <motion.g key="brain-function">
                          <motion.circle
                            cx="60" cy="22" r="14"
                            fill="rgba(59, 130, 246, 0.2)"
                            stroke="rgba(59, 130, 246, 0.8)"
                            strokeWidth="2"
                            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                          {[...Array(6)].map((_, i) => (
                            <motion.circle
                              key={i}
                              cx={60 + Math.cos(i * Math.PI / 3) * 10}
                              cy={22 + Math.sin(i * Math.PI / 3) * 10}
                              r="1.5"
                              fill="rgba(251, 191, 36, 0.8)"
                              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                              transition={{ delay: i * 0.2, duration: 1.6, repeat: Infinity }}
                            />
                          ))}
                        </motion.g>
                      )}
                      {activeBenefitIndex === 1 && (
                        // Tissue oxygenation
                        <motion.g key="tissue-oxygenation">
                          <motion.rect
                            x="45" y="65" width="30" height="60" rx="15"
                            fill="rgba(16, 185, 129, 0.1)"
                            stroke="rgba(16, 185, 129, 0.6)"
                            strokeWidth="2"
                            strokeDasharray="4,2"
                            animate={{ strokeDashoffset: [0, -12], opacity: [0.4, 0.9, 0.4] }}
                            transition={{ strokeDashoffset: { duration: 2, repeat: Infinity }, opacity: { duration: 3, repeat: Infinity } }}
                          />
                          {[...Array(8)].map((_, i) => (
                            <motion.circle
                              key={i}
                              cx={50 + (i % 2) * 20}
                              cy={75 + Math.floor(i / 2) * 15}
                              r="1.5"
                              fill="rgba(16, 185, 129, 0.9)"
                              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
                              transition={{ delay: i * 0.15, duration: 2, repeat: Infinity }}
                            />
                          ))}
                        </motion.g>
                      )}
                      {activeBenefitIndex === 2 && (
                        // Inflammation reduction
                        <motion.g key="inflammation-reduction">
                          <motion.ellipse
                            cx="60" cy="85" rx="25" ry="35"
                            fill="rgba(59, 130, 246, 0.1)"
                            stroke="rgba(59, 130, 246, 0.7)"
                            strokeWidth="2"
                            strokeDasharray="6,3"
                            animate={{ strokeDashoffset: [0, -18], scale: [1.1, 1, 1.1], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ strokeDashoffset: { duration: 3, repeat: Infinity }, scale: { duration: 4, repeat: Infinity }, opacity: { duration: 2.5, repeat: Infinity } }}
                          />
                        </motion.g>
                      )}
                      {activeBenefitIndex === 3 && (
                        // Wound healing
                        <motion.g key="wound-healing">
                          {[{ x: 48, y: 80 }, { x: 72, y: 95 }].map((wound, i) => (
                            <motion.circle
                              key={i}
                              cx={wound.x} cy={wound.y} r="4"
                              fill="rgba(139, 92, 246, 0.2)"
                              stroke="rgba(139, 92, 246, 0.9)"
                              strokeWidth="2"
                              animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.5, 1, 0.5] }}
                              transition={{ delay: i * 0.4, duration: 3, repeat: Infinity }}
                            />
                          ))}
                        </motion.g>
                      )}
                    </>
                  )}
                  
                  {currentDeviceData.id === 'collagen' && (
                    <>
                      {activeBenefitIndex === 0 && (
                        // Collagen production
                        <motion.g key="collagen-production">
                          <motion.path
                            d="M40 40 Q60 35 80 40 Q85 55 80 70 Q60 75 40 70 Q35 55 40 40 Z"
                            fill="rgba(248, 113, 113, 0.2)"
                            stroke="rgba(248, 113, 113, 0.8)"
                            strokeWidth="2"
                            strokeDasharray="4,2"
                            animate={{ strokeDashoffset: [0, -12], opacity: [0.4, 0.9, 0.4] }}
                            transition={{ strokeDashoffset: { duration: 2, repeat: Infinity }, opacity: { duration: 3, repeat: Infinity } }}
                          />
                          {[...Array(6)].map((_, i) => (
                            <motion.circle
                              key={i}
                              cx={45 + (i % 3) * 15}
                              cy={50 + Math.floor(i / 3) * 10}
                              r="1"
                              fill="rgba(248, 113, 113, 0.8)"
                              animate={{ scale: [0.5, 1.5, 0.5], opacity: [0.3, 1, 0.3] }}
                              transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
                            />
                          ))}
                        </motion.g>
                      )}
                      {activeBenefitIndex === 1 && (
                        // Skin texture improvement
                        <motion.g key="skin-texture">
                          <motion.path
                            d="M42 38 Q60 33 78 38 Q82 52 78 66 Q60 71 42 66 Q38 52 42 38 Z"
                            fill="rgba(251, 146, 60, 0.2)"
                            stroke="rgba(251, 146, 60, 0.8)"
                            strokeWidth="2"
                            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                        </motion.g>
                      )}
                      {activeBenefitIndex === 2 && (
                        // Anti-aging
                        <motion.g key="anti-aging">
                          {[{ path: "M45 45 Q55 42 65 45" }, { path: "M48 55 Q58 52 68 55" }].map((wrinkle, i) => (
                            <motion.path
                              key={i}
                              d={wrinkle.path}
                              fill="none"
                              stroke="rgba(156, 163, 175, 0.8)"
                              strokeWidth="1"
                              strokeDasharray="2,1"
                              animate={{ opacity: [0.8, 0.2, 0.8], strokeDashoffset: [0, -6] }}
                              transition={{ delay: i * 0.3, opacity: { duration: 3, repeat: Infinity }, strokeDashoffset: { duration: 2, repeat: Infinity } }}
                            />
                          ))}
                        </motion.g>
                      )}
                      {activeBenefitIndex === 3 && (
                        // Muscle recovery
                        <motion.g key="muscle-recovery">
                          <motion.ellipse
                            cx="60" cy="90" rx="25" ry="30"
                            fill="rgba(96, 165, 250, 0.15)"
                            stroke="rgba(96, 165, 250, 0.7)"
                            strokeWidth="2"
                            strokeDasharray="6,3"
                            animate={{ strokeDashoffset: [0, -18], opacity: [0.6, 1, 0.6] }}
                            transition={{ strokeDashoffset: { duration: 2.5, repeat: Infinity }, opacity: { duration: 3, repeat: Infinity } }}
                          />
                        </motion.g>
                      )}
                    </>
                  )}
                  
                  {currentDeviceData.id === 'cryotherapy' && (
                    <>
                      {activeBenefitIndex === 0 && (
                        // Athletic performance
                        <motion.g key="athletic-performance">
                          <motion.ellipse
                            cx="60" cy="85" rx="30" ry="40"
                            fill="rgba(6, 182, 212, 0.1)"
                            stroke="rgba(6, 182, 212, 0.8)"
                            strokeWidth="2"
                            strokeDasharray="8,4"
                            animate={{ strokeDashoffset: [0, -24], scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ strokeDashoffset: { duration: 3, repeat: Infinity }, scale: { duration: 4, repeat: Infinity }, opacity: { duration: 2.5, repeat: Infinity } }}
                          />
                        </motion.g>
                      )}
                      {activeBenefitIndex === 1 && (
                        // Muscle recovery
                        <motion.g key="muscle-recovery-cryo">
                          <motion.ellipse
                            cx="60" cy="85" rx="28" ry="35"
                            fill="rgba(16, 185, 129, 0.15)"
                            stroke="rgba(16, 185, 129, 0.7)"
                            strokeWidth="2"
                            strokeDasharray="6,3"
                            animate={{ strokeDashoffset: [0, -18], scale: [1, 1.05, 1] }}
                            transition={{ strokeDashoffset: { duration: 2, repeat: Infinity }, scale: { duration: 3, repeat: Infinity } }}
                          />
                        </motion.g>
                      )}
                      {activeBenefitIndex === 2 && (
                        // Skin rejuvenation
                        <motion.g key="skin-rejuvenation">
                          <motion.path
                            d="M40 35 Q60 30 80 35 Q85 50 80 65 Q60 70 40 65 Q35 50 40 35 Z"
                            fill="rgba(139, 92, 246, 0.2)"
                            stroke="rgba(139, 92, 246, 0.8)"
                            strokeWidth="2"
                            strokeDasharray="6,3"
                            animate={{ strokeDashoffset: [0, -18], opacity: [0.4, 0.9, 0.4] }}
                            transition={{ strokeDashoffset: { duration: 2.5, repeat: Infinity }, opacity: { duration: 3, repeat: Infinity } }}
                          />
                        </motion.g>
                      )}
                      {activeBenefitIndex === 3 && (
                        // Mood elevation
                        <motion.g key="mood-stress">
                          <motion.circle
                            cx="60" cy="22" r="16"
                            fill="rgba(251, 191, 36, 0.15)"
                            stroke="rgba(251, 191, 36, 0.8)"
                            strokeWidth="2"
                            strokeDasharray="4,2"
                            animate={{ strokeDashoffset: [0, -12], scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ strokeDashoffset: { duration: 3, repeat: Infinity }, scale: { duration: 4, repeat: Infinity }, opacity: { duration: 2.5, repeat: Infinity } }}
                          />
                        </motion.g>
                      )}
                    </>
                  )}
                </svg>
                
                {/* Current benefit indicator */}
                <div className="flex-1">
                  <div className={`text-xs font-light tracking-[0.3em] uppercase ${theme.accent} mb-1 transition-colors duration-1000 font-mono`}>
                    Medical Effects
                  </div>
                  <div className={`text-sm font-light ${theme.primary} transition-colors duration-1000`}>
                    {currentDeviceData.benefits[activeBenefitIndex]}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-white/75 text-sm font-light leading-relaxed">
                Rollins has mechanically advanced, powerful and captivating medical devices that deliver {currentDeviceData.description.toLowerCase().slice(0, 120)}...
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex mb-4 bg-black/20 rounded-xl p-1 backdrop-blur-sm border border-white/10">
              <button
                onClick={() => { setShowBenefits(true); setShowSpecs(false); }}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-light tracking-[0.2em] uppercase transition-all duration-300 ${
                  showBenefits 
                    ? `${theme.bg} ${theme.accent}` 
                    : 'text-white/60'
                }`}
              >
                Medical Effects
              </button>
              <button
                onClick={() => { setShowSpecs(true); setShowBenefits(false); }}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-light tracking-[0.2em] uppercase transition-all duration-300 ${
                  showSpecs 
                    ? `${theme.bg} ${theme.accent}` 
                    : 'text-white/60'
                }`}
              >
                Specifications
              </button>
            </div>

            {/* Benefits/Specs Content */}
            <AnimatePresence mode="wait">
              {showBenefits && (
                <motion.div
                  key="benefits"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {currentDeviceData.benefits.slice(0, 4).map((benefit, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl transition-all duration-500 backdrop-blur-sm ${
                        index === activeBenefitIndex 
                          ? `${theme.bg} ${theme.border} border`
                          : 'bg-black/20 border border-white/10'
                      }`}
                      animate={{
                        scale: index === activeBenefitIndex ? 1.02 : 1
                      }}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 transition-colors duration-500 ${
                          index === activeBenefitIndex ? theme.accent.replace('text-', 'bg-') : 'bg-white/40'
                        }`} />
                        <span className={`text-sm font-light transition-colors duration-500 ${
                          index === activeBenefitIndex ? theme.primary : 'text-white/60'
                        }`}>
                          {benefit}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {showSpecs && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {currentDeviceData.specs.map((spec, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl transition-all duration-500 backdrop-blur-sm ${
                        index === activeSpecIndex 
                          ? `${theme.bg} ${theme.border} border`
                          : 'bg-black/20 border border-white/10'
                      }`}
                      animate={{
                        scale: index === activeSpecIndex ? 1.02 : 1
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-sm font-light transition-colors duration-500 ${
                          index === activeSpecIndex ? theme.accent : 'text-white/70'
                        }`}>
                          {spec.name}
                        </span>
                        <span className={`text-sm text-right ml-2 font-light transition-colors duration-500 ${
                          index === activeSpecIndex ? theme.primary : 'text-white/60'
                        }`}>
                          {spec.value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Button */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className={`relative px-8 py-3 text-xs font-light tracking-[0.3em] uppercase transition-all duration-1000 backdrop-blur-sm bg-black/10 font-mono overflow-hidden group ${theme.border} border ${theme.primary}`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme.accent.replace('text-', 'bg-')}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ originX: 0 }}
                />
                <span className="relative z-10">EXPLORE {currentDeviceData.name.split(' ')[0]}</span>
              </motion.button>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Bottom Navigation with Device Selection */}
      <motion.div 
        className="fixed bottom-4 left-4 right-4 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10 space-y-3">
          
          {/* Device Selection Pills */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {devices.map((device, index) => (
              <motion.button
                key={device.id}
                onClick={() => handleDeviceChange(index)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-light tracking-[0.2em] uppercase transition-all duration-500 ${
                  index === currentDevice 
                    ? `${theme.bg} ${theme.accent} ${theme.border} border`
                    : 'bg-black/20 text-white/60 border border-white/20'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {device.name.split(' ')[0]}
              </motion.button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleDeviceChange((currentDevice - 1 + devices.length) % devices.length)}
              className={`p-2 rounded-xl ${theme.bg} ${theme.accent} transition-colors duration-300`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Current Device Name */}
            <div className="flex-1 text-center mx-4">
              <motion.p 
                key={currentDevice}
                className={`text-sm font-light tracking-[0.2em] uppercase ${theme.primary} transition-colors duration-1000`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {devices[currentDevice].name}
              </motion.p>
            </div>
            
            <button
              onClick={() => handleDeviceChange((currentDevice + 1) % devices.length)}
              className={`p-2 rounded-xl ${theme.bg} ${theme.accent} transition-colors duration-300`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2">
            {devices.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDeviceChange(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentDevice 
                    ? theme.accent.replace('text-', 'bg-')
                    : 'bg-white/40'
                }`}
              />
            ))}
          </div>
          
        </div>
      </motion.div>
    </div>
  );
} 