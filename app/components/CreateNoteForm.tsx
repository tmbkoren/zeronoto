import { Box, Button, Collapse, Flex, Input, Textarea } from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import { useState } from 'react';

const CreateNoteForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Form
      method='post'
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
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
            <Button>Cancel</Button>
            <Button type='submit'>Done</Button>
          </Flex>
        </Collapse>
      </Flex>
    </Form>
  );
};

export default CreateNoteForm;
