'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function DeviceRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we're on the homepage and not already on mobile page
    if (pathname === '/' || pathname === '') {
      const isMobile = () => {
        if (typeof window === 'undefined') return false;
        
        // Check user agent for mobile devices
        const userAgentMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Check screen size
        const screenSizeMobile = window.innerWidth <= 768;
        
        // Check for touch capability
        const hasTouchCapability = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        return userAgentMobile || (screenSizeMobile && hasTouchCapability);
      };

      // Small delay to ensure client-side hydration
      const timer = setTimeout(() => {
        if (isMobile()) {
          router.push('/mobile');
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname, router]);

  return null; // This component doesn't render anything
} 