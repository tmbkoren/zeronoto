import { Button, useColorMode } from '@chakra-ui/react';
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { Form, Link, useLoaderData, useOutletContext } from '@remix-run/react';
import CreateNoteForm from '~/components/CreateNoteForm';
import NoteCardDisplay from '~/components/NoteCardDisplay';
import { authenticator } from '~/services/auth.server';

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
  return user;
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: '/login' });
}

export default function Index() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useLoaderData();
  console.log(user);

  //const [data, editNoteById, deleteNoteById] = useOutletContext();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <CreateNoteForm />
      <NoteCardDisplay data={[]} />
      {user ? (
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
