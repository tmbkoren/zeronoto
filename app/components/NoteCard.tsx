import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  GridItem,
  Grid,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import {
  RiPaletteFill,
  RiPaletteLine,
  RiDeleteBin6Line,
  RiDeleteBin6Fill,
  RiPushpinFill,
  RiPushpinLine,
  RiBlurOffLine,
} from 'react-icons/ri';

import { NoteCardProps } from '~/types/types';

const colors = [
  'red.400',
  'blue.400',
  'green.500',
  'teal',
  'purple.500',
  'pink.500',
  'orange.500',
  'gray',
];

const NoteCard: React.FC<NoteCardProps> = ({ editNote, deleteNote, data }) => {
  const [note, setNote] = useState(data);
  let { title, content, id, createdAt, completed, pinned, color } = note;
  const [isHovering, setIsHovering] = useState(false);
  const [isPinned, setIsPinned] = useState(pinned);
  const [backgroundColor, setBackgroundColor] = useState(color);

  const handleDelete = () => {
    deleteNote(id);
  };

  const handlePinned = () => {
    editNote(id, {
      title,
      content,
      id,
      createdAt,
      completed,
      pinned: !isPinned,
      color: backgroundColor,
    });
    setIsPinned(!isPinned);
  };

  const handleBackgrounChange = (color: string) => {
    editNote(id, {
      title,
      content,
      id,
      createdAt,
      completed,
      pinned: isPinned,
      color,
    });
    setBackgroundColor(color);
  };

  return (
    <GridItem>
      <Card
        bg={backgroundColor || 'default'}
        border={
          backgroundColor == 'transparent'
            ? '1px solid gray'
            : '1px solid transparent'
        }
        borderRadius={'lg'}
        m={3}
        pl={3}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <CardHeader pb={0}>
          <Flex
            justify={'space-between'}
            width={'100%'}
          >
            <Heading
              fontSize='xl'
              fontWeight='bold'
              overflowWrap={'anywhere'}
            >
              {title || null}
            </Heading>

            {isPinned ? (
              <IconButton
                isRound={true}
                aria-label='Unpin note'
                bg='transparent'
                onClick={() => handlePinned()}
                icon={<RiPushpinFill />}
              />
            ) : (
              <IconButton
                isRound={true}
                aria-label='Pin note'
                bg='transparent'
                onClick={() => handlePinned()}
                color={isHovering ? 'white' : 'transparent'}
                icon={<RiPushpinLine />}
              />
            )}
          </Flex>
        </CardHeader>

        <CardBody>
          <Text>{content}</Text>
        </CardBody>
        <CardFooter>
          <Flex
            justify={'space-between'}
            width={'100%'}
          >
            <Menu closeOnSelect={false}>
              <MenuButton
                isRound={true}
                as={IconButton}
                aria-label='Select background color'
                bg='transparent'
                color={isHovering ? 'white' : 'transparent'}
                icon={<RiPaletteLine />}
              />
              <MenuList
                p={2}
                width={'fit-content'}
              >
                <Flex
                  dir='row'
                  gap={2}
                >
                  {colors.map((color) => {
                    return (
                      <MenuItem
                        w={4}
                        bg={color}
                        key={color}
                        borderRadius={'100%'}
                        border={`2px solid ${
                          backgroundColor == color ? 'white' : 'transparent'
                        }`}
                        onClick={() => handleBackgrounChange(color)}
                        _hover={{
                          border: '2px solid white',
                        }}
                      >
                        <Box
                          h={3}
                          w={3}
                        />
                      </MenuItem>
                    );
                  })}
                </Flex>
              </MenuList>
            </Menu>
            <IconButton
              isRound={true}
              aria-label='Delete note'
              bg='transparent'
              onClick={() => handleDelete()}
              color={isHovering ? 'white' : 'transparent'}
              icon={<RiDeleteBin6Line />}
            />
          </Flex>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

export default NoteCard;
