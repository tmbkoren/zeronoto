import { Note, NoteCardDisplayProps } from '~/types/types';
import NoteCard from './NoteCard';
import { useEffect, useState } from 'react';

const NoteCardDisplay: React.FC<NoteCardDisplayProps> = ({ userId, data }) => {
  const [notes, setNotes] = useState(data);
  //console.log('displaying: ', data);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const editNote = async (id: string, note: Note) => {
    await fetch(`/editNote/`, {
      method: 'POST',
      body: JSON.stringify(note),
    });
  };

  const deleteNote = async (id: string) => {
    const newNotes = notes.filter((item) => item.id !== id);
    setNotes(newNotes);
    await fetch(`/deleteNote/${id}`);
  };

  return (
    <>
      {notes
        .filter((item) => item.pinned)
        .map((item) => {
          return (
            <NoteCard
              key={item.id}
              data={item}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          );
        })}
      {notes
        .filter((item) => !item.pinned)
        .map((item) => {
          return (
            <NoteCard
              key={item.id}
              data={item}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          );
        })}
    </>
  );
};

export default NoteCardDisplay;
