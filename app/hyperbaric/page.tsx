'use client';

import React from 'react';
import ResponsiveProductLayout from '../components/ResponsiveProductLayout';
import { getProductTheme } from '../data/productThemes';

const deviceData = {
  id: 'hyperbaric',
  name: 'HYPERBARIC CHAMBER',
  model: 'SAMBO VENTEC 3 ATA',
  description: 'Hyperbaric Oxygen Therapy (HBOT) is a cutting-edge, safe, simple, and effective therapy that improves the concentration & supply of oxygen in our blood, which in turn supercharges the rate at which our bodies heal. Under pressurized conditions, your lungs can gather much more oxygen than would be possible breathing pure oxygen at normal air pressure.',
  rating: 4.9,
  modelPath: '/models/hyperbaric-chamber.glb',
  fallbackImage: '/images/device-placeholder.svg',
  benefits: [
    'Improved brain function and metabolism',
    'Increased tissue oxygenation',
    'Reduced inflammation and swelling',
    'Enhanced wound healing',
    'Strengthened immune system',
    'New blood vessel growth stimulation'
  ],
  specs: [
    { name: 'Pressure Rating', value: '200kPa/2bar (3 ATA)', trigger: 0.1 },
    { name: 'Internal Volume', value: '1.0 ㎥', trigger: 0.25 },
    { name: 'Dimensions', value: 'Ø 760mm x 2,200mm L x 850mm H', trigger: 0.4 },
    { name: 'Weight', value: '270 kg (including controller)', trigger: 0.55 },
    { name: 'Pressurization Time', value: '~15 minutes to 200kPa', trigger: 0.7 },
    { name: 'Material', value: 'Galvanized Steel with powder coating', trigger: 0.85 }
  ],
  category: 'Hyperbaric Therapy'
};

export default function HyperbaricPage() {
  const backgroundTheme = getProductTheme('hyperbaric');
  
  return (
    <ResponsiveProductLayout 
      deviceData={deviceData} 
      backgroundTheme={backgroundTheme}
    />
  );
} 