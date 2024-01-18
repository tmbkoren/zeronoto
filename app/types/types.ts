export type Note = {
  title: string | null;
  content: string;
  id: string;
  createdAt: Date;
  completed: boolean;
  pinned: boolean;
  color: null | string;
};

export type NoteCardProps = {
  data: Note;
  editNote: (id: string, note: any) => void;
  deleteNote: (id: string) => void;
};

export type NoteCardDisplayProps = {
  userId: string;
  data: Note[];
};

export type User = {
  isRegistered: boolean;
  id: string;
  email?: string;
  notes?: Note[];
};

export type CreateNoteFormProps = {
  userId: string;
};
