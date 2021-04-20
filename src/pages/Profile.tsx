import {
  Flex,
  CircularProgress,
  Box,
  Heading,
  Button,
  Image,
  Text,
  Divider,
  useRadioGroup,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useContext, useEffect } from "react";
import { getUserById } from "../api/api";
import Card from "../components/Card";
import { userContext } from "../providers/UserContext";
import { Status } from "../reducers/UserReducer";
import "../styles/profile.css";
import { CheckIcon, StarIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import RadioButton from "../components/RadioButton";

const Profile = () => {
  const user = useContext(userContext);
  if (user === undefined)
    throw new Error("Please use within UserContextProvider");

  const getUser = useCallback(() => {
    getUserById("1", user.dispatch);
  }, [user.dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const radioOptions = [
    {
      icon: <StarIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: "Favoritos",
    },
    {
      icon: <TimeIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: "Planeo ver",
    },
    {
      icon: <ViewIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: "Estoy viendo",
    },
  ];

  const onRadioChange = (value: string) => {
    console.log(value);
  };
  const { getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Favoritos",
    onChange: onRadioChange,
  });

  const settings = {
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

  return (
    <Flex h="100%" flexDirection="column">
      {/* To read the state: */}
      {user.state.status === Status.LOADING ? (
        <CircularProgress isIndeterminate color="secondary.main" />
      ) : (
        <Box h="100%">
          <Box className="profile"></Box>
          <Flex
            position="absolute"
            top={"40%"}
            w={"100%"}
            padding="0 3rem"
            flexDirection="column"
          >
            <Card w={"100%"}>
              <Flex flexDirection="column" w={"100%"}>
                <Flex flexWrap="wrap" marginBottom="1rem" w={"100%"}>
                  <Flex flexGrow={1} alignItems="center" flexDirection="column">
                    <Image
                      borderRadius="1rem"
                      boxSize="10rem"
                      minW="10rem"
                      minH="10rem"
                      src="https://bit.ly/sage-adebayo"
                      alt="Profile Picture"
                    />
                    <Text fontSize="lg" margin="1rem 0">
                      {user.state.firstName}
                    </Text>
                    <Button>Mis Listas</Button>
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
                          <Text fontSize="lg">Vistos</Text>
                        </Flex>
                        <Text fontSize="lg">10</Text>
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        marginTop="1rem"
                        alignItems="center"
                      >
                        <Flex alignItems="center">
                          <StarIcon
                            boxSize="1.5rem"
                            color="secondary.main"
                            marginRight="1rem"
                          />
                          <Text fontSize="lg">Favoritos</Text>
                        </Flex>
                        <Text fontSize="lg">10</Text>
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
                          <Text fontSize="lg">Planeo ver</Text>
                        </Flex>
                        <Text fontSize="lg">10</Text>
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
                          <Text fontSize="lg">Estoy viendo</Text>
                        </Flex>
                        <Text fontSize="lg">10</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
                <Flex flexWrap="wrap" flexDirection="column" marginTop="1rem">
                  <Flex alignSelf="center" flexWrap="wrap">
                    {radioOptions.map((option) => {
                      console.log(option.value);
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
                  <Box w={"100%"} marginTop="1rem">
                    <Slider {...settings}>
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
                      <Box h={"25rem"} w={"25rem"} bgColor="gray">
                        6
                      </Box>
                    </Slider>
                  </Box>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default Profile;
