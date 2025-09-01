'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'pemf-negative-ion-pod',
  name: 'PEMF + NEGATIVE ION POD',
  model: 'CELLULAR ENHANCEMENT SYSTEM',
  description: 'This wellness pod combines Pulsed Electromagnetic Field (PEMF) therapy with negative ion technology to support cellular repair and overall wellness. PEMF stimulates energy production in cells, while negative ions enhance detoxification and vitality.',
  rating: 4.8,
  modelPath: '/models/PEMF-Negative-Ion-Pod.glb',
  fallbackImage: '/images/device-placeholder.svg',
  benefits: [
    'Boosts cell repair and energy production',
    'Reduces stress and fatigue',
    'Supports detoxification',
    'Enhances overall vitality',
    'Improves cellular communication',
    'Promotes natural healing processes'
  ],
  specs: [
    { name: 'PEMF Technology', value: 'Integrated PEMF coils', trigger: 0.1 },
    { name: 'Negative Ion System', value: 'High-density ion emitters', trigger: 0.25 },
    { name: 'Pod Enclosure', value: 'Comfortable seating design', trigger: 0.4 },
    { name: 'Intensity Control', value: 'Adjustable treatment levels', trigger: 0.55 },
    { name: 'Session Duration', value: '20-40 minutes per session', trigger: 0.7 },
    { name: 'Safety Features', value: 'Automatic shutoff & monitoring', trigger: 0.85 }
  ],
  category: 'PEMF Therapy'
};

export default function PEMFNegativeIonPodPage() {
  const backgroundTheme = getProductTheme('pemf-negative-ion-pod');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
}
