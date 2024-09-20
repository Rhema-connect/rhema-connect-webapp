import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the country from the request headers
  const country = request.geo?.country || '';

  console.log(request);

  // Check if the country is US
  if (country === 'US') {
    // Redirect to Google if the request is from the US
    return NextResponse.redirect('https://www.google.com');
  }

  // For all other countries, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};