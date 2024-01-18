import { Note, NoteCardDisplayProps } from '~/types/types';
import { prisma } from './prisma.server';

export const getNotesById = async (id: string): Promise<Note[]> => {
  const notes: Note[] = await prisma.note.findMany({
    where: {
      userId: id,
    },
  });
  //console.log(notes);
  //@ts-ignore
  return { notes };
};

export const createNote = async (
  userId: string,
  title: string,
  content: string
) => {
  const newNote = await prisma.note.create({
    data: {
      title,
      content,
      completed: false,
      pinned: false,
      userId,
    },
  });
};

export const editNoteById = async (id: string, note: Note) => {
  console.log('editingNote ', id, note);
  const newNote = prisma.note.update({
    where: {
      id,
    },
    data: {
      title: note.title,
      content: note.content,
      completed: note.completed,
      pinned: note.pinned,
      color: note.color,
    },
  });
  return newNote;
};

export const deleteNoteById = async (id: string) => {
  await prisma.note.delete({
    where: {
      id,
    },
  });
};
