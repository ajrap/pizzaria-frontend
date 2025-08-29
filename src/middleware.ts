import { NextRequest, NextResponse } from 'next/server';
import { getCookieServer } from '@/lib/cookieServer';
import { api } from "@/services/api";


export async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;

    console.log('Middleware triggered');

    // Allow requests to static files and the root path
    // This is important to avoid blocking Next.js static assets and the home page
    if (pathname.startsWith('/_next') || pathname === "/") {
        console.log('Static file or root path, skipping middleware');
        return NextResponse.next();
    }

    const token = await getCookieServer();
    console.log('Token:', token);

    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Validate the token
        const isValid = await validateToken(token);
        console.log('Token is valid:', isValid);

        if (!isValid) {
            return NextResponse.redirect(new URL('/', req.url));
        }

    }



    return NextResponse.next();




    // return NextResponse.next();

}


async function validateToken(token: string) {
    if (!token) return false;
    try {
        await api.get('/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return true;
    } catch (err) {
        console.error('Token validation error:', err);
        return false;

    }
}