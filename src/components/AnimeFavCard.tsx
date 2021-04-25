import { Image } from "@chakra-ui/image";
import { Badge, Box, Flex, Link, Text } from "@chakra-ui/layout";
import Card from "./Card";
import { IUserAnimeFavs } from "../models/User";
import { BsFillHeartFill } from "react-icons/bs";

type AnimeFavCardProps = {
  anime: IUserAnimeFavs;
};

const AnimeFavCard = ({ anime }: AnimeFavCardProps) => {
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
              <Box m="5px">
                <BsFillHeartFill />
              </Box>
            </Flex>
          </Badge>
        </Flex>
      </Card>
    </Box>
  );
};

export default AnimeFavCard;
