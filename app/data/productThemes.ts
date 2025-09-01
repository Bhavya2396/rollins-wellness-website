export interface ProductTheme {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  accentGradient: string;
}

export const productThemes: Record<string, ProductTheme> = {
  // Hyperbaric Chamber - Deep Ocean Blue
  hyperbaric: {
    primary: 'bg-blue-600',
    secondary: 'text-blue-300',
    accent: 'text-blue-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-blue-500/25 to-cyan-500/20'
  },

  // UBody Collagen - Warm Red/Purple
  'ubody-collagen': {
    primary: 'bg-purple-600',
    secondary: 'text-purple-300',
    accent: 'text-purple-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-purple-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-purple-500/20 to-pink-500/15'
  },

  // Cryo Arctic - Cool Ice Blue
  'cryo-arctic': {
    primary: 'bg-cyan-600',
    secondary: 'text-cyan-300',
    accent: 'text-cyan-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-cyan-400/25 to-blue-400/20'
  },

  // Oligoscan - Emerald Green
  oligoscan: {
    primary: 'bg-emerald-600',
    secondary: 'text-emerald-300',
    accent: 'text-emerald-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-emerald-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/15'
  },

  // Avacen - Golden Amber
  avacen: {
    primary: 'bg-amber-600',
    secondary: 'text-amber-300',
    accent: 'text-amber-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-amber-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-amber-500/20 to-orange-500/15'
  },

  // HBOT 1.5ATA - Deep Indigo
  'hbot-15ata': {
    primary: 'bg-indigo-600',
    secondary: 'text-indigo-300',
    accent: 'text-indigo-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-indigo-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-indigo-500/20 to-purple-500/15'
  },

  // UBody Collagen Bed 2.0 - Rose Pink
  'ubody-collagen-bed-2': {
    primary: 'bg-rose-600',
    secondary: 'text-rose-300',
    accent: 'text-rose-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-rose-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-rose-500/20 to-pink-500/15'
  },

  // Cryo Penguin - Arctic Blue
  'cryo-penguin': {
    primary: 'bg-sky-600',
    secondary: 'text-sky-300',
    accent: 'text-sky-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-sky-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-sky-500/20 to-blue-500/15'
  },

  // TheraLAS Laser - Laser Red
  'theralas-laser': {
    primary: 'bg-red-600',
    secondary: 'text-red-300',
    accent: 'text-red-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-red-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-red-500/20 to-pink-500/15'
  },

  // UBody 300 Pro 2.0 - Electric Blue
  'ubody-300-pro-2': {
    primary: 'bg-blue-600',
    secondary: 'text-blue-300',
    accent: 'text-blue-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-blue-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/15'
  },

  // UBody 900 Pro 2.0 - Deep Purple
  'ubody-900-pro-2': {
    primary: 'bg-violet-600',
    secondary: 'text-violet-300',
    accent: 'text-violet-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-violet-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-violet-500/20 to-purple-500/15'
  },

  // Total Wellness Capsule - Healing Green
  'total-wellness-capsule': {
    primary: 'bg-green-600',
    secondary: 'text-green-300',
    accent: 'text-green-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-green-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-green-500/20 to-emerald-500/15'
  },

  // PEMF Negative Ion Pod - Cosmic Purple
  'pemf-negative-ion-pod': {
    primary: 'bg-fuchsia-600',
    secondary: 'text-fuchsia-300',
    accent: 'text-fuchsia-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-fuchsia-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-fuchsia-500/20 to-purple-500/15'
  },

  // UBody EMS Kegel Chair - Royal Blue
  'ubody-ems-kegel-chair': {
    primary: 'bg-blue-700',
    secondary: 'text-blue-300',
    accent: 'text-blue-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-blue-800/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-blue-600/20 to-indigo-500/15'
  },

  // UBody Far Infrared Sauna - Warm Orange
  'ubody-far-infrared-sauna': {
    primary: 'bg-orange-600',
    secondary: 'text-orange-300',
    accent: 'text-orange-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-orange-900/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-orange-500/20 to-red-500/15'
  },

  // Electrical Cryo Chamber - Frost Blue
  'electrical-cryo-chamber': {
    primary: 'bg-cyan-700',
    secondary: 'text-cyan-300',
    accent: 'text-cyan-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-cyan-800/25 to-slate-900',
    accentGradient: 'bg-gradient-to-r from-cyan-600/20 to-blue-500/15'
  },

  // CryoEMS - Dual Tone Blue-Purple
  cryoems: {
    primary: 'bg-blue-600',
    secondary: 'text-blue-300',
    accent: 'text-purple-400',
    gradient: 'bg-gradient-to-br from-slate-900 via-blue-900/25 to-purple-900/20',
    accentGradient: 'bg-gradient-to-r from-blue-500/20 to-purple-500/15'
  }
};

// Default theme for fallback
export const defaultTheme: ProductTheme = {
  primary: 'bg-slate-600',
  secondary: 'text-slate-300',
  accent: 'text-slate-400',
  gradient: 'bg-gradient-to-br from-slate-900 via-slate-800/25 to-slate-900',
  accentGradient: 'bg-gradient-to-r from-slate-500/20 to-gray-500/15'
};

export function getProductTheme(productId: string): ProductTheme {
  return productThemes[productId] || defaultTheme;
}
