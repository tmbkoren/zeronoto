import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { createNote } from '~/services/note.server';

export let loader = () => redirect('/');

export let action = async ({ request }: ActionFunctionArgs) => {
  const data = request.json();
  console.log('creating note', data);
  //await createNote(user.id, title, content);

  return redirect('/');
};
