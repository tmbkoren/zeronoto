import { Box, Flex } from '@chakra-ui/react';
import { Form } from '@remix-run/react';

export default function Login() {
  return (
    <Form>
      <Flex
        justify={'center'}
        align={'center'}
        height={'100vh'}
      >
        Login
      </Flex>
    </Form>
  );
}
