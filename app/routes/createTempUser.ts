import { createTempUser } from '~/services/createTempUser.server';
import { json } from '@remix-run/node';

export let loader = async () => {
  const tempUser = await createTempUser();
  return json(tempUser);
};
