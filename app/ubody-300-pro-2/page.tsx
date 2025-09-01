'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'ubody-300-pro-2',
  name: 'UBODY 300 PRO 2.0',
  model: 'ADVANCED WELLNESS POD',
  description: 'The UBody 300 Pro 2.0 is a cutting-edge wellness pod that combines multiple therapeutic technologies for comprehensive body and mind rejuvenation. This advanced system integrates infrared therapy, vibration, and LED light therapy to deliver exceptional results in a single, comfortable session.',
  rating: 4.9,
  modelPath: '/models/UBody-300-Pro-2.glb',
  fallbackImage: '/images/device-placeholder.svg',
  benefits: [
    'Comprehensive body rejuvenation',
    'Enhanced circulation and detoxification',
    'Improved skin tone and texture',
    'Stress relief and relaxation',
    'Muscle recovery and toning',
    'Weight management support'
  ],
  specs: [
    { name: 'Infrared Technology', value: 'Far-infrared heating panels', trigger: 0.1 },
    { name: 'Vibration Therapy', value: 'Adjustable intensity levels', trigger: 0.25 },
    { name: 'LED Light Therapy', value: 'Multi-wavelength system', trigger: 0.4 },
    { name: 'Session Duration', value: '20-45 minutes customizable', trigger: 0.55 },
    { name: 'Control System', value: 'Touchscreen interface', trigger: 0.7 },
    { name: 'Safety Features', value: 'Temperature monitoring & timers', trigger: 0.85 }
  ],
  category: 'Wellness Pod'
};

export default function UBody300Pro2Page() {
  const backgroundTheme = getProductTheme('ubody-300-pro-2');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
}
