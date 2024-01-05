export type NoteCard = {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  isCompleted: boolean;
  isPinned: boolean;
  color: undefined | string;
};

export type NoteCardProps = {
  data: NoteCard;
  edit: (id: string, note: any) => void;
  deleteNote: (id: string) => void;
};

export type NoteCardDisplayProps = {
  data: NoteCard[];
};

export type User = {
  isRegistered: boolean;
  uid: string;
  email?: string;
  notes?: NoteCard[];
}