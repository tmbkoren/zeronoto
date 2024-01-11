import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export let loader = () => redirect('/login');

export let action = ({ request }: ActionFunctionArgs) => {
  console.log('logging out');
  return authenticator.logout(request, { redirectTo: '/' })
};
