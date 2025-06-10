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
    description: 'SAMBO VENTEC 3 ATA hyperbaric chamber delivering safe, effective oxygen therapy at elevated pressure for enhanced healing and recovery.',
    longDescription: 'The SAMBO VENTEC 3 ATA represents the pinnacle of hyperbaric oxygen therapy technology. This single-person chamber utilizes pressurized oxygen delivery to supercharge your body\'s natural healing processes. Under controlled pressurized conditions up to 3 ATA, your lungs absorb significantly more oxygen than possible at normal air pressure, dramatically enhancing cellular repair, reducing inflammation, and accelerating recovery from various medical conditions.',
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
    description: '°CRYO Arctic Performance chamber from Life-Cube Germany - the safest electric whole-body cryotherapy system with premium design.',
    longDescription: 'Manufactured by Life-Cube Germany, the °CRYO Arctic Performance delivers revolutionary whole-body cryotherapy treatments at temperatures down to -160°C. This electric cryotherapy system eliminates nitrogen exposure risks while providing superior therapeutic benefits. Advanced safety systems, premium interior features including touchscreen controls and audio system, plus remote Wi-Fi assistance make this the most sophisticated cryotherapy chamber available.',
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
    description: '°CRYO Penguin from CryoScience Poland - precision localized cryotherapy device with ergonomic design and pinpoint accuracy.',
    longDescription: 'Engineered by CryoScience Poland, the °CRYO Penguin delivers the most precise localized cryotherapy treatments available. This flexible, ergonomic device features pre-programmed protocols for everything from facial treatments to body contouring and post-sport recovery. With pinpoint accuracy and multiple specialized nozzles, it offers unmatched versatility at the lowest cost per square foot in the industry.',
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
    description: 'Professional-grade Ubody 900 Pro 2.0 with 900 medical-grade LEDs delivering powerful dual-wavelength photobiomodulation therapy.',
    longDescription: 'The Ubody 900 Pro 2.0 represents professional photobiomodulation at its finest. Featuring 900 medical-grade LEDs emitting precisely calibrated 660nm red and 850nm near-infrared wavelengths, this device delivers 300W of therapeutic power across a large 24" x 16" treatment area. Ultra-low EMF design ensures safety while the modular construction allows for versatile positioning and comprehensive full-body treatments.',
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
    description: 'Compact Ubody 300 Pro 2.0 with 300 LEDs - perfect for targeted red light therapy treatments and home wellness use.',
    longDescription: 'Designed for precision and convenience, the Ubody 300 Pro 2.0 delivers targeted photobiomodulation in a compact, user-friendly package. With 300 medical-grade LEDs providing 100W of therapeutic power, this device excels at focused treatments. The adjustable stand system allows optimal positioning for facial treatments, joint therapy, and wound care applications.',
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
    description: 'Full-body Ubody Collagen Bed 3.0 with 1200+ LEDs providing comprehensive red light therapy for collagen stimulation and anti-aging.',
    longDescription: 'The Ubody Collagen Bed 3.0 delivers the ultimate full-body red light therapy experience. Featuring over 1200 medical-grade LEDs emitting 633nm red and 850nm near-infrared wavelengths, this luxurious 7ft bed provides complete 360° coverage for maximum therapeutic benefit. The digital touch panel control system allows for customized sessions targeting collagen production, skin rejuvenation, and comprehensive wellness therapy.',
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
    description: 'Theralas Class IV therapeutic laser system with dual wavelengths for precise pain management and accelerated tissue healing.',
    longDescription: 'The Theralas Laser system represents cutting-edge therapeutic laser technology for pain management and tissue repair. This Class IV laser delivers precise therapeutic energy through dual 810nm and 980nm wavelengths, with power output up to 15W. Featuring over 50 pre-programmed protocols and an intuitive color touchscreen interface, it provides clinically-proven treatments for chronic pain, sports injuries, and rehabilitation.',
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
    description: 'EPM MesoSkin professional mesotherapy system with precision depth control for advanced aesthetic treatments and skin rejuvenation.',
    longDescription: 'The EPM MesoSkin system delivers professional-grade mesotherapy with unparalleled precision and control. Featuring adjustable depth control from 0.1mm to 3.0mm and five variable speed settings, this portable unit enables precise delivery of aesthetic treatments. The LCD display provides real-time monitoring while ergonomic design ensures comfort during extended treatment sessions.',
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