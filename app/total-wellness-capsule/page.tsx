'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'total-wellness-capsule',
  name: 'TOTAL WELLNESS CAPSULE',
  model: 'COMPREHENSIVE THERAPY POD',
  description: 'The Total Wellness Capsule integrates multiple therapies—infrared heat, vibration, detoxification, and LED light therapy—into one enclosed pod. It delivers a relaxing full-body wellness experience while stimulating circulation, detoxification, and weight management. Popular in spas and wellness centers for its holistic approach.',
  rating: 4.8,
  modelPath: '/models/Total-Wellness-Capsule.glb',
  fallbackImage: '/images/device-placeholder.svg',
  benefits: [
    'Promotes detoxification',
    'Enhances weight loss and inch reduction',
    'Improves circulation',
    'Relieves stress and boosts relaxation',
    'Stimulates lymphatic drainage',
    'Enhances skin rejuvenation'
  ],
  specs: [
    { name: 'Pod Design', value: 'Enclosed capsule with ergonomic seating', trigger: 0.1 },
    { name: 'Infrared Therapy', value: 'Far-infrared heating system', trigger: 0.25 },
    { name: 'Vibration Platform', value: 'Multi-frequency vibration therapy', trigger: 0.4 },
    { name: 'LED Light Therapy', value: 'Therapeutic light spectrum', trigger: 0.55 },
    { name: 'Multi-program Settings', value: 'Customizable treatment protocols', trigger: 0.7 },
    { name: 'Control Panel', value: 'Touchscreen interface', trigger: 0.85 }
  ],
  category: 'Wellness Pod'
};

export default function TotalWellnessCapsulePage() {
  const backgroundTheme = getProductTheme('total-wellness-capsule');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
}
