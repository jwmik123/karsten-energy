"use client";

  import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq: any;
  }
}

interface MetaPixelProps {
  pixelId: string;
}

// Inner component that uses useSearchParams
function MetaPixelTracking({ pixelId }: MetaPixelProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize Meta Pixel
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.fbq && pixelId) {
      // Create script element
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      
      // Add noscript fallback
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      
      // Append to head
      document.head.appendChild(script);
      document.head.appendChild(noscript);
    }
  }, [pixelId]);

  // Track page views on route change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      console.log('[MetaPixel] Tracking PageView:', url);
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}

// Wrapper component with Suspense boundary
export default function MetaPixel({ pixelId }: MetaPixelProps) {
  return (
    <Suspense fallback={null}>
      <MetaPixelTracking pixelId={pixelId} />
    </Suspense>
  );
}

// Helper function to track custom events (can be called from anywhere)
export function trackEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    console.log('[MetaPixel] Tracking custom event:', eventName, data);
    window.fbq('track', eventName, data);
  } else {
    console.warn('[MetaPixel] fbq not initialized, unable to track event:', eventName);
  }
} 