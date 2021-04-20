import {
  Flex,
  CircularProgress,
  Box,
  Heading,
  Button,
  Image,
  Text,
  Divider,
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

  return (
    <Flex h="100%" flexDirection="column">
      {/* To read the state: */}
      {user.state.status === Status.LOADING ? (
        <CircularProgress isIndeterminate color="secondary.main" />
      ) : (
        <Box h="100%">
          <Box className="profile"></Box>
          <Flex position="absolute" top={"40%"} w={"100%"}>
            <Card w={"100%"} margin={"0 3rem"}>
              <Flex flexDirection="column" w={"100%"}>
                <Flex flexWrap="wrap" marginBottom="1rem">
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
                  <Flex>Btns</Flex>
                  <Flex>Anime Lists</Flex>
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
