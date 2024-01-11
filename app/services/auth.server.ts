import { Authenticator } from 'remix-auth';
import { sessionStorage } from '~/services/session.server';
import { prisma } from './prisma.server';
import { json } from '@remix-run/node';

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

import { GoogleStrategy } from 'remix-auth-google';

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value });
    console.log('profile', profile);
    let user = await prisma.user.findUnique({
      where: {
        email: profile.emails[0].value,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          isRegistred: true,
          email: profile.emails[0].value,
        },
      });
    }

    return user;
  }
);

authenticator.use(googleStrategy);
