import { SearchIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { IAnime } from "../models/Anime";

type TopAnimeListProps = {
  list: IAnime[] | undefined;
};

const TopAnimeList = ({ list }: TopAnimeListProps) => {
  return list && list.length > 0 ? (
    <Flex w={"100%"} marginTop="1rem" flexDirection="column" overflow="scroll">
      <Flex
        color="white"
        borderTopRadius="8px"
        padding="1rem 0.5rem"
        bgColor="primary.main"
      >
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Ranking</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Imagen</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Nombre</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Episodios</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"20%"}>
          <Text>Score</Text>
        </Flex>
      </Flex>
      {list.map((anime) => (
        <Flex
          borderBottom="2px solid lightgray"
          key={anime.idAnime}
          padding="1rem 0.5rem"
        >
          <Flex justifyContent="center" alignItems="center" flexBasis={"20%"}>
            <Text color="gray.800">#{anime.ranking}</Text>
          </Flex>
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
            <Text color="gray.800">{anime.nombre}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" flexBasis={"20%"}>
            <Text color="gray.800">{anime.nroEpisodios}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" flexBasis={"20%"}>
            {anime.score}
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
        No existen animes en esta lista aún
      </Text>
    </Flex>
  );
};

export default TopAnimeList;
