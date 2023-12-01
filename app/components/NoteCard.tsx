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
import { useState } from 'react';

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
};

const colors = ['red', 'blue', 'green', 'teal', 'purple', 'pink'];

const NoteCard: React.FC<NoteCardProps> = ({
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
    console.log('delete');
  };

  const handleBackgrounChange = (color: string) => {
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
              aria-label='Unpin note'
              bg='transparent'
              onClick={() => setPinned(false)}
              icon={<RiPushpinFill />}
            />
          ) : (
            <IconButton
              aria-label='Pin note'
              bg='transparent'
              onClick={() => setPinned(true)}
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
