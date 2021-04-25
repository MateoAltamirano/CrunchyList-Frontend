import {
  Flex,
  CircularProgress,
  Box,
  Heading,
  Button,
  Text,
  Divider,
  useRadioGroup,
  Avatar,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import Card from "../components/Card";
import { userContext } from "../providers/UserContext";
import "../styles/profile.css";
import { CheckIcon, SearchIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import RadioButton from "../components/RadioButton";
import { Status } from "../utils/types";
import { Redirect, useHistory } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import AnimeFavCard from "../components/AnimeFavCard";
import { BsFillHeartFill } from "react-icons/bs";
import AnimeListCard from "../components/AnimeListCard";

const Profile = () => {
  const history = useHistory();
  const user = useContext(userContext);
  if (user === undefined)
    throw new Error("Please use within UserContextProvider");
  const radioOptions = [
    {
      icon: (
        <Box marginBottom="0.5rem">
          <BsFillHeartFill fontSize="1.5rem" />
        </Box>
      ),
      value: "Favoritos",
    },
    {
      icon: <ViewIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: "Estoy viendo",
    },
    {
      icon: <TimeIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: "Planeo ver",
    },
  ];
  const settings = {
    infinite: true,
    speed: 500,
  };
  const responsiveCarousel = (length: number) => {
    return [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: length > 2 ? 3 : 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: length > 2 ? 3 : 1,
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
    ];
  };
  const token = localStorage.getItem("token");
  const { status, nombre, favs, seen, watching, toSee } = user.state;
  const [carouselAnimes, setCarouselAnimes] = useState("Favoritos");
  const onRadioChange = (value: string) => {
    setCarouselAnimes(value);
  };
  const { getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Favoritos",
    onChange: onRadioChange,
  });

  return token ? (
    <Flex h="100%" flexDirection="column">
      <Box h="100%">
        <Box className="profile"></Box>
        <Flex
          position="absolute"
          top={"40%"}
          w={"100%"}
          padding="0 3rem"
          flexDirection="column"
        >
          <Card w={"100%"} marginBottom="60px">
            {status === Status.LOADING ? (
              <CircularProgress isIndeterminate color="secondary.main" />
            ) : (
              <Flex flexDirection="column" w={"100%"}>
                <Flex flexWrap="wrap" marginBottom="1rem" w={"100%"}>
                  <Flex flexGrow={1} alignItems="center" flexDirection="column">
                    <Avatar
                      bg="primary.main"
                      color="white"
                      size="2xl"
                      icon={<AiOutlineUser fontSize="4.5rem" />}
                    />
                    <Text fontSize="lg" margin="1rem 0" color="gray.800">
                      {nombre}
                    </Text>
                    <Button onClick={() => history.push("/my-lists")}>
                      Mis Listas
                    </Button>
                  </Flex>
                  <Flex flexGrow={3} flexDirection="column">
                    <Heading size="lg" color="primary.dark">
                      Estadísticas
                    </Heading>
                    <Divider marginTop="1rem" />
                    <Box padding="0 1rem">
                      <Flex
                        justifyContent="space-between"
                        marginTop="1rem"
                        alignItems="center"
                      >
                        <Flex alignItems="center">
                          <CheckIcon
                            boxSize="1.5rem"
                            color="secondary.main"
                            marginRight="1rem"
                          />
                          <Text fontSize="lg" color="gray.800">
                            Vistos
                          </Text>
                        </Flex>
                        <Text fontSize="lg" color="gray.800">
                          {seen?.length}
                        </Text>
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        marginTop="1rem"
                        alignItems="center"
                      >
                        <Flex alignItems="center">
                          <Box marginRight="1rem" color="secondary.main">
                            <BsFillHeartFill fontSize="1.5rem" />
                          </Box>
                          <Text fontSize="lg" color="gray.800">
                            Favoritos
                          </Text>
                        </Flex>
                        <Text fontSize="lg" color="gray.800">
                          {favs?.length}
                        </Text>
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        marginTop="1rem"
                        alignItems="center"
                      >
                        <Flex alignItems="center">
                          <ViewIcon
                            boxSize="1.5rem"
                            color="secondary.main"
                            marginRight="1rem"
                          />
                          <Text fontSize="lg" color="gray.800">
                            Estoy viendo
                          </Text>
                        </Flex>
                        <Text fontSize="lg" color="gray.800">
                          {watching?.length}
                        </Text>
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        marginTop="1rem"
                        alignItems="center"
                      >
                        <Flex alignItems="center">
                          <TimeIcon
                            boxSize="1.5rem"
                            color="secondary.main"
                            marginRight="1rem"
                          />
                          <Text fontSize="lg" color="gray.800">
                            Planeo ver
                          </Text>
                        </Flex>
                        <Text fontSize="lg" color="gray.800">
                          {toSee?.length}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
                <Flex flexWrap="wrap" flexDirection="column" marginTop="1rem">
                  <Flex alignSelf="center" flexWrap="wrap">
                    {radioOptions.map((option) => {
                      const { value, icon } = option;
                      const radio = getRadioProps({ value });
                      return (
                        <RadioButton key={value} {...radio}>
                          <Flex flexDirection="column" alignItems="center">
                            {icon}
                            {value}
                          </Flex>
                        </RadioButton>
                      );
                    })}
                  </Flex>
                  {carouselAnimes === "Favoritos" ? (
                    favs && favs.length > 0 ? (
                      <Box w={"100%"} marginTop="1rem">
                        <Slider
                          {...settings}
                          slidesToShow={favs.length > 2 ? 3 : 1}
                          responsive={responsiveCarousel(favs.length)}
                        >
                          {favs.map((anime) => (
                            <AnimeFavCard key={anime.idAnime} anime={anime} />
                          ))}
                        </Slider>
                      </Box>
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
                    )
                  ) : undefined}
                  {carouselAnimes === "Estoy viendo" ? (
                    watching && watching.length > 0 ? (
                      <Box w={"100%"} marginTop="1rem">
                        <Slider
                          {...settings}
                          slidesToShow={watching.length > 2 ? 3 : 1}
                          responsive={responsiveCarousel(watching.length)}
                        >
                          {watching.map((anime) => (
                            <AnimeListCard key={anime.idAnime} anime={anime} />
                          ))}
                        </Slider>
                      </Box>
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
                    )
                  ) : undefined}
                  {carouselAnimes === "Planeo ver" ? (
                    toSee && toSee.length > 0 ? (
                      <Box w={"100%"} marginTop="1rem">
                        <Slider
                          {...settings}
                          slidesToShow={toSee.length > 2 ? 3 : 1}
                          responsive={responsiveCarousel(toSee.length)}
                        >
                          {toSee.map((anime) => (
                            <AnimeListCard key={anime.idAnime} anime={anime} />
                          ))}
                        </Slider>
                      </Box>
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
                    )
                  ) : undefined}
                </Flex>
              </Flex>
            )}
          </Card>
        </Flex>
      </Box>
    </Flex>
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
};

export default Profile;
