import { Box, Button, Flex } from '@chakra-ui/react';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  return user;
}

export default function Login() {
  const user = useLoaderData();
  return (
    <Form
      action={user ? '/logout' : '/auth/google'}
      method='post'
    >
      <Button type='submit'>{user ? 'Logout' : 'Login with Google'}</Button>
      <Link to='/'>Proceed without loggin in</Link>
    </Form>
  );
}
