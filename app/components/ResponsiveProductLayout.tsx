'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic imports to prevent SSR issues
const MedicalDevice3D = dynamic(() => import('./MedicalDevice3D'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#2a3142] flex items-center justify-center">
    <div className="text-white text-lg">Loading 3D Model...</div>
  </div>
});

interface ProductSpec {
  name: string;
  value: string;
  trigger: number;
}

interface ProductData {
  id: string;
  name: string;
  model: string;
  description: string;
  rating: number;
  modelPath: string;
  fallbackImage: string;
  benefits: string[];
  specs: ProductSpec[];
  category: string;
}

interface ResponsiveProductLayoutProps {
  deviceData: ProductData;
  backgroundTheme: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    accentGradient: string;
  };
}

export default function ResponsiveProductLayout({ deviceData, backgroundTheme }: ResponsiveProductLayoutProps) {
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  useEffect(() => {
    const specInterval = setInterval(() => {
      setActiveSpecIndex((prev) => (prev + 1) % deviceData.specs.length);
    }, 3000);

    const benefitInterval = setInterval(() => {
      setActiveBenefitIndex((prev) => (prev + 1) % deviceData.benefits.length);
    }, 4000);

    return () => {
      clearInterval(specInterval);
      clearInterval(benefitInterval);
    };
  }, [deviceData.specs.length, deviceData.benefits.length]);

  if (!isClient) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return (
    <div className={`min-h-screen ${backgroundTheme.gradient}`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/4 left-1/4 w-96 h-96 ${backgroundTheme.accentGradient} rounded-full blur-3xl opacity-20`}
          animate={{ 
            x: [0, 120, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-1/3 right-1/4 w-80 h-80 ${backgroundTheme.accentGradient} rounded-full blur-3xl opacity-15`}
          animate={{ 
            x: [0, -100, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/" 
              className={`text-white text-lg sm:text-xl font-bold hover:${backgroundTheme.accent} transition-colors duration-300`}
            >
              ← Back to Home
            </Link>
            <div className="text-white text-base sm:text-lg font-semibold text-center">
              {deviceData.name}
            </div>
            <div className="w-20 sm:w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Model */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 3D Model - Responsive */}
            <div className="h-[400px] sm:h-[500px] lg:h-[600px] relative order-2 lg:order-1">
              <MedicalDevice3D
                modelUrl={deviceData.modelPath}
                fallbackImage={deviceData.fallbackImage}
                deviceName={deviceData.name}
                category={deviceData.category}
                rating={deviceData.rating}
                scrollProgress={scrollProgress}
              />
            </div>

            {/* Content - Responsive */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {deviceData.name}
                </h1>
                <p className={`text-xl sm:text-2xl ${backgroundTheme.secondary} font-medium`}>
                  {deviceData.model}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className="w-5 h-5 sm:w-6 sm:h-6" 
                        fill={i < Math.floor(deviceData.rating) ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white text-base sm:text-lg ml-2">{deviceData.rating}/5.0</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-300 leading-relaxed"
              >
                {deviceData.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 sm:mb-16"
          >
            Key Benefits
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {deviceData.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-4 sm:p-6 rounded-xl border transition-all duration-300 ${
                  index === activeBenefitIndex
                    ? `border-${backgroundTheme.accent} bg-${backgroundTheme.accent}/20 shadow-lg shadow-${backgroundTheme.accent}/20`
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <div className={`${backgroundTheme.accent} text-xl sm:text-2xl mb-3`}>✨</div>
                <p className="text-white text-base sm:text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 sm:mb-16"
          >
            Technical Specifications
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {deviceData.specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-4 sm:p-6 rounded-xl border transition-all duration-300 ${
                  index === activeSpecIndex
                    ? `border-${backgroundTheme.accent} bg-${backgroundTheme.accent}/20 shadow-lg shadow-${backgroundTheme.accent}/20`
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <h3 className={`${backgroundTheme.accent} font-semibold text-base sm:text-lg mb-2`}>{spec.name}</h3>
                <p className="text-white text-lg sm:text-xl font-medium">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Experience the Future of Wellness
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-8"
          >
            Discover how our {deviceData.name.toLowerCase()} can transform your wellness journey
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
          >
            <Link
              href="/"
              className={`inline-block bg-${backgroundTheme.primary} hover:bg-${backgroundTheme.primary}/80 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors duration-300 text-center`}
            >
              Explore All Devices
            </Link>
            <button className={`inline-block bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg border border-white/20 transition-all duration-300 text-center`}>
              Contact Sales
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
