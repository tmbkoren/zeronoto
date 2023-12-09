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

type NoteCardProps = {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  isCompleted: boolean;
  isPinned: boolean;
  color: undefined | string;
  edit: (id: string, note: any) => void;
  deleteNote: (id: string) => void;
};

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

const NoteCard: React.FC<NoteCardProps> = ({
  edit,
  deleteNote,
  title,
  content,
  id,
  createdAt,
  isCompleted,
  isPinned = false,
  color = undefined,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [pinned, setPinned] = useState(isPinned);
  const [backgroundColor, setBackgroundColor] = useState(color);

  const handleDelete = () => {
    deleteNote(id);
  };

  const handlePinned = () => {
    edit(id, {
      title,
      content,
      id,
      createdAt,
      isCompleted,
      isPinned: !pinned,
      color,
    });
    setPinned(!pinned);
  };

  const handleBackgrounChange = (color: string) => {
    edit(id, {
      title,
      content,
      id,
      createdAt,
      isCompleted,
      isPinned,
      color,
    });
    setBackgroundColor(color);
  };

  return (
    <Card
      minW='sm'
      maxW='fit-content'
      size='sm'
      bg={backgroundColor}
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
          {title ? (
            <Text
              fontSize='xl'
              fontWeight='bold'
            >
              {title}
            </Text>
          ) : null}
          {pinned ? (
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
                {/* <MenuItem
                  p={0}
                  w={7}
                  bg={'transparent'}
                  borderRadius={'100%'}
                  border={'2px solid transparent'}
                  _hover={{
                    border: '2px solid white',
                  }}
                  onClick={() => handleBackgrounChange('transparent')}
                  icon={
                    <Icon
                      boxSize={6}
                      as={RiBlurOffLine}
                    />
                  }
                /> */}
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
  );
};

export default NoteCard;
