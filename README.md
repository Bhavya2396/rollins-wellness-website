# Rollins Wellness Devices - Luxury Website

A Ferrari-inspired luxury website for Rollins International's premium wellness devices. This project transforms medical device presentation into a high-end automotive-style experience.

## 🏎️ Design Inspiration

Inspired by luxury automotive websites (particularly Ferrari), this site features:
- **Center Stage Product Display**: 3D-style rotating product showcases
- **Left Panel**: Detailed product information and benefits  
- **Right Panel**: Technical specifications and applications
- **Bottom Navigation**: Thumbnail gallery for device selection
- **Premium Animations**: Floating, rotating, and glow effects

## 🚀 Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom luxury theme
- **Framer Motion** - Advanced animations and interactions
- **Lucide React** - Beautiful icon library

## 🏥 Featured Devices

### Hyperbaric Oxygen Therapy
- **SAMBO VENTEC 3 ATA** - Professional hyperbaric chamber
- **OXYTERAPIA** - Advanced oxygen therapy system

### Cryotherapy Systems
- **°CRYO Arctic Performance** - Whole body cryotherapy chamber
- **°CRYO Penguin** - Precision localized cryotherapy

### Red Light Therapy
- **Ubody 900 Pro 2.0** - Professional LED panel system
- **Ubody 300 Pro 2.0** - Compact targeted therapy device
- **Ubody Collagen Bed 3.0** - Full-body treatment bed

### Additional Devices  
- **Theralas Laser** - Pain relief and tissue healing
- **EPM MesoSkin** - Professional mesotherapy system

## 🎨 Design Features

### Color Palette
- **Luxury Grays**: Deep slate backgrounds (0f172a → 334155)
- **Gold Accents**: Premium gold highlights (f59e0b → d97706)  
- **Red Accents**: Energy and technology (ef4444 → 991b1b)

### Animations
- **Float Effect**: Gentle up-down product movement
- **Rotate Slow**: Continuous 360° rotation decorative elements
- **Pulse Glow**: Breathing light effects on interactive elements
- **Slide Transitions**: Smooth left/right panel animations

### Typography
- **Inter Font**: Modern, professional typeface
- **Gradient Text**: Gold gradient on headings
- **Hierarchical**: Clear information architecture

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rollins-wellness-luxury
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Design

- **Desktop First**: Optimized for large screens (1920px+)
- **Tablet**: Responsive layouts for iPad Pro
- **Mobile**: Touch-friendly mobile experience

## 🎯 Key Components

### `ProductShowcase`
- Center stage 3D product display
- Floating animations and interactive hotspots
- Rating display and category badges

### `ProductInfo` 
- Left panel with device details
- Animated text reveals
- Key benefits and company branding

### `ProductSpecs`
- Right panel technical specifications  
- Applications grid
- Premium medical grade badges

### `ProductThumbnails`
- Bottom navigation carousel
- Ferrari-style thumbnail selector
- Active state indicators

### `Navigation`
- Fixed header with Rollins branding
- Luxury styling with backdrop blur
- CTA buttons and menu links

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to modify the luxury color palette:

```js
colors: {
  luxury: { /* Slate grays */ },
  accent: { /* Red highlights */ },
  gold: { /* Premium gold */ }
}
```

### Animations
Modify animations in `tailwind.config.js`:

```js
animation: {
  'float': 'float 6s ease-in-out infinite',
  'rotate-slow': 'rotate-slow 20s linear infinite',
  // Add custom animations
}
```

## 🏢 About Rollins International

**Rollins International Pvt Ltd** is a subsidiary of Singapore-based RHA Holdings, specializing in:

- **Wellness Technology**: Cutting-edge therapeutic devices
- **Healthcare Solutions**: Professional medical equipment  
- **Consumer Products**: Home wellness devices
- **Global Partnerships**: International device manufacturers

**Mission**: Provide innovative health & wellness solutions with customer satisfaction as top priority.

**Location**: 510, Global Foyer, Golf Course Road, Sector 43, Gurgaon - 122002, Haryana, India

## 📞 Contact Information

- **Phone**: +91 95992 63703
- **Email**: ashish@rollins.co.in
- **Website**: [wellnessdevices.in](https://wellnessdevices.in)

## 🤝 International Partners

- **Life-Cube, Germany** - Whole-body cryotherapy chambers
- **IQ Body, Germany** - Body contouring cryo EMS
- **CaressFlow, Italy** - Women's health devices  
- **CryoScience, Poland** - Localized cryotherapy
- **Avacen, USA** - Pain management devices
- **Korea** - Hyperbaric oxygen chambers

## 📄 License

This project is proprietary to Rollins International Pvt Ltd. All rights reserved.

## 🔧 Development

### Folder Structure
```
app/
├── components/          # React components
├── data/               # Product data and types  
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Main page

images/                 # Product images
├── hyperbaric-*.png    # Hyperbaric chambers
├── cryo-*.webp         # Cryotherapy devices
├── ubody-*.webp        # Red light therapy
├── theralas-*.webp     # Laser therapy
└── Mesoskin-*.webp     # Aesthetic devices
```

### Adding New Products

1. Add product images to `/images/`
2. Update `app/data/products.ts` with new device specs
3. Components will automatically display new products

### Performance Optimization

- **Image Optimization**: Next.js automatic WebP conversion
- **Code Splitting**: Automatic route-based splitting  
- **Animation Performance**: GPU-accelerated transforms
- **Bundle Analysis**: Built-in Next.js analyzer

---

**Built with ❤️ for Rollins International - Transforming Wellness Technology** 