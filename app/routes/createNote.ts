import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { createNote } from '~/services/note.server';

export let loader = () => redirect('/');

export let action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = String(formData.get('title'));
  const content = String(formData.get('content'));
  const userId = String(formData.get('userId'));
  console.log('creating note for user', userId, title, content);
  await createNote(userId, title, content);

  return redirect('/');
};
