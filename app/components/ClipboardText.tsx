import { Code, Flex, useClipboard } from '@chakra-ui/react';
import { ClipboardTextProps } from '~/types/types';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa6';

const ClipboardText: React.FC<ClipboardTextProps> = ({ text }) => {
  const { value, setValue, onCopy, hasCopied } = useClipboard(text || '');
  console.log('value:', value);
  return (
    <Code onClick={onCopy} >
      <Flex
        gap={2}
        align={'center'}
      >
        {text}
        {hasCopied ? <FaClipboardCheck /> : <FaClipboard />}
      </Flex>
    </Code>
  );
};

export default ClipboardText;
