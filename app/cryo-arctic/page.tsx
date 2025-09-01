'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic imports to prevent SSR issues
const MedicalDevice3D = dynamic(() => import('../components/MedicalDevice3D'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#2a3142] flex items-center justify-center">
    <div className="text-white text-lg">Loading 3D Model...</div>
  </div>
});

const deviceData = {
  id: 'cryotherapy',
  name: 'CRYO ARCTIC',
  model: 'PERFORMANCE™',
  description: 'CRYO Arctic Performance is a single person whole-body cryotherapy chamber designed to deliver the safest and most effective Cryo treatments. Built with state-of-the-art technology innovatively engineered to ensure that clients never come into direct contact with nitrogen vapors, only breathable air.',
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
};

export default function CryoArcticPage() {
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-white text-xl font-bold hover:text-cyan-400 transition-colors">
              ← Back to Home
            </Link>
            <div className="text-white text-lg font-semibold">
              {deviceData.name}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Model */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 3D Model */}
            <div className="h-[600px] relative">
              <MedicalDevice3D
                modelUrl={deviceData.modelPath}
                fallbackImage={deviceData.fallbackImage}
                deviceName={deviceData.name}
                category="Cryotherapy"
                rating={deviceData.rating}
                scrollProgress={scrollProgress}
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-5xl font-bold text-white leading-tight">
                  {deviceData.name}
                </h1>
                <p className="text-2xl text-cyan-300 font-medium">
                  {deviceData.model}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6" fill={i < Math.floor(deviceData.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white text-lg ml-2">{deviceData.rating}/5.0</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-gray-300 leading-relaxed"
              >
                {deviceData.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Key Benefits
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deviceData.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  index === activeBenefitIndex
                    ? 'border-cyan-400 bg-cyan-900/20 shadow-lg shadow-cyan-400/20'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <div className="text-cyan-400 text-2xl mb-3">❄️</div>
                <p className="text-white text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Technical Specifications
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {deviceData.specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  index === activeSpecIndex
                    ? 'border-green-400 bg-green-900/20 shadow-lg shadow-green-400/20'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <h3 className="text-green-400 font-semibold text-lg mb-2">{spec.name}</h3>
                <p className="text-white text-xl font-medium">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Experience Extreme Recovery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Discover the power of cryotherapy for ultimate performance and recovery
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-x-4"
          >
            <Link
              href="/"
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Explore All Devices
            </Link>
            <button className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg border border-white/20 transition-all duration-300">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 