export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  model3d?: string;
  price?: string;
  specs: {
    [key: string]: string | string[];
  };
  features: string[];
  applications: string[];
  rating: number;
}

export const products: Product[] = [
  {
    id: 'hyperbaric-oxygen-chamber',
    name: 'Hyperbaric Oxygen Therapy Chamber',
    category: 'Hyperbaric Therapy',
    description: 'Advanced hyperbaric oxygen therapy chamber designed for enhanced healing and recovery.',
    longDescription: 'Rollins has mechanically advanced, powerful and captivating at the same time, the new Hyperbaric Chamber offers unprecedented state of the art therapeutic technology.',
    image: '/images/hyperbaric-oxygen-therapy-chamber.png',
    model3d: '/models/hyperbaric-chamber.glb',
    specs: {
      'Pressure Range': '1.3 - 3.0 ATA',
      'Chamber Type': 'Single Person',
      'Oxygen Concentration': '95% - 100%',
      'Session Duration': '60 - 90 minutes',
      'Safety Features': ['Emergency release', 'Pressure monitoring', 'Oxygen monitoring'],
      'Certification': 'FDA Approved',
    },
    features: [
      'Enhanced cellular oxygen delivery',
      'Accelerated wound healing',
      'Improved circulation',
      'Reduced inflammation',
      'Neurological support',
      'Athletic recovery enhancement'
    ],
    applications: [
      'Post-surgical recovery',
      'Athletic performance',
      'Anti-aging therapy',
      'Chronic fatigue',
      'Neurological conditions',
      'Wound healing'
    ],
    rating: 4.9
  },
  {
    id: 'cryo-arctic-chamber',
    name: '°CRYO Arctic Performance',
    category: 'Cryotherapy',
    description: 'Single-person whole-body cryotherapy chamber with premium design and safety standards.',
    longDescription: 'The °CRYO Arctic Performance combines cutting-edge cryotherapy technology with premium design. Deliver the safest and most effective cryo treatments with state-of-the-art temperature control and safety features.',
    image: '/images/cryo-artic.webp',
    specs: {
      'Temperature Range': '-110°C to -160°C',
      'Session Duration': '1 - 3 minutes',
      'Chamber Type': 'Single Person',
      'Cooling System': 'Electric',
      'Safety Features': ['Emergency exit', 'Temperature monitoring', 'Time control'],
      'Power Requirements': '380V, 50Hz',
    },
    features: [
      'Rapid muscle recovery',
      'Reduced inflammation',
      'Enhanced athletic performance',
      'Improved circulation',
      'Pain relief',
      'Metabolic boost'
    ],
    applications: [
      'Sports recovery',
      'Pain management',
      'Wellness therapy',
      'Anti-aging',
      'Weight management',
      'Inflammation reduction'
    ],
    rating: 4.8
  },
  {
    id: 'cryo-penguin',
    name: '°CRYO Penguin',
    category: 'Localized Cryotherapy',
    description: 'Precision localized cryotherapy device for targeted treatments with pinpoint accuracy.',
    longDescription: 'The °CRYO Penguin delivers the safest and most effective localized cryotherapy treatments. With ergonomic design, pre-programmed protocols, and built-in safety features, it handles everything from body contouring to post-sport recovery.',
    image: '/images/cryo-penguin.webp',
    specs: {
      'Temperature': '-30°C',
      'Treatment Area': 'Localized zones',
      'Session Duration': '5 - 15 minutes',
      'Nozzle Types': ['Facial', 'Body', 'Precision'],
      'Safety Features': ['Automatic shut-off', 'Temperature control'],
      'Portability': 'Mobile unit',
    },
    features: [
      'Pinpoint accuracy',
      'Flexible treatment options',
      'Ergonomic design',
      'Pre-programmed protocols',
      'Built-in safety features',
      'Cost-effective operation'
    ],
    applications: [
      'Facial treatments',
      'Body contouring',
      'Spot treatments',
      'Post-workout recovery',
      'Aesthetic procedures',
      'Pain relief'
    ],
    rating: 4.7
  },
  {
    id: 'ubody-900-pro',
    name: 'Ubody 900 Pro 2.0',
    category: 'Red Light Therapy',
    description: 'Professional-grade red light therapy device for comprehensive wellness treatments.',
    longDescription: 'The Ubody 900 Pro 2.0 offers powerful red and near-infrared light therapy in a professional-grade package. Enhance cellular function, reduce inflammation, and promote healing with this cutting-edge photobiomodulation device.',
    image: '/images/ubody-900.webp',
    specs: {
      'LED Count': '900 LEDs',
      'Wavelengths': ['660nm Red', '850nm Near-Infrared'],
      'Power Output': '300W',
      'Treatment Area': '24" x 16"',
      'Timer Settings': '5, 10, 15, 20 minutes',
      'EMF Rating': 'Ultra-low EMF',
    },
    features: [
      'Dual wavelength therapy',
      'Professional-grade LEDs',
      'Large treatment area',
      'Adjustable intensity',
      'Ultra-low EMF',
      'Modular design'
    ],
    applications: [
      'Skin rejuvenation',
      'Muscle recovery',
      'Pain management',
      'Wound healing',
      'Anti-aging',
      'Cellular health'
    ],
    rating: 4.8
  },
  {
    id: 'ubody-300-pro',
    name: 'Ubody 300 Pro 2.0',
    category: 'Red Light Therapy',
    description: 'Compact red light therapy device perfect for targeted treatments and home use.',
    longDescription: 'The Ubody 300 Pro 2.0 delivers targeted red light therapy in a compact, user-friendly design. Perfect for focused treatments, this device provides professional-quality photobiomodulation therapy.',
    image: '/images/ubody-300.webp',
    specs: {
      'LED Count': '300 LEDs',
      'Wavelengths': ['660nm Red', '850nm Near-Infrared'],
      'Power Output': '100W',
      'Treatment Area': '12" x 8"',
      'Timer Settings': '5, 10, 15, 20 minutes',
      'Mounting': 'Adjustable stand',
    },
    features: [
      'Compact design',
      'Dual wavelength',
      'Adjustable positioning',
      'User-friendly interface',
      'Energy efficient',
      'Portable'
    ],
    applications: [
      'Facial treatments',
      'Targeted therapy',
      'Joint pain relief',
      'Wound care',
      'Skin health',
      'Recovery therapy'
    ],
    rating: 4.6
  },
  {
    id: 'ubody-collagen-bed-3',
    name: 'Ubody Collagen Bed 3.0',
    category: 'Red Light Therapy',
    description: 'Full-body red light therapy bed with advanced collagen stimulation technology.',
    longDescription: 'Rollins has mechanically advanced, powerful and captivating at the same time, the new Collagen Bed offers unprecedented state of the art red light therapy technology.',
    image: '/images/ubody-collagen-bed-3-0.webp',
    model3d: '/models/ubody-collagen.glb',
    specs: {
      'LED Count': '1200+ LEDs',
      'Wavelengths': ['633nm Red', '850nm Near-Infrared'],
      'Treatment Area': 'Full body',
      'Session Duration': '10 - 20 minutes',
      'Bed Dimensions': '7ft x 3ft',
      'Control System': 'Digital touch panel',
    },
    features: [
      'Full-body coverage',
      'Collagen stimulation',
      'Comfortable bed design',
      'Advanced LED technology',
      'Customizable sessions',
      'Professional grade'
    ],
    applications: [
      'Anti-aging therapy',
      'Skin rejuvenation',
      'Collagen production',
      'Wellness therapy',
      'Recovery enhancement',
      'Aesthetic treatments'
    ],
    rating: 4.9
  },
  {
    id: 'theralas-laser',
    name: 'Theralas Laser',
    category: 'Pain Relief',
    description: 'Advanced laser therapy device for effective pain management and tissue healing.',
    longDescription: 'The Theralas Laser system delivers precise therapeutic laser energy for pain relief and accelerated healing. This professional-grade device offers multiple treatment protocols for various conditions.',
    image: '/images/theralas-device.webp',
    specs: {
      'Laser Type': 'Class IV Therapeutic Laser',
      'Wavelengths': ['810nm', '980nm'],
      'Power Output': 'Up to 15W',
      'Treatment Modes': ['Continuous', 'Pulsed'],
      'Protocols': '50+ pre-programmed',
      'Display': 'Color touchscreen',
    },
    features: [
      'Precision laser therapy',
      'Multiple wavelengths',
      'Pre-programmed protocols',
      'Intuitive interface',
      'Portable design',
      'Clinical grade'
    ],
    applications: [
      'Chronic pain management',
      'Sports injuries',
      'Arthritis treatment',
      'Wound healing',
      'Rehabilitation',
      'Physical therapy'
    ],
    rating: 4.7
  },
  {
    id: 'epm-mesoskin',
    name: 'EPM MesoSkin',
    category: 'Aesthetic Medicine',
    description: 'Professional mesotherapy device for advanced skin treatments and rejuvenation.',
    longDescription: 'The EPM MesoSkin system provides professional-grade mesotherapy treatments for skin rejuvenation, anti-aging, and aesthetic enhancement. Advanced technology meets clinical precision.',
    image: '/images/Mesoskin-DEVICE.webp',
    specs: {
      'Treatment Type': 'Mesotherapy',
      'Depth Control': '0.1mm - 3.0mm',
      'Speed Settings': '5 levels',
      'Needle Types': 'Various gauges',
      'Display': 'LCD screen',
      'Portability': 'Portable unit',
    },
    features: [
      'Precision depth control',
      'Multiple speed settings',
      'Ergonomic design',
      'Clinical accuracy',
      'Versatile applications',
      'Professional grade'
    ],
    applications: [
      'Skin rejuvenation',
      'Anti-aging treatments',
      'Scar reduction',
      'Cellulite treatment',
      'Hair restoration',
      'Aesthetic enhancement'
    ],
    rating: 4.5
  }
];

export const categories = [
  'All',
  'Hyperbaric Therapy',
  'Cryotherapy',
  'Red Light Therapy',
  'Pain Relief',
  'Aesthetic Medicine'
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
}; 