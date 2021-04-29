import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { useCallback, useContext, useEffect } from "react";
import { getTopAnimes } from "../api/animes";
import Card from "../components/Card";
import TopAnimeList from "../components/TopAnimeList";
import { animesContext } from "../providers/AnimesContext";
import { Status } from "../utils/types";

const TopAnime = () => {
  const animes = useContext(animesContext);
  if (animes === undefined)
    throw new Error("Please use within AnimesContextProvider");
  const getTop = useCallback(() => {
    const getTopAnimesAsync = async () => {
      await getTopAnimes(animes.dispatch);
    };
    getTopAnimesAsync();
  }, [animes.dispatch]);
  useEffect(() => {
    getTop();
  }, [getTop]);
  const { status, top } = animes.state;
  return (
    <Flex h="100%" flexDirection="column">
      <Box h="100%">
        <Box className="profile">
          <Heading size="2xl" color="white">
            Top Anime
          </Heading>
          <Text fontSize="xl" color="white">
            ¿Sabes cuáles son los animes mejor rankeados?
          </Text>
        </Box>
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
                <Flex flexWrap="wrap" flexDirection="column" marginTop="1rem">
                  <TopAnimeList list={top} />
                </Flex>
              </Flex>
            )}
          </Card>
        </Flex>
      </Box>
    </Flex>
  );
};

export default TopAnime;
