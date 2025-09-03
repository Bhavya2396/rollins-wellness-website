'use client';


import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'cryotherapy',
  name: 'CRYO ARCTIC',
  model: 'PERFORMANCE™',
  description: 'CRYO Arctic Performance is a single person whole-body cryotherapy chamber designed to deliver the safest and most effective Cryo treatments. Built with state-of-the-art technology innovatively engineered to ensure that clients never come into direct contact with nitrogen vapors, only breathable air.',
  rating: 4.9,
  modelPath: 'https://gbt3sbuqldp6frke.public.blob.vercel-storage.com/Rollins%20-%20wellness%20-%20/Cryo%20Arctic%20Whole%20Body%20Cryo%20Therapy.glb',
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
  ],
  category: 'Cryotherapy',
  galleryImages: [
    '/images/Cryo Science Chamber /NTL08818.JPG',
    '/images/Cryo Science Chamber /NTL08820.JPG',
    '/images/Cryo Science Chamber /NTL08822.JPG'
  ]
};

export default function CryoArcticPage() {
  const backgroundTheme = getProductTheme('cryo-arctic');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
} 