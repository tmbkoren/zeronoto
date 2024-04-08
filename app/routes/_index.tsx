import { Box, Button, Flex, useColorMode } from '@chakra-ui/react';
import {
  json,
  redirect,
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
  const [refetch, setRefetch] = useState<boolean>(true);
  //@ts-ignore

  const createTempUser = async () => {
    let tempUser = null;
    await fetch(`/createTempUser`)
      .then((res) => res.json())
      .then((data) => (tempUser = data));
    // @ts-ignore
    setUid(tempUser.id);
  };

  useEffect(() => {
    let temp = window.localStorage.getItem('userId');
    if (!userId) {
      if (!temp) {
        createTempUser();
      } else {
        setUid(temp);
      }
    } else if (temp) {
      // importing local notes and clearing local storage
      fetch(`/transferNotes`, {
        method: 'POST',
        body: JSON.stringify({ localId: temp, userId: userId }),
      });
      window.localStorage.removeItem('userId');
      location.reload();
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      window.localStorage.setItem('userId', uid || '');
    }
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
          <CreateNoteForm
            userId={userId || uid}
            setRefetch={setRefetch}
          />
          <NoteCardDisplay
            userId={uid}
            refetch={refetch}
            setRefetch={setRefetch}
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
