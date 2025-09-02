'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'ubody-collagen-bed-2',
  name: 'UBODY COLLAGEN BED 2.0',
  model: 'ADVANCED LIGHT THERAPY',
  description: 'The UBody Collagen Bed 2.0 is a light therapy system designed to rejuvenate the skin using clinically tested red and near-infrared wavelengths. By stimulating collagen and elastin production, it helps reduce fine lines, improve skin elasticity, and enhance hydration. This bed combines advanced LED technology with ergonomic comfort, making it suitable for spas, wellness centers, and beauty clinics.',
  rating: 4.9,
  modelPath: '/models/UBody-Collagen-Bed-2.glb',
  fallbackImage: '/images/device-placeholder.svg',
  benefits: [
    'Boosts collagen production',
    'Improves skin elasticity and tone',
    'Reduces wrinkles and fine lines',
    'Supports skin hydration',
    'Promotes relaxation'
  ],
  specs: [
    { name: 'LED Wavelengths', value: 'Red & Near-infrared', trigger: 0.1 },
    { name: 'Full-body treatment bed design', value: 'Ergonomic comfort', trigger: 0.25 },
    { name: 'Adjustable session programs', value: 'Customizable treatments', trigger: 0.4 },
    { name: 'Clinical-grade light output', value: 'Medical-grade LEDs', trigger: 0.55 },
    { name: 'Safety features', value: 'Eye protection & timers', trigger: 0.7 },
    { name: 'Control system', value: 'Touchscreen interface', trigger: 0.85 }
  ],
  category: 'Light Therapy',
  galleryImages: [
    '/images/ubody-collagen-bed-3-0.webp',
    '/images/ubody-collagen-bed.webp'
  ]
};

export default function UBodyCollagenBed2Page() {
  const backgroundTheme = getProductTheme('ubody-collagen-bed-2');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
}


