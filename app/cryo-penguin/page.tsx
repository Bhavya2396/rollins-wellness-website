'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'cryo-penguin',
  name: 'CRYO PENGUIN',
  model: 'ARCTIC PERFORMANCE',
  description: 'The Cryo Penguin is a state-of-the-art cryotherapy chamber designed for optimal performance and recovery. Using advanced cooling technology, it delivers precise temperature control for maximum therapeutic benefits while ensuring complete safety and comfort.',
  rating: 4.8,
  modelPath: '/models/Cryo-Penguin.glb',
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
  category: 'Cryotherapy'
};

export default function CryoPenguinPage() {
  const backgroundTheme = getProductTheme('cryo-penguin');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
}
