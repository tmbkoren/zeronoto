import { Note, NoteCardDisplayProps } from '~/types/types';
import NoteCard from './NoteCard';
import { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';

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
