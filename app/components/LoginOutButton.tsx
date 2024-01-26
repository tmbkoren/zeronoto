import { Button, IconButton } from '@chakra-ui/react';
import { LoginOutButtonProps } from '~/types/types';
import {
  RiLoginBoxLine,
  RiLogoutBoxFill,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { Form } from '@remix-run/react';

const LoginOutButton: React.FC<LoginOutButtonProps> = ({ action }) => {
  return (
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
  );
};

export default LoginOutButton;
