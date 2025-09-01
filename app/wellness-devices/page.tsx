'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const devices = [
  { id: 'hyperbaric', name: 'HYPERBARIC CHAMBER', path: '/hyperbaric', category: 'Oxygen Therapy' },
  { id: 'collagen', name: 'UBODY COLLAGEN', path: '/ubody-collagen', category: 'Light Therapy' },
  { id: 'cryotherapy', name: 'CRYO ARCTIC', path: '/cryo-arctic', category: 'Cryotherapy' },
  { id: 'oligoscan', name: 'OLIGOSCAN', path: '/oligoscan', category: 'Analysis' },
  { id: 'avacen', name: 'AVACEN', path: '/avacen', category: 'Thermal Therapy' },
  { id: 'hbot15ata', name: 'HBOT 1.5ATA', path: '/hbot-15ata', category: 'Oxygen Therapy' },
  { id: 'ubody-collagen-bed-2', name: 'UBODY COLLAGEN BED 2.0', path: '/ubody-collagen-bed-2', category: 'Light Therapy' },
  { id: 'cryo-penguin', name: 'CRYO PENGUIN', path: '/cryo-penguin', category: 'Cryotherapy' },
  { id: 'theralas-laser', name: 'THERALAS CLASS 4 LASER', path: '/theralas-laser', category: 'Laser Therapy' },
  { id: 'ubody-300-pro-2', name: 'UBODY 300 PRO 2.0', path: '/ubody-300-pro-2', category: 'Light Therapy' },
  { id: 'ubody-900-pro-2', name: 'UBODY 900 PRO 2.0', path: '/ubody-900-pro-2', category: 'Light Therapy' },
  { id: 'total-wellness-capsule', name: 'TOTAL WELLNESS CAPSULE', path: '/total-wellness-capsule', category: 'Multi-Therapy' },
  { id: 'pemf-negative-ion-pod', name: 'PEMF + NEGATIVE ION POD', path: '/pemf-negative-ion-pod', category: 'PEMF Therapy' },
  { id: 'ubody-ems-kegel-chair', name: 'UBODY EMS KEGEL CHAIR', path: '/ubody-ems-kegel-chair', category: 'EMS Therapy' },
  { id: 'ubody-far-infrared-sauna', name: 'UBODY FAR INFRARED SAUNA', path: '/ubody-far-infrared-sauna', category: 'Infrared Therapy' },
  { id: 'electrical-cryo-chamber', name: 'ELECTRICAL CRYOTHERAPY CHAMBER', path: '/electrical-cryo-chamber', category: 'Cryotherapy' },
  { id: 'cryoems', name: 'CRYOEMS', path: '/cryoems', category: 'Multi-Therapy' }
];

const categories = Array.from(new Set(devices.map(device => device.category)));

export default function WellnessDevicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-white text-xl font-bold hover:text-purple-400 transition-colors">
              ← Back to Home
            </Link>
            <div className="text-white text-lg font-semibold">
              Wellness Devices Gallery
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
          >
            Wellness Devices
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Explore our comprehensive collection of cutting-edge wellness and medical devices designed to enhance your health and well-being.
          </motion.p>
        </div>
      </section>

      {/* Devices Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300">
              All Devices
            </button>
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="px-6 py-3 rounded-full bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Link href={device.path}>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          {device.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                          {device.category}
                        </span>
                      </div>
                      <div className="text-white/40 group-hover:text-purple-400 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>View Details</span>
                        <span className="text-purple-400">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{devices.length}</div>
                <div className="text-white/60">Total Devices</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{categories.length}</div>
                <div className="text-white/60">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-white/60">Quality Assured</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
