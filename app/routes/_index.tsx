import { Button, useColorMode } from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
import { useOutletContext } from '@remix-run/react';
import NoteCard from '~/components/NoteCard';

export const meta: MetaFunction = () => {
  return [
    { title: 'ZeroNoto' },
    {
      name: 'description',
      content: 'Zeronoto - minimalistic note taking application.',
    },
  ];
};

export default function Index() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [data, editNoteById, deleteNoteById] = useOutletContext();
  console.log(data);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      {data.map((note) => (
        <NoteCard
          deleteNote={deleteNoteById}
          edit={editNoteById}
          title={note.title}
          content={note.content}
          id={note.id}
          key={note.id}
          createdAt={note.createdAt}
          isCompleted={note.isCompleted}
          isPinned={note.isPinned}
          color={note.color}
        />
      ))}
    </div>
  );
}
