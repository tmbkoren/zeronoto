import { json } from '@remix-run/node';
import { prisma } from './prisma.server';
import { Note, User } from '~/types/types';

export const createTempUser = async () => {
  const user = await prisma.user.create({
    data: {
      isRegistred: false,
    },
  });
  return user;
};
