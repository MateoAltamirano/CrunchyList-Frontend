import { Image } from "@chakra-ui/image";
import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import Card from "./Card";
import { IUserAnime } from "../models/User";
import { Progress } from "@chakra-ui/react";

type AnimeListCardProps = {
  anime: IUserAnime;
};

const AnimeListCard = ({ anime }: AnimeListCardProps) => {
  return (
    <Box h={"30rem"} padding="0.5rem">
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
          flexDirection="column"
          w={"100%"}
          h={"20%"}
        >
          <Text fontSize="md" isTruncated margin="2rem 1rem">
            <Link href={`../anime/${anime.idAnime}`} color="gray.800">
              {anime.nombre}
            </Link>
          </Text>
          <Progress colorScheme="orange" value={anime.porcentajeVisto} />
        </Flex>
      </Card>
    </Box>
  );
};

export default AnimeListCard;
