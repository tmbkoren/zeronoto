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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import {
  RiPaletteFill,
  RiPaletteLine,
  RiDeleteBin6Line,
  RiDeleteBin6Fill,
  RiPushpinFill,
  RiPushpinLine,
  RiBlurOffLine,
} from 'react-icons/ri';
import TextareaAutosize from 'react-textarea-autosize';

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
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  let { title, content, id, createdAt, completed, pinned, color } = note;
  const [isHovering, setIsHovering] = useState(false);
  const [isPinned, setIsPinned] = useState(pinned);
  const [backgroundColor, setBackgroundColor] = useState(color);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

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

  const handleModalOpen = () => {
    setEditedTitle(title || '');
    setEditedContent(content);
    onOpen();
    console.log(editedTitle, editedContent);
  };

  const handleModalClose = () => {
    console.log('closing');
    editNote(id, {
      title: editedTitle || null,
      content: editedContent || content,
      id,
      createdAt,
      completed,
      pinned,
      color,
    });
    setNote({
      title: editedTitle || undefined,
      content: editedContent || content,
      id,
      createdAt,
      completed,
      pinned,
      color,
    });
    onClose();
  };

  const handleModalCancel = () => {
    onClose();
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
        {title ? (
          <>
            <CardHeader pb={0}>
              <Flex
                justify={'space-between'}
                align={'center'}
                width={'100%'}
              >
                <Heading
                  fontSize='xl'
                  fontWeight='bold'
                  overflowWrap={'anywhere'}
                  onClick={handleModalOpen}
                  cursor={'edit'}
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
              <Text onClick={handleModalOpen}>{content}</Text>
            </CardBody>
          </>
        ) : (
          <CardBody>
            <Flex
              justify={'space-between'}
              width={'100%'}
            >
              <Text
                overflowWrap={'anywhere'}
                onClick={onOpen}
              >
                {content}
              </Text>
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
          </CardBody>
        )}

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
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleModalClose}
        //@ts-ignore
        colorScheme={color}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={'lg'}
          p={0}
          height={'fit-content'}
          overflow={'hidden'}
        >
          <Card
            maxH={'80vh'}
            bg={backgroundColor || undefined}
          >
            <Box
              overflow={'clip auto'}
              css={{
                '&::-webkit-scrollbar': {
                  width: '10px',
                  backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar:hover': {
                  backgroundColor: 'rgba(138, 126, 132, 0.39)',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'white',
                  //borderRadius: '10px',
                  backgroundClip: 'padding-box',
                  border: '2px solid transparent',
                },
              }}
            >
              <CardHeader
                p={2}
                pt={4}
              >
                <Flex
                  justify={'space-between'}
                  width={'100%'}
                >
                  <Editable
                    defaultValue={title}
                    placeholder='Title'
                    flexGrow={2}
                    onChange={(value) => setEditedTitle(value)}
                  >
                    <EditablePreview
                      p={2}
                      pt={4}
                      color={title ? 'white' : 'gray'}
                    />
                    <EditableInput
                      p={2}
                      _focus={{
                        border: '1px solid transparent',
                        boxShadow: 'none',
                      }}
                    />
                  </Editable>
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
                      icon={<RiPushpinLine />}
                    />
                  )}
                </Flex>
              </CardHeader>
              <CardBody p={2}>
                <Editable
                  defaultValue={content}
                  overflow={'clip'}
                  onChange={(value) => setEditedContent(value)}
                >
                  <EditablePreview
                    p={2}
                    whiteSpace={'pre-wrap'}
                    wordBreak={'break-word'}
                  />
                  <EditableTextarea
                    as={TextareaAutosize}
                    //resize={'none'}
                    whiteSpace={'pre-wrap'}
                    wordBreak={'break-word'}
                    boxSizing={'border-box'}
                    overflow={'clip'}
                    height={'90%'}
                    p={2}
                    _focus={{
                      border: '1px solid transparent',
                      boxShadow: 'none',
                    }}
                  />
                </Editable>
              </CardBody>
            </Box>

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
                    color={'white'}
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
                  color={'white'}
                  icon={<RiDeleteBin6Line />}
                />
                <Button
                  bg={'transparent'}
                  onClick={handleModalCancel}
                >
                  Cancel
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        </ModalContent>
      </Modal>
    </GridItem>
  );
};

export default NoteCard;
