import {useCallback, useContext, useEffect, useState} from "react";
import {animesContext} from "../providers/AnimesContext";
import {getAnimesSearch} from "../api/animes";
import {Box, Button, CircularProgress, Flex, Heading, Input, Text, useToast} from "@chakra-ui/react";
import Card from "../components/Card";
import {Status} from "../utils/types";
import {useForm} from "react-hook-form";
import SearchAnimeCard from "../components/SearchAnimeCard";
import {useHistory, useLocation} from "react-router-dom";

type SearchText = {
  texto: string
}

const SearchAnime = () => {
  let query = new URLSearchParams(useLocation().search);
  const [value, setValue] = useState(query.get("q")? query.get("q") : '');
  const handleChange = (event: any) => setValue(event.target.value)
  const history = useHistory();
  const toast = useToast();
  const animes = useContext(animesContext);
  if (animes === undefined)
    throw new Error("Please use within Provider");

  const getAnimes = useCallback(() => {
    const getAnimesAsync = async () => {
      let texto = query.get("q");
      if (texto) await getAnimesSearch(texto|| '', animes.dispatch);
    };
    getAnimesAsync();
  }, [animes.dispatch]);

  useEffect(() => {
    getAnimes();
  }, [getAnimes]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchAnime = (data: SearchText) => {
    if (value && value.trim() != '')  {
      history.push(`/search-anime?q=${value.trim()}`)
      window.location.reload(false);
    } else {
      toast({
        title: "Adventencia",
        description: "Ingrese al menos un caracter para buscar anime",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex h="100%" flexDirection="column">
      <Box h="100%">
        <Box className="profile">
          <Heading size="2xl" color="white">
            Buscar Anime
          </Heading>
          <Text fontSize="xl" color="white">
            Encuentra nuevo anime para ver
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
            <Box w={"100%"}>
              <form  onSubmit={handleSubmit(searchAnime)}>
                <Flex justify="center">
                  <Box w={"40%"} className={"input-box"} marginRight={"10px"}>
                    <Input
                      value={String(value)}
                      variant="outline"
                      type={"text"}
                      onChange={handleChange}
                      placeholder={"Buscar Anime.."}
                      name="texto"
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                  </Box>
                  <Button type={"submit"}>Buscar</Button>
                </Flex>
              </form>
            </Box>
            {query.get("q") != null && animes.state.status === Status.LOADING ? (
              <CircularProgress isIndeterminate color="secondary.main" />
            ) : (
              <Box w={"100%"}>
                {animes.state.animes?.map((anime) => (
                  <SearchAnimeCard key={anime.idAnime} anime={anime} />
                ))}
              </Box>
            )}
          </Card>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SearchAnime;