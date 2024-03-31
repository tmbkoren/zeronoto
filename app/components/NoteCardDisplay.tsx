import { Note, NoteCardDisplayProps } from '~/types/types';
import NoteCard from './NoteCard';
import { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';

const NoteCardDisplay: React.FC<NoteCardDisplayProps> = ({ userId }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/getNotesById/${userId}`)
        .then((res) => res.json())
        .then((data) => (setNotes(data.notes), console.log('data:', data)));
      return res;
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (notes) {
      setNotes(notes);
    } else {
      setNotes([]);
    }
  }, [notes]);

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
    <Grid
      templateColumns={{
        sm: 'repeat(1, minmax(100px, 1fr))',
        md: 'repeat(3, minmax(200px, 1fr))',
        xl: 'repeat(4, minmax(300px, 1fr))',
      }}
      gap={3}
    >
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
    </Grid>
  );
};

export default NoteCardDisplay;
