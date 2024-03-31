import { Box, Button, Flex, useColorMode } from '@chakra-ui/react';
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import {
  Form,
  Link,
  useLoaderData,
  useMatches,
  useOutletContext,
  useRouteLoaderData,
} from '@remix-run/react';
import CreateNoteForm from '~/components/CreateNoteForm';
import NoteCardDisplay from '~/components/NoteCardDisplay';
import { authenticator } from '~/services/auth.server';
import { Note, NoteCardDisplayProps, User } from '~/types/types';
import { getNotesById } from '~/services/note.server';
import LoginOutButton from '~/components/LoginOutButton';
//@ts-ignore ???
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'ZeroNoto' },
    {
      name: 'description',
      content: 'Zeronoto - minimalistic note taking application.',
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  console.log('line 37 user:', user);
  let userId = null;
  if (user) {
    userId = user.id;
  }
  return json({ userId });
}

export default function Index() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userId } = useLoaderData<NoteCardDisplayProps>();
  const [uid, setUid] = useState<string | null>(userId);
  //@ts-ignore
  console.log('userId:', uid);

  const createTempUser = async () => {
    console.log('line 48 createTempUser');
    let tempUser = null;
    await fetch(`/createTempUser`)
      .then((res) => res.json())
      .then((data) => (tempUser = data));
    console.log('line 50 ', tempUser);
    setUid(tempUser.id);
  };

  useEffect(() => {
    if (!userId) {
      let temp = window.localStorage.getItem('userId');
      console.log('getting local storage', temp);
      if (!temp) {
        createTempUser();
      } else {
        setUid(temp);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('userId', uid);
  }, [uid]);

  return (
    <Box
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
      padding={5}
    >
      {uid ? (
        <Flex
          direction={'column'}
          justify={'center'}
          align={'center'}
          gap={5}
        >
          <CreateNoteForm userId={userId || uid} />
          <NoteCardDisplay
            userId={uid}
            //@ts-ignore
          />
        </Flex>
      ) : null}
      {userId ? (
        <LoginOutButton action={'logout'} />
      ) : (
        <LoginOutButton action={'login'} />
      )}
    </Box>
  );
}
