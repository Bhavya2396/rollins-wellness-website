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

  // Device switching with scroll reset
  const switchDevice = (index: number) => {
    if (index !== currentDevice) {
      setCurrentDevice(index);
      setActiveSpecIndex(0);
      setScrollProgress(0);
      // Reset scroll position to top for new device
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentDeviceData = devices[currentDevice];

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
            <h1 className="text-2xl font-light text-white mb-4 tracking-[0.3em] uppercase">ROLLINS</h1>
            <p className="text-white/60 text-sm tracking-wide">Wellness Technology</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative bg-[#2a3142] overflow-hidden">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex justify-between items-center px-4 md:px-12 py-4 md:py-8">
          {/* Left - Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-white text-xs md:text-sm font-light tracking-[0.3em] uppercase">ROLLINS</h1>
          </motion.div>
          
          {/* Right - Navigation - Hidden on mobile */}
          <motion.div 
            className="hidden md:flex gap-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a href="#" className="text-white/60 hover:text-white text-xs font-light tracking-[0.2em] uppercase transition-colors">Gallery</a>
            <a href="#" className="text-white/60 hover:text-white text-xs font-light tracking-[0.2em] uppercase transition-colors">About</a>
            <a href="#" className="text-white/60 hover:text-white text-xs font-light tracking-[0.2em] uppercase transition-colors">Contact</a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-white p-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </motion.button>
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
            {/* Product Name - McLaren Style */}
            <div className="mb-8 md:mb-16 text-center md:text-left">
              <h2 className="text-white text-2xl md:text-5xl font-extralight leading-none mb-1 tracking-wide uppercase">
                {currentDeviceData.name}
              </h2>
              <h3 className="text-white text-2xl md:text-5xl font-extralight leading-none tracking-wide uppercase">
                {currentDeviceData.model}
              </h3>
            </div>
            
            {/* Description - McLaren Style */}
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-12 md:mb-20 font-light max-w-sm text-center md:text-left">
              {currentDeviceData.description}
            </p>
            
            {/* Human Body Effects - Medical Style */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <div className="relative flex-shrink-0">
                {/* Human Body SVG - Smaller on mobile */}
                <svg 
                  width="80" 
                  height="140" 
                  viewBox="0 0 120 200" 
                  className="md:w-[120px] md:h-[200px] filter drop-shadow-lg"
                >
                  {/* Body Silhouette */}
                  <path
                    d="M60 10 C65 10 70 15 70 22 C70 30 65 35 60 38 C55 35 50 30 50 22 C50 15 55 10 60 10 Z
                       M60 38 C65 38 68 40 68 45 L68 55 C68 60 65 62 60 62 C55 62 52 60 52 55 L52 45 C52 40 55 38 60 38 Z
                       M60 62 C70 62 75 65 75 75 L75 120 C75 130 70 135 60 135 C50 135 45 130 45 120 L45 75 C45 65 50 62 60 62 Z
                       M60 135 L58 160 L55 190 L50 195 L45 190 L48 160 L52 135
                       M60 135 L62 160 L65 190 L70 195 L75 190 L72 160 L68 135
                       M52 70 L35 75 L30 85 L35 95 L45 90 L52 85
                       M68 70 L85 75 L90 85 L85 95 L75 90 L68 85"
                    fill="rgba(255, 255, 255, 0.1)"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="1"
                  />
                  
                  {/* Effect Areas Based on Device */}
                  {currentDeviceData.name.includes('HYPERBARIC') ? (
                    <>
                      {/* Brain/Head Area */}
                      <motion.circle
                        cx="60"
                        cy="22"
                        r="12"
                        fill="rgba(59, 130, 246, 0.3)"
                        stroke="rgba(59, 130, 246, 0.8)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      />
                      
                      {/* Circulatory System */}
                      <motion.circle
                        cx="60"
                        cy="50"
                        r="8"
                        fill="rgba(239, 68, 68, 0.3)"
                        stroke="rgba(239, 68, 68, 0.8)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      />
                      
                      {/* Whole Body Oxygenation */}
                      <motion.rect
                        x="45"
                        y="62"
                        width="30"
                        height="70"
                        rx="15"
                        fill="rgba(16, 185, 129, 0.2)"
                        stroke="rgba(16, 185, 129, 0.6)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      />
                      
                      {/* Wound Healing Areas */}
                      <motion.circle
                        cx="45"
                        cy="85"
                        r="4"
                        fill="rgba(139, 92, 246, 0.4)"
                        stroke="rgba(139, 92, 246, 1)"
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                      <motion.circle
                        cx="75"
                        cy="95"
                        r="4"
                        fill="rgba(139, 92, 246, 0.4)"
                        stroke="rgba(139, 92, 246, 1)"
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                      />
                    </>
                  ) : currentDeviceData.name.includes('UBODY') ? (
                    <>
                      {/* Skin/Surface Areas for Red Light Therapy */}
                      <motion.path
                        d="M45 40 Q60 35 75 40 Q80 50 75 60 Q60 65 45 60 Q40 50 45 40 Z"
                        fill="rgba(248, 113, 113, 0.3)"
                        stroke="rgba(248, 113, 113, 0.8)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      />
                      
                      {/* Muscle Areas */}
                      <motion.ellipse
                        cx="60"
                        cy="90"
                        rx="25"
                        ry="35"
                        fill="rgba(96, 165, 250, 0.2)"
                        stroke="rgba(96, 165, 250, 0.6)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      />
                      
                      {/* Cellular/ATP Areas */}
                      <motion.circle
                        cx="50"
                        cy="75"
                        r="3"
                        fill="rgba(251, 191, 36, 0.6)"
                        stroke="rgba(251, 191, 36, 1)"
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      />
                      <motion.circle
                        cx="70"
                        cy="80"
                        r="3"
                        fill="rgba(251, 191, 36, 0.6)"
                        stroke="rgba(251, 191, 36, 1)"
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      />
                      <motion.circle
                        cx="60"
                        cy="105"
                        r="3"
                        fill="rgba(251, 191, 36, 0.6)"
                        stroke="rgba(251, 191, 36, 1)"
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                      
                      {/* Joint/Recovery Areas */}
                      <motion.circle
                        cx="52"
                        cy="85"
                        r="6"
                        fill="rgba(167, 139, 250, 0.3)"
                        stroke="rgba(167, 139, 250, 0.8)"
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                      />
                      <motion.circle
                        cx="68"
                        cy="85"
                        r="6"
                        fill="rgba(167, 139, 250, 0.3)"
                        stroke="rgba(167, 139, 250, 0.8)"
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                      />
                    </>
                  ) : (
                    <>
                      {/* Cryotherapy Effects */}
                      {/* Circulatory System Enhancement */}
                      <motion.path
                        d="M55 25 Q60 20 65 25 Q70 35 65 45 Q60 50 55 45 Q50 35 55 25 Z"
                        fill="rgba(6, 182, 212, 0.3)"
                        stroke="rgba(6, 182, 212, 0.8)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      />
                      
                      {/* Inflammation Reduction Areas */}
                      <motion.ellipse
                        cx="60"
                        cy="75"
                        rx="28"
                        ry="25"
                        fill="rgba(16, 185, 129, 0.2)"
                        stroke="rgba(16, 185, 129, 0.6)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      />
                      
                      {/* Nervous System Response */}
                      <motion.path
                        d="M60 15 L58 30 L62 30 L60 15 M60 30 L55 45 L60 60 L65 45 L60 30"
                        fill="none"
                        stroke="rgba(139, 92, 246, 0.8)"
                        strokeWidth="3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1.2 }}
                      />
                      
                      {/* Muscle Recovery Points */}
                      <motion.circle
                        cx="45"
                        cy="90"
                        r="5"
                        fill="rgba(251, 191, 36, 0.4)"
                        stroke="rgba(251, 191, 36, 0.8)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                      <motion.circle
                        cx="75"
                        cy="90"
                        r="5"
                        fill="rgba(251, 191, 36, 0.4)"
                        stroke="rgba(251, 191, 36, 0.8)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                      />
                      <motion.circle
                        cx="60"
                        cy="110"
                        r="5"
                        fill="rgba(251, 191, 36, 0.4)"
                        stroke="rgba(251, 191, 36, 0.8)"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                      />
                    </>
                  )}
                </svg>
              </div>
              
              {/* Medical Benefits List */}
              <div className="flex-1 w-full md:w-auto">
                <h5 className="text-white text-xs font-light tracking-[0.3em] uppercase mb-3 md:mb-4 opacity-80 text-center md:text-left">
                  Medical Effects
                </h5>
                <div className="space-y-2 md:space-y-3">
                  {currentDeviceData.benefits.slice(0, 4).map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 justify-center md:justify-start"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-white/60 flex-shrink-0 mt-1.5 md:mt-2"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                      <span className="text-white/70 text-xs font-light leading-relaxed text-center md:text-left">
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
            <h4 className="text-white text-sm font-light tracking-[0.4em] uppercase mb-8 md:mb-16 text-center md:text-left">
              Specs
            </h4>
            
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
                          index <= activeSpecIndex ? 'text-white' : 'text-white/40'
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

      {/* Bottom - Explore Button */}
      <div className="fixed bottom-20 md:bottom-32 left-1/2 transform -translate-x-1/2 z-50">
        <motion.button
          className="border border-white/30 text-white px-6 md:px-8 py-2 md:py-3 text-xs font-light tracking-[0.3em] uppercase hover:bg-white hover:text-[#2a3142] transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
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