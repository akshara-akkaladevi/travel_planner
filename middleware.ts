// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error fetching session:', error.message);
  }

  if (session?.user) {
    req.headers.set('user-id', session.user.id);
  } else {
    return NextResponse.redirect('/login');
  }

  return res;
}

export const config = {
  matcher: ['/api/trips'], // Add the API route you want to protect here
};
