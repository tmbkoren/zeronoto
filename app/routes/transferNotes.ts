import { ActionFunctionArgs } from '@remix-run/node';
import { transferNotes } from '~/services/transferNotes.server';

export let action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  transferNotes(data.localId, data.userId);
  return null;
};
