'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'ubody-900-pro-2',
  name: 'UBODY 900 PRO 2.0',
  model: 'ADVANCED WELLNESS POD',
  description: 'The UBody 900 Pro 2.0 is a premium wellness pod that represents the pinnacle of therapeutic technology. This advanced system combines multiple cutting-edge therapies including infrared therapy, vibration, LED light therapy, and advanced detoxification protocols for comprehensive body and mind rejuvenation.',
  rating: 4.9,
  modelPath: '/models/UBody-900-Pro-2.glb',
  fallbackImage: '/images/device-placeholder.svg',
  benefits: [
    'Comprehensive body rejuvenation',
    'Advanced detoxification protocols',
    'Enhanced circulation and lymphatic drainage',
    'Improved skin tone and texture',
    'Stress relief and deep relaxation',
    'Muscle recovery and toning'
  ],
  specs: [
    { name: 'Infrared Technology', value: 'Advanced far-infrared heating system', trigger: 0.1 },
    { name: 'Vibration Therapy', value: 'Multi-frequency vibration platform', trigger: 0.25 },
    { name: 'LED Light Therapy', value: 'Full-spectrum therapeutic lighting', trigger: 0.4 },
    { name: 'Detoxification', value: 'Advanced lymphatic drainage system', trigger: 0.55 },
    { name: 'Session Duration', value: '30-60 minutes customizable', trigger: 0.7 },
    { name: 'Control System', value: 'Advanced touchscreen interface', trigger: 0.85 }
  ],
  category: 'Premium Wellness Pod'
};

export default function UBody900Pro2Page() {
  const backgroundTheme = getProductTheme('ubody-900-pro-2');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
}
