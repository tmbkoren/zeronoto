import { Authenticator } from 'remix-auth';
import { sessionStorage } from '~/services/session.server';
import { prisma } from './prisma.server';

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session

import { GoogleStrategy } from 'remix-auth-google';
import { User } from '~/types/types';

export let authenticator = new Authenticator<User>(sessionStorage);

let callbackUrl = 'http://localhost:3000/auth/google/callback';

if (process.env.NODE_ENV === 'production') {
  callbackUrl = 'https://zeronoto.vercel.app/auth/google/callback';
}

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
    callbackURL: callbackUrl,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value });
    console.log('profile', profile);
    let user = await prisma.user.findFirst({
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

//@ts-ignore
authenticator.use(googleStrategy);
