import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { EditIcon, SearchIcon, DeleteIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Link, Text } from '@chakra-ui/layout';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress';
import { useToast } from '@chakra-ui/toast';
import { useContext, useState } from 'react';
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
  Select,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ILista, IUsuarioAnime } from '../models';

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

  const onDeleteOpen = (anime: IUserAnime) => {
    setModalType('delete');
    setAnime(anime);
    onOpen();
  };
  const editFromList = async (anime: IUsuarioAnime) => {
    const response = await editAnime(
      anime,
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
  const preloadForm = {
    idAnime: anime?.idAnime,
    idEstado: 0,
    porcentajeVisto: anime?.porcentajeVisto,
    fechaInicioVer: anime?.fechaInicioVer.split('T')[0],
  };
  const generateDate = (): string => {
    let d = new Date(Date.now()),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: preloadForm,
  });
  const onSubmit = (data: ILista) => {
    if (user.state.idUsuario) data['idUsuario'] = user.state.idUsuario;
    data['idEstado'] = Number(data['idEstado']);
    data['porcentajeVisto'] = Number(data['porcentajeVisto']);
    if (data.idEstado === 0) {
      toast({
        title: 'Aviso',
        description: 'Debe seleccionar un estado',
        position: 'top-right',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    } else {
      if (data.idEstado === 1) data.porcentajeVisto = 100;
      if (data.fechaInicioVer === '') data.fechaInicioVer = generateDate();
      editFromList(data);
    }
  };
  const onEditOpen = (anime: IUserAnime) => {
    setModalType('edit');
    setAnime(anime);
    setValue('idAnime', anime.idAnime);
    setValue('idEstado', anime.idEstado);
    setValue('fechaInicioVer', anime.fechaInicioVer.split('T')[0]);
    setValue('idAnime', anime.idAnime);
    setValue('porcentajeVisto', anime.porcentajeVisto);
    onOpen();
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
              onClick={() => onEditOpen(anime)}
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
                {modalType === 'edit' ? 'Actualizar' : ''}
              </ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  {modalType === 'edit' ? (
                    <Flex direction="column">
                      <Box className={'input-box'}>
                        <label>Estado</label>
                        <Select
                          placeholder={''}
                          {...register('idEstado', {
                            required: 'El estado es requerido',
                          })}
                        >
                          {[
                            { name: 'Vistos', id: 1 },
                            { name: 'Viendo', id: 2 },
                            { name: 'En espera', id: 3 },
                            { name: 'Descartados', id: 4 },
                            { name: 'Planeo Ver', id: 5 },
                          ].map((estado, index) => (
                            <option key={index} value={estado.id}>
                              {estado.name}
                            </option>
                          ))}
                        </Select>
                        {errors.idEstado && (
                          <span>{errors.idEstado.message}</span>
                        )}
                      </Box>
                      <Box className={'input-box'}>
                        <label>Porcentaje Visto</label>
                        <Input
                          type={'number'}
                          step={'0.01'}
                          min={'0'}
                          max={'100'}
                          {...register('porcentajeVisto', {
                            required: 'Debe ingresar solo un decimal',
                            pattern: /^[+-]?\d+(\.\d+)?$/,
                          })}
                        />
                        {errors.porcentajeVisto && (
                          <span>{errors.porcentajeVisto.message}</span>
                        )}
                      </Box>
                      <Box className={'input-box'}>
                        <label>Fecha inicio</label>
                        <Input
                          type={'date'}
                          placeholder={'Fecha inicio'}
                          {...register('fechaInicioVer')}
                        />
                      </Box>
                    </Flex>
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
                  {modalType === 'edit' ? (
                    <Button type={'submit'} variant="primary">
                      Actualizar
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={deleteFromList}>
                      Eliminar
                    </Button>
                  )}
                </ModalFooter>
              </form>
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
