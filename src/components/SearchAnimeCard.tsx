import { Image } from "@chakra-ui/image";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Badge, Link, Text } from "@chakra-ui/layout";
import { IAnime } from "../models/Anime";

type AnimeCategoryCardProps = {
  anime: IAnime;
};

const SearchAnimeCard = ({ anime }: AnimeCategoryCardProps) => {
  return (
    <Box h={"10rem"} marginBottom={"15px"} padding="0.5rem" border="1px" borderColor="gray.200" overflow="hidden">
      <Flex>
        <Image
          w={"100px"}
          h={"100%"}
          objectFit="cover"
          src={anime.imagen}
          alt={anime.nombre}
          marginRight={"15px"}
        />
        <Flex
          flexDirection="column"
          h="80%"
          w="100%"
          paddingBottom="2rem"
        >
          <Box w={"100%"} marginBottom={"20px"}>
            <Flex
              justifyContent="space-between"
              alignItems="center">
              <Text fontSize="3xl" color="gray.800">
                <Link color="gray.700" href={`anime/${anime.idAnime}`}>{anime.nombre}</Link>
              </Text>
              <Badge w={"70px"} fontSize="md" variant="subtle" colorScheme="blue">
                <Flex alignItems="center" m="2px">
                  <StarIcon mr="5px" />
                  {anime.score}
                </Flex>
              </Badge>
            </Flex>
          </Box>
          <Text color="gray.800">
            {anime.sinopsis?.substr(0, 300) + '...'}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SearchAnimeCard;
