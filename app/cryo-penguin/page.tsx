'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MedicalDevice3D = dynamic(() => import('../components/MedicalDevice3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#2a3142] flex items-center justify-center">
      <div className="text-white text-lg">Loading 3D Model...</div>
    </div>
  )
});

const deviceData = {
  id: 'cryo-penguin',
  name: 'CRYO PENGUIN',
  model: 'LOCALIZED CRYOTHERAPY',
  description:
    'The CRYO Penguin is designed to deliver the safest and most effective localized cryotherapy treatments in the industry. With its ergonomic design, pre-programmed protocols and built-in safety features, the device exceeds the highest standards. With pinpoint accuracy and power to handle everything from body appearance to relaxation after sport activity, the °CRYO Penguin™ is the most flexible cryotherapy machine on the market.',
  rating: 4.8,
  modelPath: '/models/Cryo-Penguin.glb',
  fallbackImage: '/images/device-placeholder.svg',
  benefits: [
    'Smart touch screen interface',
    'Ergonomic handle nozzle with quick access buttons',
    'Sensors that automatically measure skin temperature ensuring safety',
    'Indication signaling between nozzle and skin for ease of use',
    'Precise targeting of treatment area',
    'Mobile nitrogen vessel',
    'Auxiliary arm with hood supporting cryogenic hose for comfort'
  ],
  specs: [
    { name: 'Power Supply', value: 'Universal 110 / 230 V, 50/60 Hz' },
    { name: 'Cooling Medium', value: 'Liquid Nitrogen' },
    { name: 'Vessel Capacity', value: '50 Liter' },
    { name: 'Temperature', value: '-160°C vapors' }
  ]
};

export default function CryoPenguinPage() {
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const specInterval = setInterval(() => {
      setActiveSpecIndex((prev) => (prev + 1) % deviceData.specs.length);
    }, 3000);
    const benefitInterval = setInterval(() => {
      setActiveBenefitIndex((prev) => (prev + 1) % deviceData.benefits.length);
    }, 3500);
    return () => {
      clearInterval(specInterval);
      clearInterval(benefitInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900/25 to-slate-900">
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

      {/* Layout */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-start">
          {/* Left - Description & Benefits */}
          <div className="space-y-8 lg:col-span-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              {deviceData.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-base md:text-lg text-gray-300 leading-relaxed"
            >
              {deviceData.description}
            </motion.p>

            <div className="space-y-4">
              <h2 className="text-white/80 tracking-widest text-xs uppercase">Medical Effects</h2>
              <div className="grid grid-cols-1 gap-4">
                {deviceData.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      index === activeBenefitIndex
                        ? 'border-cyan-400/60 bg-cyan-900/20 shadow-lg shadow-cyan-500/10'
                        : 'border-white/15 bg-white/5'
                    }`}
                  >
                    <span className="text-cyan-300 mt-1">❄️</span>
                    <span className="text-white/90 text-sm md:text-base">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - 3D Model */}
          <div className="h-[520px] md:h-[640px] lg:col-span-1">
            <div className="h-full w-full rounded-xl overflow-hidden border border-white/10 bg-black/20">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white">Loading 3D...</div>}>
                <MedicalDevice3D
                  modelUrl={deviceData.modelPath}
                  fallbackImage={deviceData.fallbackImage}
                  deviceName={deviceData.name}
                  category="Cryotherapy"
                  rating={deviceData.rating}
                  scrollProgress={scrollProgress}
                />
              </Suspense>
            </div>
          </div>

          {/* Right - Specs */}
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-white/80 tracking-widest text-xs uppercase">Specifications</h2>
            <div className="grid grid-cols-1 gap-4">
              {deviceData.specs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`p-4 rounded-lg border ${
                    index === activeSpecIndex
                      ? 'border-green-400/60 bg-green-900/20 shadow-lg shadow-green-500/10'
                      : 'border-white/15 bg-white/5'
                  }`}
                >
                  <div className="text-green-300 text-sm">{spec.name}</div>
                  <div className="text-white text-base font-medium">{spec.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
