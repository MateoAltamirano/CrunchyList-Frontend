import { StarIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Badge, Box, Flex, Link, Text } from "@chakra-ui/layout";
import Card from "./Card";
import { IAnime } from "../models/Anime";

type AnimeCategoryCardProps = {
  anime: IAnime;
};

const AnimeCategoryCard = ({ anime }: AnimeCategoryCardProps) => {
  return (
    <Box h={"20rem"} padding="0.5rem">
      <Card h={"100%"} padding="0" overflow="hidden">
        <Image
          h={"80%"}
          w={"100%"}
          objectFit="cover"
          src={anime.imagen}
          alt={anime.nombre}
        />
        <Flex
          justifyContent="space-between"
          alignItems="center"
          padding="0 1rem"
          w={"100%"}
          h={"20%"}
        >
          <Text fontSize="md" isTruncated>
            <Link href={`anime/${anime.idAnime}`} color="gray.700">
              {anime.nombre}
            </Link>
          </Text>
          <Badge fontSize="md" variant="subtle" colorScheme="blue">
            <Flex alignItems="center" m="2px">
              <StarIcon mr="5px" />
              {anime.score}
            </Flex>
          </Badge>
        </Flex>
      </Card>
    </Box>
  );
};

export default AnimeCategoryCard;
