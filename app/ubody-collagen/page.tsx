'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'collagen',
  name: 'UBODY COLLAGEN',
  model: 'BED 3.0',
  description: 'Advanced Red Light Therapy device offering a relaxed but powerful solution towards a healthy, balanced lifestyle. It enhances cellular function through targeted wavelengths, stimulating collagen production and promoting tissue repair. The full-body 360° coverage ensures optimal therapeutic light exposure for maximum benefits.',
  rating: 4.8,
  modelPath: '/models/ubody-collagen.glb',
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
  ],
  category: 'Red Light Therapy'
};

export default function UBodyCollagenPage() {
  const backgroundTheme = getProductTheme('ubody-collagen');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
} 