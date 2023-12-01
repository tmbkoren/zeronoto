import { Button, useColorMode } from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
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
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <NoteCard
        title='Hello'
        content='World'
        color='teal'
      />
    </div>
  );
}
