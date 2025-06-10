'use client';

import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Float, useTexture } from '@react-three/drei';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

interface ScrollData {
  progress: number;
  velocity: number;
  direction: number;
}

interface DeviceFeature {
  id: string;
  position: [number, number, number];
  label: string;
  description: string;
  trigger: number;
  color: string;
  intensity: number;
}

interface MedicalDeviceModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  scrollData: ScrollData;
  features: DeviceFeature[];
  deviceName: string;
}

// Enhanced 3D Model with Cinematic Movements
const MedicalDeviceModel: React.FC<MedicalDeviceModelProps> = ({ 
  url, 
  scale = 0.5,
  position = [0, 0, 0],
  scrollData,
  features,
  deviceName
}) => {
  const gltf = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);
  const [modelError, setModelError] = useState(false);

  // Camera animation based on scroll with enhanced stages
  const cameraStages = useMemo(() => {
    const progress = scrollData.progress;
    
    if (progress < 0.15) {
      // Stage 1: Front view zoom in
      return {
        position: [0, 0, 4.5 - progress * 6.7],
        rotation: [0, 0, 0],
        scale: scale + progress * 0.3
      };
    } else if (progress < 0.30) {
      // Stage 2: Side angle close-up
      const localProgress = (progress - 0.15) / 0.15;
      return {
        position: [localProgress * 3, 0.5 + localProgress * 0.5, 3.5],
        rotation: [0, localProgress * Math.PI * 0.3, 0],
        scale: scale + 0.3
      };
    } else if (progress < 0.45) {
      // Stage 3: Top-down dramatic view
      const localProgress = (progress - 0.30) / 0.15;
      return {
        position: [3, 0.5 + localProgress * 2, 3.5 - localProgress * 1],
        rotation: [-localProgress * Math.PI * 0.2, Math.PI * 0.3, 0],
        scale: scale + 0.3 - localProgress * 0.1
      };
    } else if (progress < 0.60) {
      // Stage 4: Extreme close-up sweep left
      const localProgress = (progress - 0.45) / 0.15;
      return {
        position: [3 - localProgress * 6, 2.5, 2.5 - localProgress * 0.8],
        rotation: [-Math.PI * 0.2, Math.PI * 0.3 + localProgress * Math.PI * 0.4, 0],
        scale: scale + 0.2 + localProgress * 0.5
      };
    } else if (progress < 0.75) {
      // Stage 5: Side profile
      const localProgress = (progress - 0.60) / 0.15;
      return {
        position: [-3, 2.5 - localProgress * 1, 1.7],
        rotation: [-Math.PI * 0.2 + localProgress * Math.PI * 0.1, Math.PI * 0.7, 0],
        scale: scale + 0.7 - localProgress * 0.2
      };
    } else if (progress < 0.90) {
      // Stage 6: Rear view dramatic
      const localProgress = (progress - 0.75) / 0.15;
      return {
        position: [-3 + localProgress * 3, 1.5, 1.7 + localProgress * 1],
        rotation: [-Math.PI * 0.1, Math.PI * 0.7 + localProgress * Math.PI * 0.6, 0],
        scale: scale + 0.5 - localProgress * 0.1
      };
    } else {
      // Stage 7: Cinematic overview pullback
      const localProgress = (progress - 0.90) / 0.10;
      return {
        position: [0, 1.5 - localProgress * 1.5, 2.7 + localProgress * 1.8],
        rotation: [-Math.PI * 0.1 + localProgress * Math.PI * 0.1, Math.PI * 1.3 + localProgress * Math.PI * 0.7, 0],
        scale: scale + 0.4 - localProgress * 0.2
      };
    }
  }, [scrollData.progress, scale]);

  // Error handling for model loading
  useEffect(() => {
    const handleError = () => {
      console.warn(`Failed to load 3D model: ${url}`);
      setModelError(true);
    };
    
    // Listen for loading errors
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.onBeforeRender = () => {
            // Model loaded successfully
            setModelError(false);
          };
        }
      });
    }
    
    return () => {
      // Cleanup
    };
  }, [gltf, url]);

  // If model failed to load, return a simple placeholder
  if (modelError) {
    return (
      <mesh ref={meshRef} position={position} scale={cameraStages.scale}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#334155" transparent opacity={0.6} />
      </mesh>
    );
  }

  return (
    <group ref={meshRef}>
      <primitive 
        object={gltf.scene}
        position={position}
        scale={cameraStages.scale}
        rotation={cameraStages.rotation}
      />
      
      {/* Feature highlights based on scroll progress */}
      {features.map((feature, index) => {
        const isActive = scrollData.progress >= feature.trigger;
        return (
          <mesh
            key={feature.id}
            position={feature.position}
            visible={isActive}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color={feature.color}
              emissive={feature.color}
              emissiveIntensity={feature.intensity}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Enhanced Lighting System for Premium Look
const PremiumLighting: React.FC<{ scrollData: ScrollData }> = ({ scrollData }) => {
  return (
    <>
      <Environment 
        preset="city" // Changed from "studio" to "city" for softer ambient lighting
        background={false}
      />
      
      {/* Main directional light - much softer */}
      <directionalLight
        position={[5, 8, 5]}
        color="#ffffff"
        intensity={0.4}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0001}
      />
      
      {/* Accent lights for material enhancement - very subtle */}
      <pointLight 
        position={[-10, 6, -6]} 
        intensity={0.15}
        color="#4f46e5" 
        decay={2}
        distance={20}
      />
      <pointLight 
        position={[10, -4, 6]} 
        intensity={0.1}
        color="#06b6d4" 
        decay={2}
        distance={20}
      />
      
      {/* Ambient lighting for overall illumination - minimal */}
      <ambientLight intensity={0.25} color="#f8fafc" />
      
      {/* Premium rim lighting - very subtle */}
      <spotLight
        position={[0, 15, 8]}
        angle={0.25}
        penumbra={0.8}
        intensity={0.25}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
};

interface MedicalDevice3DProps {
  modelUrl?: string;
  fallbackImage?: string;
  deviceName: string;
  category: string;
  rating: number;
  scrollProgress?: number;
}

const MedicalDevice3D: React.FC<MedicalDevice3DProps> = ({
  modelUrl,
  fallbackImage = '/images/device-placeholder.svg',
  deviceName,
  category,
  rating,
  scrollProgress = 0
}) => {
  const [scrollData, setScrollData] = useState<ScrollData>({ progress: scrollProgress, velocity: 0, direction: 1 });
  const [activeFeature, setActiveFeature] = useState<DeviceFeature | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const lastScrollY = useRef(0);

  // Client-side mounting check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Responsive hook to handle mobile detection
  useEffect(() => {
    if (!isMounted) return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMounted]);

  // Generate features based on device type
  const features = useMemo(() => {
    if (deviceName.includes('Hyperbaric')) {
      return [
        { 
          id: 'pressure', 
          position: [1.5, 0.8, 0.2] as [number, number, number], 
          label: 'Pressure System', 
          description: 'Advanced 3 ATA pressure control for optimal therapy',
          trigger: 0.15, 
          color: '#3b82f6', 
          intensity: 1.0 
        },
        { 
          id: 'control', 
          position: [-1.0, 0.5, 0.5] as [number, number, number], 
          label: 'Digital Control Panel', 
          description: 'Microprocessor-controlled therapy settings and monitoring',
          trigger: 0.35, 
          color: '#10b981', 
          intensity: 0.8 
        },
        { 
          id: 'safety', 
          position: [0.8, -0.3, -0.8] as [number, number, number], 
          label: 'Safety Systems', 
          description: 'Multiple redundant safety features for patient protection',
          trigger: 0.55, 
          color: '#8b5cf6', 
          intensity: 0.9 
        },
        { 
          id: 'chamber', 
          position: [0, -0.5, 1.2] as [number, number, number], 
          label: 'Medical Grade Chamber', 
          description: 'FDA approved therapeutic chamber with premium materials',
          trigger: 0.75, 
          color: '#fbbf24', 
          intensity: 1.1 
        }
      ];
    } else if (deviceName.includes('CRYO')) {
      return [
        { 
          id: 'temperature', 
          position: [1.2, 1.0, 0.2] as [number, number, number], 
          label: 'Ultra-Low Temperature', 
          description: 'Reaches -140°C/-220°F for maximum therapeutic effect',
          trigger: 0.15, 
          color: '#06b6d4', 
          intensity: 1.0 
        },
        { 
          id: 'breathable', 
          position: [-1.0, 0.8, 0.3] as [number, number, number], 
          label: 'Breathable Air System', 
          description: 'Safe breathable air technology, no nitrogen contact',
          trigger: 0.35, 
          color: '#10b981', 
          intensity: 0.8 
        },
        { 
          id: 'smart', 
          position: [0.8, -0.2, -0.6] as [number, number, number], 
          label: 'Smart Technology', 
          description: 'Wi-Fi connectivity with remote monitoring and assistance',
          trigger: 0.55, 
          color: '#8b5cf6', 
          intensity: 0.9 
        },
        { 
          id: 'chamber', 
          position: [0, -0.8, 1.0] as [number, number, number], 
          label: 'Premium Chamber', 
          description: 'Luxurious interior with sound system and adjustable window',
          trigger: 0.75, 
          color: '#f59e0b', 
          intensity: 1.1 
        }
      ];
    } else {
      return [
        { 
          id: 'leds', 
          position: [1.2, 0.6, 0] as [number, number, number], 
          label: 'Red Light Array', 
          description: 'High-power medical-grade LED array for optimal therapy',
          trigger: 0.15, 
          color: '#f87171', 
          intensity: 1.0 
        },
        { 
          id: 'control', 
          position: [-1.2, 0.3, 0.3] as [number, number, number], 
          label: 'Digital Control Panel', 
          description: 'Intuitive touchscreen interface with preset protocols',
          trigger: 0.35, 
          color: '#60a5fa', 
          intensity: 0.8 
        },
        { 
          id: 'coverage', 
          position: [0, 1.0, -0.5] as [number, number, number], 
          label: 'Full Body Coverage', 
          description: 'Complete therapeutic light exposure for maximum benefits',
          trigger: 0.55, 
          color: '#a78bfa', 
          intensity: 0.9 
        },
        { 
          id: 'collagen', 
          position: [0, -0.8, 0.8] as [number, number, number], 
          label: 'Collagen Stimulation', 
          description: 'Targeted wavelengths for optimal collagen production',
          trigger: 0.75, 
          color: '#fbbf24', 
          intensity: 1.1 
        }
      ];
    }
  }, [deviceName]);

  // Update scroll data when scrollProgress changes
  useEffect(() => {
    setScrollData(prev => ({
      ...prev,
      progress: scrollProgress
    }));
    
    // Determine active feature based on scroll progress
    const currentFeature = features.find((feature, index) => {
      const nextFeature = features[index + 1];
      return scrollProgress >= feature.trigger && (!nextFeature || scrollProgress < nextFeature.trigger);
    });
    
    setActiveFeature(currentFeature || null);
  }, [scrollProgress, features]);

  // Show fallback image while mounting or if no model URL
  if (!isMounted || !modelUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img 
          src={fallbackImage} 
          alt={deviceName}
          className="max-w-full max-h-full object-contain filter drop-shadow-2xl"
          animate={{
            scale: [1, 1.05, 1],
            rotateY: scrollProgress * 360,
          }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 0.1 }
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {/* Fallback image for when 3D fails */}
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.img 
            src={fallbackImage} 
            alt={deviceName}
            className="max-w-full max-h-full object-contain filter drop-shadow-2xl opacity-30"
            animate={{
              scale: [1, 1.05, 1],
              rotateY: scrollProgress * 360,
            }}
            transition={{
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 0.1 }
            }}
          />
        </div>
      )}
      <Canvas
        camera={{ 
          position: [0, 0, 4.5],
          fov: isMobile ? 70 : 55, // Wider FOV on mobile
          near: 0.1,
          far: 100
        }}
        shadows={!isMobile} // Disable shadows on mobile completely
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: true,
          powerPreference: isMobile ? "default" : "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.6
        }}
        dpr={isMobile ? 1 : [1, 2]} // Fixed DPR on mobile
        style={{ background: 'transparent' }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0);
          if (!isMobile) {
            state.gl.shadowMap.enabled = true;
            state.gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }
        }}
      >
        <Suspense fallback={
          <mesh>
            <octahedronGeometry args={[1, 2]} />
            <meshStandardMaterial 
              color="#334155" 
              wireframe 
              transparent 
              opacity={0.5}
            />
          </mesh>
        }>
          {/* Simplified lighting on mobile */}
          {isMobile ? (
            <>
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={0.5} />
            </>
          ) : (
            <PremiumLighting scrollData={scrollData} />
          )}
          
          {/* Medical Device Model with mobile optimization */}
          <MedicalDeviceModel 
            url={modelUrl}
            scale={
              isMobile 
                ? (deviceName.includes('Hyperbaric') ? 0.8 : deviceName.includes('CRYO') ? 0.9 : 1.0) // Even smaller on mobile
                : (deviceName.includes('Hyperbaric') ? 1.3 : deviceName.includes('CRYO') ? 1.4 : 1.5)
            }
            position={[0, isMobile ? -0.1 : -0.3, 0]}
            scrollData={scrollData}
            features={features}
            deviceName={deviceName}
          />
          
          {/* Simplified shadows on mobile */}
          {!isMobile && (
            <ContactShadows 
              position={[0, -3, 0]} 
              opacity={0.6} 
              scale={30} 
              blur={8} 
              far={20}
              color="#000000"
              smooth
            />
          )}
          
          {/* Environment with mobile fallback */}
          <Environment preset={isMobile ? "city" : "studio"} background={false} />
          
        </Suspense>
      </Canvas>
      
      {/* Loading indicator */}
      {!isModelLoaded && (
        <motion.div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: isMobile ? 3 : 2, duration: 1 }} // Longer delay on mobile
          onAnimationComplete={() => setIsModelLoaded(true)}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-xs md:text-sm">
              {isMobile ? 'Loading 3D Model...' : 'Loading 3D Model...'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MedicalDevice3D; 