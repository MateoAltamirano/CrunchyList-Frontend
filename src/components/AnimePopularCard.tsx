import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { IAnime } from "../models/Anime";
import Card from "./Card";

type AnimeCategoryCardProps = {
  anime: IAnime;
};

const AnimePopularCard = ({ anime }: AnimeCategoryCardProps) => {
  return (
    <Box h={"40rem"} padding="0.5rem">
      <Card h={"100%"} padding="0" overflow="hidden">
        <Image
          h={"100%"}
          w={"100%"}
          objectFit="cover"
          src={anime.imagen}
          alt={anime.nombre}
        />
        <Flex
          position="absolute"
          h="100%"
          w="10%"
          alignItems="flex-end"
          justifyContent="center"
          paddingBottom="2rem"
        >
          <Heading
            size="3xl"
            color="white"
            textShadow="1px 1px black"
            _hover={{ color: "primary.light" }}
          >
            <Link href={`../anime/${anime.idAnime}`}>{anime.nombre}</Link>
          </Heading>
        </Flex>
      </Card>
    </Box>
  );
};

export default AnimePopularCard;
