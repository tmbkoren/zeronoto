import { json, createCookieSessionStorage } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET environment variable not set.');
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'zeronoto_session', // use any name you want here
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [sessionSecret], 
    secure: process.env.NODE_ENV === 'production', // enable this in prod only
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
});

// you can also export the methods individually for your own usage
export  { sessionStorage };
