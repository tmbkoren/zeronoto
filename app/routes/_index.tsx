import { Button, useColorMode } from '@chakra-ui/react';
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { Form, Link, useLoaderData, useOutletContext } from '@remix-run/react';
import CreateNoteForm from '~/components/CreateNoteForm';
import NoteCardDisplay from '~/components/NoteCardDisplay';
import { authenticator } from '~/services/auth.server';
import { Note, NoteCardDisplayProps, User } from '~/types/types';
import { getNotesById } from '~/services/note.server';

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
  let data: Note[] = [];
  if (user) {
    data = await getNotesById(user.id);
    userId = user.id;
  }
  return json({ userId, data });
}

export default function Index() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userId, data } = useLoaderData<NoteCardDisplayProps>();
  //console.log(userId, data);

  //const [data, editNoteById, deleteNoteById] = useOutletContext();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      {userId ? (
        <>
          <CreateNoteForm userId={userId} />
          <NoteCardDisplay
            userId={userId}
            //@ts-ignore
            data={data.notes}
          />
        </>
      ) : null}
      {userId ? (
        <Form
          action='/logout'
          method='post'
        >
          <Button type='submit'>Logout</Button>
        </Form>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </div>
  );
}
