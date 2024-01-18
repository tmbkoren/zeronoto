import { Box, Button, Collapse, Flex, Input, Textarea } from '@chakra-ui/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { Form, useActionData, useFetcher } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { CreateNoteFormProps } from '~/types/types';

export let action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = String(formData.get('title'));
  const content = String(formData.get('content'));
  const userId = String(formData.get('userId'));
  console.log('creating note', userId, title, content);
  await fetch('/createNote', {
    method: 'post',
    body: JSON.stringify({ title, content, userId }),
  });

  return null;
};

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ userId }) => {
  const [isFocused, setIsFocused] = useState(false);
  const form = useRef(null);
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.ok) {
      form.current?.reset();
    }
  }, [actionData]);

  const clearForm = () => {
    //@ts-ignore
    form.current?.reset();
    setIsFocused(false);
  };

  return (
    <Form
      //action='/createNote'
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
    </Form>
  );
};

export default CreateNoteForm;
