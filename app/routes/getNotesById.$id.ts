import { LoaderFunctionArgs, json } from '@remix-run/node';
import { getNotesById } from '~/services/note.server';

export async function loader({ params }: LoaderFunctionArgs) {
  let id = params.id;
  //@ts-ignore
  let data = await getNotesById(id);
  return json(data);
}
