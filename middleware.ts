import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.nextUrl.clone();
  
  // Mobile device detection patterns
  const mobilePatterns = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Opera Mini/i,
    /Mobile/i,
    /Tablet/i
  ];

  const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent));
  
  // If user is on homepage and using mobile device, redirect to mobile page
  if (url.pathname === '/' && isMobile) {
    url.pathname = '/mobile';
    return NextResponse.redirect(url);
  }
  
  // If user is on mobile page and using desktop, redirect to homepage
  if (url.pathname === '/mobile' && !isMobile) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/mobile']
}; 