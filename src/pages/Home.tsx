import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import Slider from "react-slick";
import Card from "../components/Card";
import { userContext } from "../providers/UserContext";
import "../styles/home.css";

const Home = () => {
  const user = useContext(userContext);
  if (user === undefined)
    throw new Error("Please use within UserContextProvider");
  const popularCarouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
  };
  const recommendedCarouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 1,
        },
      },
    ],
  };
  const { isAuthenticated } = user.state;
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
      <Flex position="absolute" top={"75%"} w={"100%"} padding="0 3rem">
        <Card w={"100%"} marginBottom="60px">
          <Heading size="lg" alignSelf="self-start" color="gray.700">
            Populares
          </Heading>
          <Text alignSelf="self-start" fontSize="md">
            Los animes más populares de la temporada te esperan
          </Text>
          <Box w={"100%"}>
            <Slider {...popularCarouselSettings}>
              <Box h={"25rem"} w={"25rem"} bgColor="red">
                1
              </Box>
              <Box h={"25rem"} w={"25rem"} bgColor="blue">
                2
              </Box>
              <Box h={"25rem"} w={"25rem"} bgColor="green">
                3
              </Box>
              <Box h={"25rem"} w={"25rem"} bgColor="yellow">
                4
              </Box>
              <Box h={"25rem"} w={"25rem"} bgColor="pink">
                5
              </Box>
            </Slider>
          </Box>
          {isAuthenticated ? (
            <Box w={"100%"} marginTop="1rem">
              <Heading size="lg" alignSelf="self-start" color="gray.700">
                Recomendados
              </Heading>
              <Text alignSelf="self-start" fontSize="md">
                Los animes más recomendados en base a tus gustos personales
              </Text>
              <Box w={"100%"}>
                <Slider {...recommendedCarouselSettings}>
                  <Box h={"20rem"} w={"20rem"} bgColor="red">
                    1
                  </Box>
                  <Box h={"20rem"} w={"20rem"} bgColor="blue">
                    2
                  </Box>
                  <Box h={"20rem"} w={"20rem"} bgColor="green">
                    3
                  </Box>
                  <Box h={"20rem"} w={"20rem"} bgColor="yellow">
                    4
                  </Box>
                  <Box h={"20rem"} w={"20rem"} bgColor="pink">
                    5
                  </Box>
                </Slider>
              </Box>
            </Box>
          ) : undefined}
          <Box w={"100%"} marginTop="1rem">
            <Heading size="lg" alignSelf="self-start" color="gray.700">
              Categoria X
            </Heading>
            <Box w={"100%"}>
              <Slider {...recommendedCarouselSettings}>
                <Box h={"15rem"} w={"15rem"} bgColor="red">
                  1
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="blue">
                  2
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="green">
                  3
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="yellow">
                  4
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="pink">
                  5
                </Box>
              </Slider>
            </Box>
          </Box>
          <Box w={"100%"} marginTop="1rem">
            <Heading size="lg" alignSelf="self-start" color="gray.700">
              Categoria Y
            </Heading>
            <Box w={"100%"}>
              <Slider {...recommendedCarouselSettings}>
                <Box h={"15rem"} w={"15rem"} bgColor="red">
                  1
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="blue">
                  2
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="green">
                  3
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="yellow">
                  4
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="pink">
                  5
                </Box>
              </Slider>
            </Box>
          </Box>
          <Box w={"100%"} marginTop="1rem">
            <Heading size="lg" alignSelf="self-start" color="gray.700">
              Categoria Z
            </Heading>
            <Box w={"100%"}>
              <Slider {...recommendedCarouselSettings}>
                <Box h={"15rem"} w={"15rem"} bgColor="red">
                  1
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="blue">
                  2
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="green">
                  3
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="yellow">
                  4
                </Box>
                <Box h={"15rem"} w={"15rem"} bgColor="pink">
                  5
                </Box>
              </Slider>
            </Box>
          </Box>
        </Card>
      </Flex>
    </Box>
  );
};

export default Home;
