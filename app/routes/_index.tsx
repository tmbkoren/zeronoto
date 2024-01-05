import { Button, useColorMode } from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
import { useOutletContext } from '@remix-run/react';
import CreateNoteForm from '~/components/CreateNoteForm';
import NoteCardDisplay from '~/components/NoteCardDisplay';

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
  //const [data, editNoteById, deleteNoteById] = useOutletContext();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <CreateNoteForm />
      <NoteCardDisplay data={[]} />
    </div>
  );
}
