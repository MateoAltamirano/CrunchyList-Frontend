import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { EditIcon, SearchIcon, DeleteIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Link, Text } from '@chakra-ui/layout';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress';
import { useToast } from '@chakra-ui/toast';
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { deleteAnime, editAnime } from '../api/user';
import { IUserAnime } from '../models/User';
import { userContext } from '../providers/UserContext';
import { Status } from '../utils/types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

type AnimeListProps = {
  list: IUserAnime[] | undefined;
  listName: string;
};

const AnimeList = ({ list, listName }: AnimeListProps) => {
  const user = useContext(userContext);
  if (user === undefined) throw new Error('Please use within Provider');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState('edit');
  const [anime, setAnime] = useState<IUserAnime>();

  const onEditOpen = () => {
    setModalType('edit');
    onOpen();
  };
  const onDeleteOpen = (anime: IUserAnime) => {
    setModalType('delete');
    setAnime(anime);
    onOpen();
  };
  const edit = useCallback(
    (anime: IUserAnime) => {
      const editAnimeAsync = async () => {
        const status = await editAnime(anime, user.dispatch);
        if (status === Status.SUCCESS) {
          toast({
            title: 'Éxito',
            description: 'Actualizado correctamente',
            position: 'top-right',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Error.',
            description: 'Algo pasó mal.',
            position: 'top-right',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      };
      editAnimeAsync();
    },
    [user.dispatch, toast]
  );
  const deleteFromList = async () => {
    const response = await deleteAnime(
      anime!.idAnime,
      user.state,
      user.dispatch,
      listName
    );
    if (response?.status === Status.SUCCESS) {
      onClose();
      toast({
        title: 'Éxito',
        description: 'Actualizado correctamente',
        position: 'top-right',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      onClose();
      toast({
        title: 'Error.',
        description: 'Algo pasó mal.',
        position: 'top-right',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return list && list.length > 0 ? (
    <Flex w={'100%'} marginTop="1rem" flexDirection="column" overflow="scroll">
      <Flex
        color="white"
        borderTopRadius="8px"
        padding="1rem 0.5rem"
        bgColor="primary.main"
      >
        <Flex justifyContent="center" flexBasis={'20%'}>
          <Text>Imagen</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={'20%'}>
          <Text>Nombre</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={'20%'}>
          <Text>Fecha de inicio</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={'20%'}>
          <Text>Completado</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={'20%'}>
          <Text>Opciones</Text>
        </Flex>
      </Flex>
      {list.map((anime) => (
        <Flex
          borderBottom="2px solid lightgray"
          key={anime.idAnime}
          padding="1rem 0.5rem"
        >
          <Flex alignItems="center" justifyContent="center" flexBasis={'20%'}>
            <Image
              h={'10rem'}
              w={'10rem'}
              objectFit="cover"
              src={anime.imagen}
              alt={anime.nombre}
            />
          </Flex>
          <Flex justifyContent="center" alignItems="center" flexBasis={'20%'}>
            <Text color="gray.800">
              <Link href={`anime/${anime.idAnime}`} color="gray.700">
                {anime.nombre}
              </Link>
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" flexBasis={'20%'}>
            <Text color="gray.800">
              {new Date(
                Date.parse(anime.fechaInicioVer)
              ).toLocaleDateString() !== 'Invalid Date'
                ? new Date(
                    Date.parse(anime.fechaInicioVer)
                  ).toLocaleDateString()
                : '--'}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" flexBasis={'20%'}>
            <CircularProgress
              value={anime.porcentajeVisto}
              color="secondary.main"
            >
              <CircularProgressLabel>
                {anime.porcentajeVisto}%
              </CircularProgressLabel>
            </CircularProgress>
          </Flex>
          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            flexBasis={'20%'}
          >
            <IconButton
              variant="secondary"
              aria-label="Edit"
              icon={<EditIcon />}
              onClick={() => onEditOpen()}
            />
            <IconButton
              variant="solid"
              colorScheme="red"
              aria-label="Edit"
              icon={<DeleteIcon />}
              onClick={() => onDeleteOpen(anime)}
            />
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {modalType === 'edit' ? 'Actualizar estado' : ''}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {modalType === 'edit' ? (
                  <Box>dropdown</Box>
                ) : (
                  <Text>
                    ¿Estás seguro que deseas eliminar este anime de tu lista?
                  </Text>
                )}
              </ModalBody>

              <ModalFooter>
                <Button variant="solid" mr={3} onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={
                    modalType === 'edit'
                      ? () => edit(anime)
                      : () => deleteFromList()
                  }
                >
                  {modalType === 'edit' ? 'Actualizar' : 'Eliminar'}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      ))}
    </Flex>
  ) : (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      mt="3rem"
    >
      <SearchIcon color="secondary.main" boxSize="3rem" />
      <Text fontSize="md" color="gray.800">
        No tienes animes en esta lista aún
      </Text>
    </Flex>
  );
};

export default AnimeList;
