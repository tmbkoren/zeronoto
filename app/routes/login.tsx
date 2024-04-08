import { Button, Flex, Text } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { LoaderFunctionArgs } from '@remix-run/node';
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
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={5}
      >
        <Button type='submit'>{user ? 'Logout' : 'Login with Google'}</Button>
        <ChakraLink
          as={Link}
          to='/'
        >
          Proceed without logging in
        </ChakraLink>
        <Text>
          Your local notes will automatically transfer to your account when you
          log in.
        </Text>
      </Flex>
    </Form>
  );
}
