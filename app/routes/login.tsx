import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import ClipboardText from '~/components/ClipboardText';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  return user;
}

export default function Login() {
  const user = useLoaderData();

  const getUid = () => {
    try {
      return window.localStorage.getItem('userId');
    } catch (error) {
      console.log('error:', error);
      return 'loading...';
    }
  };

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
          To keep your notes after logging in, click on your id to copy it and
          paste it after logging it :
        </Text>
        <ClipboardText text={getUid()} />
      </Flex>
    </Form>
  );
}
