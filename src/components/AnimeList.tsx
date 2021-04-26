import { SearchIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress";
import { IUserAnime } from "../models/User";

type AnimeListProps = {
  list: IUserAnime[] | undefined;
};

const AnimeList = ({ list }: AnimeListProps) => {
  return list && list.length > 0 ? (
    <Flex w={"100%"} marginTop="1rem" flexDirection="column" overflow="scroll">
      <Flex borderTopRadius="8px" padding="1rem 0.5rem" bgColor="primary.main">
        <Flex justifyContent="center" flexBasis={"25%"}>
          <Text>Imagen</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"25%"}>
          <Text>Nombre</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"25%"}>
          <Text>Fecha de inicio</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"25%"}>
          <Text>Completado</Text>
        </Flex>
      </Flex>
      {list.map((anime) => (
        <Flex
          borderBottom="2px solid lightgray"
          key={anime.idAnime}
          padding="1rem 0.5rem"
        >
          <Flex alignItems="center" justifyContent="center" flexBasis={"25%"}>
            <Image
              h={"10rem"}
              w={"10rem"}
              objectFit="cover"
              src={anime.imagen}
              alt={anime.nombre}
            />
          </Flex>
          <Flex justifyContent="center" alignItems="center" flexBasis={"25%"}>
            <Text color="gray.800">{anime.nombre}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" flexBasis={"25%"}>
            <Text color="gray.800">
              {new Date(Date.parse(anime.fechaInicioVer)).toLocaleDateString()}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" flexBasis={"25%"}>
            <CircularProgress
              value={anime.porcentajeVisto}
              color="secondary.main"
            >
              <CircularProgressLabel>
                {anime.porcentajeVisto}%
              </CircularProgressLabel>
            </CircularProgress>
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
