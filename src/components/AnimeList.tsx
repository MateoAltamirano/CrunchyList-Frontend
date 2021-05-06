import { IconButton } from "@chakra-ui/button";
import { EditIcon, SearchIcon, DeleteIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, Link, Text } from "@chakra-ui/layout";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress";
import { IUserAnime } from "../models/User";

type AnimeListProps = {
  list: IUserAnime[] | undefined;
};

const AnimeList = ({ list }: AnimeListProps) => {
  return list && list.length > 0 ? (
    <Flex w={"100%"} marginTop="1rem" flexDirection="column" overflow="scroll">
      <Flex
        color="white"
        borderTopRadius="8px"
        padding="1rem 0.5rem"
        bgColor="primary.main"
      >
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Imagen</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Nombre</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Fecha de inicio</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Completado</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Opciones</Text>
        </Flex>
      </Flex>
      {list.map((anime) => (
        <Flex
          borderBottom="2px solid lightgray"
          key={anime.idAnime}
          padding="1rem 0.5rem"
        >
          <Flex alignItems="center" justifyContent="center" flexBasis={"20%"}>
            <Image
              h={"10rem"}
              w={"10rem"}
              objectFit="cover"
              src={anime.imagen}
              alt={anime.nombre}
            />
          </Flex>
          <Flex justifyContent="center" alignItems="center" flexBasis={"20%"}>
            <Text color="gray.800">
              <Link href={`anime/${anime.idAnime}`} color="gray.700">
                {anime.nombre}
              </Link>
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" flexBasis={"20%"}>
            <Text color="gray.800">
              {new Date(
                Date.parse(anime.fechaInicioVer)
              ).toLocaleDateString() !== "Invalid Date"
                ? new Date(
                    Date.parse(anime.fechaInicioVer)
                  ).toLocaleDateString()
                : "--"}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" flexBasis={"20%"}>
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
            flexBasis={"20%"}
          >
            <IconButton
              variant="secondary"
              aria-label="Edit"
              icon={<EditIcon />}
            />
            <IconButton
              variant="solid"
              colorScheme="red"
              aria-label="Edit"
              icon={<DeleteIcon />}
            />
          </Flex>
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
