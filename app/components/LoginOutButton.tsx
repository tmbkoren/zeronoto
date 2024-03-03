import { Box, Button, FormControl, IconButton } from '@chakra-ui/react';
import { LoginOutButtonProps } from '~/types/types';
import {
  RiLoginBoxLine,
  RiLogoutBoxFill,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { Form } from '@remix-run/react';

const LoginOutButton: React.FC<LoginOutButtonProps> = ({ action }) => {
  return (
    <Box
      pos='fixed'
      top={3}
      right={3}
    >
      <Form
        action={`/${action}`}
        method={action === 'logout' ? 'post' : 'get'}
      >
        <IconButton
          type='submit'
          aria-label={action}
          isRound={true}
          icon={action === 'login' ? <RiLoginBoxLine /> : <RiLogoutBoxFill />}
        />
      </Form>
    </Box>
  );
};

export default LoginOutButton;
