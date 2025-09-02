'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'theralas-laser',
  name: 'THERALAS CLASS 4 LASER',
  model: 'ADVANCED LASER THERAPY',
  description: 'The TheraLAS Class 4 Laser is a cutting-edge therapeutic laser system designed for deep tissue treatment and accelerated healing. Using advanced laser technology, it delivers precise energy to target areas, promoting cellular regeneration and reducing pain and inflammation.',
  rating: 4.9,
  modelPath: '/models/Theralas-Laser.glb',
  fallbackImage: '/images/device-placeholder.svg',
  benefits: [
    'Deep tissue penetration',
    'Accelerated healing process',
    'Pain reduction and management',
    'Anti-inflammatory effects',
    'Improved circulation',
    'Enhanced cellular regeneration'
  ],
  specs: [
    { name: 'Laser Class', value: 'Class 4 Therapeutic Laser', trigger: 0.1 },
    { name: 'Wavelength', value: '810nm & 980nm dual wavelength', trigger: 0.25 },
    { name: 'Power Output', value: 'Up to 15W adjustable', trigger: 0.4 },
    { name: 'Treatment Modes', value: 'Multiple programmable protocols', trigger: 0.55 },
    { name: 'Safety Features', value: 'Eye protection & safety interlocks', trigger: 0.7 },
    { name: 'Control System', value: 'Touchscreen interface with preset programs', trigger: 0.85 }
  ],
  category: 'Laser Therapy',
  galleryImages: [
    '/images/theralas-device.webp'
  ]
};

export default function TheraLASLaserPage() {
  const backgroundTheme = getProductTheme('theralas-laser');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
}
