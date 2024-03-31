import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export let loader = () => redirect('/');

export let action = async ({ request }: ActionFunctionArgs) => {
  console.log('logging out');
  return authenticator.logout(request, { redirectTo: '/login' })
};
