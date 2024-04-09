import { prisma } from './prisma.server';

export const transferNotes = async (localId: string, userId: string) => {
  const updateNotes = await prisma.note.updateMany({
    where: {
      userId: localId,
    },
    data: {
      userId: userId,
    },
  });
  await prisma.user.delete({
    where: {
      id: localId,
    },
  });
};
