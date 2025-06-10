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

// Browser detection utility
const isSafari = () => {
  if (typeof window === 'undefined') return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

const isWebGLAvailable = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(context && typeof (context as WebGLRenderingContext).getExtension === 'function');
  } catch (e) {
    return false;
  }
};

interface MedicalDeviceModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  scrollData: ScrollData;
  deviceName: string;
}

// Enhanced 3D Model with Safari Compatibility
const MedicalDeviceModel: React.FC<MedicalDeviceModelProps> = ({ 
  url, 
  scale = 0.5,
  position = [0, 0, 0],
  scrollData,
  deviceName
}) => {
  const [modelError, setModelError] = useState(false);
  const meshRef = useRef<THREE.Group>(null);

  // Use useGLTF with error handling
  let gltf: any;
  try {
    gltf = useGLTF(url);
  } catch (error) {
    console.warn(`Failed to load 3D model: ${url}`, error);
    setModelError(true);
  }

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

  // If model failed to load, return a placeholder
  if (modelError || !gltf?.scene) {
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
    </group>
  );
};

// Safari-optimized Lighting System
const SafariLighting: React.FC<{ scrollData: ScrollData }> = ({ scrollData }) => {
  return (
    <>
      {/* Simplified environment for Safari */}
      <Environment background={false}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#1e293b" side={THREE.BackSide} />
        </mesh>
      </Environment>
      
      {/* Simplified directional light */}
      <directionalLight
        position={[5, 8, 5]}
        color="#ffffff"
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Minimal ambient lighting */}
      <ambientLight intensity={0.4} color="#f8fafc" />
      
      {/* Single accent light */}
      <pointLight 
        position={[10, 6, 10]} 
        intensity={0.2}
        color="#4f46e5" 
        distance={30}
      />
    </>
  );
};

// Enhanced Lighting System for Premium Look
const PremiumLighting: React.FC<{ scrollData: ScrollData }> = ({ scrollData }) => {
  return (
    <>
      {/* Simple environment without HDR files */}
      <Environment background={false}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color="#1e293b" side={THREE.BackSide} />
        </mesh>
      </Environment>
      
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
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [browserIsSafari, setBrowserIsSafari] = useState(false);
  const lastScrollY = useRef(0);

  // Client-side mounting check
  useEffect(() => {
    setIsMounted(true);
    setWebGLSupported(isWebGLAvailable());
    setBrowserIsSafari(isSafari());
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

  // Update scroll data when scrollProgress changes
  useEffect(() => {
    setScrollData(prev => ({
      ...prev,
      progress: scrollProgress
    }));
  }, [scrollProgress]);

  // Show fallback image if WebGL is not supported or while mounting
  if (!isMounted || !webGLSupported || !modelUrl) {
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
        shadows={!isMobile && !browserIsSafari} // Disable shadows on mobile and Safari
        gl={{ 
          antialias: !isMobile && !browserIsSafari, // Disable antialiasing on mobile and Safari
          alpha: true,
          powerPreference: (isMobile || browserIsSafari) ? "default" : "high-performance",
          preserveDrawingBuffer: browserIsSafari, // Important for Safari
          failIfMajorPerformanceCaveat: false, // Allow Safari to use software rendering if needed
          toneMapping: browserIsSafari ? THREE.LinearToneMapping : THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.6
        }}
        dpr={(isMobile || browserIsSafari) ? 1 : [1, 2]} // Fixed DPR on mobile and Safari
        style={{ background: 'transparent' }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0);
          if (!isMobile && !browserIsSafari) {
            state.gl.shadowMap.enabled = true;
            state.gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }
          // Safari-specific optimizations
          if (browserIsSafari) {
            const gl = state.gl.getContext() as WebGLRenderingContext;
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.DEPTH_TEST);
          }
        }}
        onError={(error) => {
          console.warn('WebGL Error:', error);
          setIsModelLoaded(false);
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
          {/* Conditional lighting based on browser and device */}
          {(isMobile || browserIsSafari) ? (
            <SafariLighting scrollData={scrollData} />
          ) : (
            <PremiumLighting scrollData={scrollData} />
          )}
          
          {/* Medical Device Model with mobile and Safari optimization */}
          <MedicalDeviceModel 
            url={modelUrl}
            scale={
              (isMobile || browserIsSafari)
                ? (deviceName.includes('Hyperbaric') ? 0.8 : deviceName.includes('CRYO') ? 0.9 : 1.0)
                : (deviceName.includes('Hyperbaric') ? 1.3 : deviceName.includes('CRYO') ? 1.4 : 1.5)
            }
            position={[0, (isMobile || browserIsSafari) ? -0.1 : -0.3, 0]}
            scrollData={scrollData}
            deviceName={deviceName}
          />
          
          {/* Simplified shadows on mobile and Safari */}
          {!isMobile && !browserIsSafari && (
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
          
          {/* Environment with Safari fallback */}
          <Environment 
            preset={(isMobile || browserIsSafari) ? "city" : "studio"} 
            background={false} 
            environmentIntensity={browserIsSafari ? 0.5 : 1.0}
          />
          
        </Suspense>
      </Canvas>
      
      {/* Loading indicator with browser-specific messaging */}
      {!isModelLoaded && (
        <motion.div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: (isMobile || browserIsSafari) ? 4 : 2, duration: 1 }}
          onAnimationComplete={() => setIsModelLoaded(true)}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-xs md:text-sm">
              {browserIsSafari ? 'Optimizing for Safari...' : 
               isMobile ? 'Loading 3D Model...' : 'Loading 3D Model...'}
            </p>
            {!webGLSupported && (
              <p className="text-yellow-400 text-xs mt-2">
                WebGL not supported - showing fallback
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MedicalDevice3D; 