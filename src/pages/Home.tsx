import { Box, CircularProgress, Flex, Heading, Text } from "@chakra-ui/react";
import { useCallback, useContext, useEffect } from "react";
import Slider from "react-slick";
import { getAnimesByCategory } from "../api/categories";
import { getAllAnimes } from "../api/animes";
import AnimeCategoryCard from "../components/AnimeCategoryCard";
import Card from "../components/Card";
import { categoriesContext } from "../providers/CategoriesContext";
import { userContext } from "../providers/UserContext";
import "../styles/home.css";
import { Status } from "../utils/types";
import { animesContext } from "../providers/AnimesContext";
import AnimePopularCard from "../components/AnimePopularCard";
import { BiMessageSquareError } from "react-icons/bi";

const Home = () => {
  const user = useContext(userContext);
  const animes = useContext(animesContext);
  const categories = useContext(categoriesContext);
  if (user === undefined || animes === undefined || categories === undefined)
    throw new Error("Please use within Provider");
  const popularCarouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 2,
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

  const getAnimes = useCallback(() => {
    const getAnimesAsync = async () => {
      await getAllAnimes(animes.dispatch);
    };
    getAnimesAsync();
  }, [animes.dispatch]);

  const getCategories = useCallback(() => {
    const getCategoriesAsync = async () => {
      await getAnimesByCategory(categories.dispatch);
    };
    getCategoriesAsync();
  }, [categories.dispatch]);

  useEffect(() => {
    getAnimes();
    getCategories();
  }, [getAnimes, getCategories]);

  return (
    <Box h="100%">
      <Box className="home">
        <Heading size="3xl" color="white">
          Crunchy List
        </Heading>
        <Text fontSize="2xl" color="white">
          La base de datos de anime m??s grande del mundo
        </Text>
      </Box>
      <Flex position="absolute" top={"75%"} w={"100%"} padding="0 3rem">
        <Card w={"100%"} marginBottom="60px">
          {animes.state.status === Status.LOADING ? (
            <CircularProgress
              isIndeterminate
              color="secondary.main"
              marginTop="1rem"
            />
          ) : animes.state.status === Status.FAILED? (
            <Flex
            h="100%"
            w="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <BiMessageSquareError fontSize="10rem" />
            <Heading size="3xl">Oops!</Heading>
      
            <Text m="1rem 5rem" fontSize="2xl">
              Se perdi?? la conexi??n con el Servidor
            </Text>
          </Flex>
          ):(
            <Box w={"100%"}>
              <Heading size="lg" alignSelf="self-start" color="gray.700">
                Populares
              </Heading>
              <Text alignSelf="self-start" fontSize="md">
                Los animes m??s populares de la temporada te esperan
              </Text>
              <Box w={"100%"}>
                <Slider {...popularCarouselSettings}>
                  {animes.state.populares?.map((anime) => (
                    <AnimePopularCard key={anime.idAnime} anime={anime} />
                  ))}
                </Slider>
              </Box>
            </Box>
          )}
          {/* isAuthenticated ? */}
          {false ? (
            <Box w={"100%"} marginTop="1rem">
              <Heading size="lg" alignSelf="self-start" color="gray.700">
                Recomendados
              </Heading>
              <Text alignSelf="self-start" fontSize="md">
                Los animes m??s recomendados en base a tus gustos personales
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
          {categories.state.status === Status.LOADING ? (
            <CircularProgress
              isIndeterminate
              color="secondary.main"
              marginTop="1rem"
            />
          ): categories.state.status === Status.FAILED? (
              <Flex></Flex>
            ) : (
            categories.state.categories?.map((category) =>
              category.animes && category.animes.length >= 3 ? (
                <Box w={"100%"} marginTop="1rem" key={category.idCategoria}>
                  <Heading size="lg" alignSelf="self-start" color="gray.700">
                    Categor??a {category.nombre}
                  </Heading>
                  <Box w={"100%"}>
                    <Slider {...recommendedCarouselSettings}>
                      {category.animes.map((anime) => (
                        <AnimeCategoryCard key={anime.idAnime} anime={anime} />
                      ))}
                    </Slider>
                  </Box>
                </Box>
              ) : undefined
            )
          )}
        </Card>
      </Flex>
    </Box>
  );
};

export default Home;
