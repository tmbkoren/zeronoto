import { ActionFunctionArgs } from '@remix-run/node';
import { editNoteById } from '~/services/note.server';

export let action = async ({ request }: ActionFunctionArgs) => {
    const note = await request.json();
    return await editNoteById(note.id, note);
};
