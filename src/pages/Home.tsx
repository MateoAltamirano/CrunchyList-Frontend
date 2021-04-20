import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Card from "../components/Card";
import "../styles/home.css";

const Home = () => {
  return (
    <Box h="100%">
      <Box className="home">
        <Heading size="3xl" color="white">
          Crunchy List
        </Heading>
        <Text fontSize="2xl" color="white">
          La base de datos de anime más grande del mundo
        </Text>
      </Box>
      <Flex position="absolute" top={"75%"} w={"100%"}>
        <Card w={"100%"} margin={"0 3rem"} marginBottom="60px">
          <Heading size="lg" alignSelf="self-start" color="gray.700">
            Populares
          </Heading>
          <Text alignSelf="self-start" fontSize="md">
            Los animes más populares de la temporada te esperan
          </Text>
          <Heading size="lg" alignSelf="self-start" color="gray.700">
            Recomendados
          </Heading>
          <Text alignSelf="self-start" fontSize="md">
            Los animes más recomendados en base a tus gustos personales
          </Text>
        </Card>
      </Flex>
    </Box>
  );
};

export default Home;
