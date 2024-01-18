import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { deleteNoteById } from "~/services/note.server";

export let loader = async ({ params }: LoaderFunctionArgs) => {
    console.log('deletingNote ', params)
    await deleteNoteById(params.id);
    return redirect('/');
};
