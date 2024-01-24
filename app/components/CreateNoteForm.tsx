import { Box, Button, Collapse, Flex, Input, Textarea } from '@chakra-ui/react';
import { useFetcher } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { CreateNoteFormProps } from '~/types/types';

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ userId }) => {
  const [isFocused, setIsFocused] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();

  const clearForm = () => {
    //@ts-ignore
    form.current?.reset();
    setIsFocused(false);
  };

  useEffect(() => {
    if (fetcher.state === 'idle') {
      clearForm();
    }
  }, [fetcher.state]);

  return (
    <fetcher.Form
      action='/createNote'
      method='post'
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      ref={form}
    >
      <Flex
        maxW={{ base: '90vw', md: '80vw', lg: '50vw', xl: '40vw' }}
        direction='column'
        gap={2}
        padding={3}
        border={'1px solid rgba(115, 115, 115,0.1)'}
        borderRadius={10}
        boxShadow={'0 0 10px rgba(20, 20, 20, 1)'}
      >
        <Input
          type='hidden'
          name='userId'
          value={userId}
        />
        <Input
          type='text'
          name='title'
          placeholder='New note'
          style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
          border={'none'}
          focusBorderColor='transparent'
        />
        <Collapse in={isFocused}>
          <Textarea
            name='content'
            placeholder='Content'
            style={{ fontSize: '1.2rem' }}
            border={'none'}
            focusBorderColor='transparent'
            resize={'none'}
          />
          <Flex justify={'space-evenly'}>
            <Button onClick={clearForm}>Cancel</Button>
            <Button type='submit'>Done</Button>
          </Flex>
        </Collapse>
      </Flex>
    </fetcher.Form>
  );
};

export default CreateNoteForm;
