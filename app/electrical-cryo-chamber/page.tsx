'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'electrical-cryo-chamber',
  name: 'ELECTRICAL CRYOTHERAPY CHAMBER',
  model: 'LIFECUBE WHOLE BODY CRYO',
  description: 'The LIFECUBE Electrical Cryotherapy Chamber offers whole-body treatments without the use of nitrogen. By maintaining safe, breathable air at temperatures of -150°C, it ensures maximum safety and comfort for clients. This advanced system is ideal for athletes, recovery centers, and wellness clinics seeking a safe, sustainable cryotherapy solution.',
  rating: 4.9,
  modelPath: '/models/Electrical-Cryo-Chamber.glb',
        fallbackImage: '/images/Cryo%20Science%20Chamber%20/NTL08818.JPG',
  benefits: [
    'Accelerates muscle recovery',
    'Reduces inflammation and pain',
    'Improves energy and performance',
    'Enhances skin rejuvenation',
    'Stimulates metabolic rate for weight loss',
    'Releases endorphins for mental clarity'
  ],
  specs: [
    { name: 'System', value: 'Electrical cooling system', trigger: 0.1 },
    { name: 'Temperature', value: '-150°C operating range', trigger: 0.25 },
    { name: 'Safety', value: 'Safe air-only system', trigger: 0.4 },
    { name: 'Interface', value: 'Touchscreen interface', trigger: 0.55 },
    { name: 'Design', value: 'Modular white chamber with LED lighting', trigger: 0.7 },
    { name: 'Brand', value: 'LIFECUBE technology', trigger: 0.85 }
  ],
  category: 'Cryotherapy',
  galleryImages: [
    '/images/Cryo Chamber Lifecube/_DSC5195.JPG',
    '/images/Cryo Chamber Lifecube/_DSC5196.JPG'
  ]
};

export default function ElectricalCryoChamberPage() {
  const backgroundTheme = getProductTheme('electrical-cryo-chamber');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
}
