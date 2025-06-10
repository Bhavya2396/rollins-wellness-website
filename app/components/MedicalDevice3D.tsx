'use client';

import React, { Suspense, useRef, useEffect, useState, useMemo, useCallback } from 'react';
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

// WebGL Context Manager
class WebGLContextManager {
  private static instance: WebGLContextManager;
  private activeContexts: Set<WebGLRenderingContext> = new Set();
  private maxContexts = 4; // Limit concurrent contexts

  static getInstance(): WebGLContextManager {
    if (!WebGLContextManager.instance) {
      WebGLContextManager.instance = new WebGLContextManager();
    }
    return WebGLContextManager.instance;
  }

  registerContext(gl: WebGLRenderingContext): boolean {
    if (this.activeContexts.size >= this.maxContexts) {
      console.warn('Maximum WebGL contexts reached, reusing existing context');
      return false;
    }
    this.activeContexts.add(gl);
    return true;
  }

  unregisterContext(gl: WebGLRenderingContext): void {
    this.activeContexts.delete(gl);
  }

  getActiveContextCount(): number {
    return this.activeContexts.size;
  }

  cleanup(): void {
    this.activeContexts.forEach(gl => {
      try {
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      } catch (e) {
        console.warn('Error during WebGL cleanup:', e);
      }
    });
    this.activeContexts.clear();
  }
}

interface MedicalDeviceModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  scrollData: ScrollData;
  deviceName: string;
}

// Enhanced 3D Model with Safari Compatibility and Context Management
const MedicalDeviceModel: React.FC<MedicalDeviceModelProps> = ({ 
  url, 
  scale = 0.5,
  position = [0, 0, 0],
  scrollData,
  deviceName
}) => {
  const [modelError, setModelError] = useState(false);
  const meshRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  // Use useGLTF hook at top level (cannot be conditional)
  const gltf = useGLTF(url);

  // Handle loading errors with useEffect
  useEffect(() => {
    if (!gltf || !gltf.scene) {
      setModelError(true);
    } else {
      setModelError(false);
    }
  }, [gltf]);

  // WebGL Context Loss Handler
  useEffect(() => {
    const canvas = gl.domElement;
    
    const handleContextLost = (event: Event) => {
      console.warn('WebGL context lost, preventing default behavior');
      event.preventDefault();
      setModelError(true);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      setModelError(false);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);

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
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Subtle rim lighting */}
      <directionalLight
        position={[-5, 4, -8]}
        color="#4f46e5"
        intensity={0.15}
      />
      
      {/* Sophisticated ambient */}
      <ambientLight intensity={0.3} color="#f1f5f9" />
      
      {/* Key light with scroll-responsive intensity */}
      <spotLight 
        position={[10, 10, 5]} 
        intensity={0.3 + scrollData.progress * 0.2}
        angle={Math.PI / 6}
        penumbra={0.5}
        color="#ffffff" 
        distance={50}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Fill light for depth */}
      <pointLight 
        position={[-8, 5, 8]} 
        intensity={0.12}
        color="#0ea5e9" 
        distance={40}
      />
      
      {/* Background accent */}
      <pointLight 
        position={[0, -5, -10]} 
        intensity={0.08}
        color="#8b5cf6" 
        distance={25}
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
  const [contextLost, setContextLost] = useState(false);
  const lastScrollY = useRef(0);
  const contextManager = useRef(WebGLContextManager.getInstance());

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup WebGL resources
      contextManager.current.cleanup();
    };
  }, []);

  // Canvas creation callback with context management
  const handleCanvasCreated = useCallback((state: any) => {
    const gl = state.gl.getContext() as WebGLRenderingContext;
    
    // Register context with manager
    const registered = contextManager.current.registerContext(gl);
    
    if (!registered) {
      console.warn('WebGL context limit reached, using fallback');
      setContextLost(true);
      return;
    }

    state.gl.setClearColor(0x000000, 0);
    
    if (!isMobile && !browserIsSafari) {
      state.gl.shadowMap.enabled = true;
      state.gl.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    // Safari-specific optimizations
    if (browserIsSafari) {
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.DEPTH_TEST);
    }

    // Context loss prevention
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
      setIsModelLoaded(false);
    };

    const handleContextRestored = () => {
      setContextLost(false);
      // Re-register context
      contextManager.current.registerContext(gl);
    };

    state.gl.domElement.addEventListener('webglcontextlost', handleContextLost);
    state.gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      contextManager.current.unregisterContext(gl);
      state.gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
      state.gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [isMobile, browserIsSafari]);

  // Error handler for WebGL issues
  const handleCanvasError = useCallback((error: any) => {
    console.warn('WebGL Error:', error);
    setContextLost(true);
    setIsModelLoaded(false);
  }, []);

  // Show fallback image if WebGL is not supported, context is lost, or while mounting
  if (!isMounted || !webGLSupported || !modelUrl || contextLost) {
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
        {contextLost && (
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-white/60 text-xs">WebGL context lost - showing fallback</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0">

      
      <Canvas
        camera={{ 
          position: [0, 0, isMobile ? 2.8 : 4.5],
          fov: isMobile ? 75 : 55,
          near: 0.1,
          far: 100
        }}
        shadows={!isMobile && !browserIsSafari}
        gl={{ 
          antialias: !isMobile && !browserIsSafari,
          alpha: true,
          powerPreference: (isMobile || browserIsSafari) ? "default" : "high-performance",
          preserveDrawingBuffer: browserIsSafari,
          failIfMajorPerformanceCaveat: false,
          toneMapping: browserIsSafari ? THREE.LinearToneMapping : THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.6,
          // Context management settings
          stencil: false,
          depth: true,
          premultipliedAlpha: false
        }}
        dpr={(isMobile || browserIsSafari) ? 1 : [1, 2]}
        style={{ background: 'transparent' }}
        onCreated={handleCanvasCreated}
        onError={handleCanvasError}
      >
        <Suspense fallback={null}>
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
                ? (deviceName.includes('Hyperbaric') ? 1.5 : deviceName.includes('CRYO') ? 1.3 : 1.7)
                : (deviceName.includes('Hyperbaric') ? 1.3 : deviceName.includes('CRYO') ? 1.4 : 1.5)
            }
            position={[0, (isMobile || browserIsSafari) ? 0 : -0.3, 0]}
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
      

    </div>
  );
};

export default MedicalDevice3D; 