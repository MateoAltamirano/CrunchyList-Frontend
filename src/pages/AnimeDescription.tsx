import {
  Box,
  CircularProgress,
  Flex,
  Heading,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect } from "react";
import { getSingleAnime, addTofavorites } from "../api/animes";
import Card from "../components/Card";
import { userContext } from "../providers/UserContext";
import "../styles/description.css";
import { Status } from "../utils/types";
import { singleAnimesContext } from "../providers/SingleAnimeContext";
import { useParams } from "react-router-dom";
import { IUsuarioAnime } from "../models";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const toast = useToast();
  const user = useContext(userContext);
  const singleAnime = useContext(singleAnimesContext);
  if (user === undefined || singleAnime === undefined)
    throw new Error("Please use within Provider");

  const { isAuthenticated } = user.state;
  console.log(user.state);

  const getAnime = useCallback(
    (id: number) => {
      const getAnimeAsync = async () => {
        await getSingleAnime(id, singleAnime.dispatch);
      };
      getAnimeAsync();
    },
    [singleAnime.dispatch]
  );

  let id: { id: string } = useParams();
  useEffect(() => {
    getAnime(Number(id.id));
  }, [getAnime, id.id]);

  const addToListAsync = async () => {
    if (isAuthenticated) {
      let d = new Date(Date.now()),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let body: IUsuarioAnime = {
        idUsuario: user.state.idUsuario,
        idAnime: Number(id.id),
        idEstado: 5,
        porcentajeVisto: 0.0,
        fechaInicioVer: [year, month, day].join("-"),
      };
      const status = await addTofavorites(
        user.state.idUsuario,
        body,
        user.state.token
      );
      if (status === Status.SUCCESS) {
        toast({
          title: "Éxito",
          description: "Añadido a lista",
          position: "top-right",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        history.push("/my-lists");
      } else {
        toast({
          title: "Error",
          description: "Algo malo pasó",
          position: "top-right",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Aviso",
        description: "Debe iniciar sesión o crear una cuenta",
        position: "top-right",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box h="100%">
      <Box className="description"></Box>
      <Flex position="absolute" top={"75%"} w={"100%"} padding="0 3rem">
        <Card w={"100%"} marginBottom="60px">
          {singleAnime.state.status === Status.LOADING ||
          singleAnime.state.categories.length === 0 ? (
            <CircularProgress
              isIndeterminate
              color="secondary.main"
              marginTop="1rem"
            />
          ) : (
            <Box w={"100%"}>
              {singleAnime.state.anime?.map((anime) => (
                <Box>
                  <Heading
                    paddingBottom="10px"
                    size="xl"
                    textAlign="center"
                    color="gray.700"
                  >
                    {anime.nombre}
                  </Heading>

                  <Flex alignItems="center" justifyContent="center">
                    <Flex direction="column" justifyContent="center">
                      <img
                        className={"imgen"}
                        height="100%"
                        width="100%"
                        src={anime.imagen}
                        alt="anime-img"
                      />
                      <Button onClick={addToListAsync}>
                        Añadir a mi lista
                      </Button>
                    </Flex>
                    <Flex direction="column" width="50%" alignItems="center">
                      <Box
                        minWidth={"500px"}
                        w={"100%"}
                        margin={"20px"}
                        marginBottom={"30px"}
                      >
                        <Flex justifyContent="center">
                          <Heading
                            color="gray.600"
                            size="md"
                            className={"label"}
                          >
                            Puntuación: <span>{anime.score}</span>
                          </Heading>
                          <Heading
                            color="gray.600"
                            size="md"
                            className={"label"}
                          >
                            Rango: <span>#{anime.ranking}</span>
                          </Heading>
                          <Heading
                            color="gray.600"
                            size="md"
                            className={"label"}
                          >
                            Popularidad: <span>{anime.popularidad}</span>
                          </Heading>
                        </Flex>
                      </Box>
                      <Divider
                        borderBottomWidth="3px"
                        marginTop={"10px"}
                        marginBottom={"10px"}
                        marginLeft={"40px"}
                        marginRight={"20px"}
                      />
                      <Box alignSelf="start" marginLeft={"20px"}>
                        <Heading size="md">Información</Heading>
                        <Heading color="gray.600" className={"label-content"}>
                          Episodios: <span>{anime.nroEpisodios}</span>
                        </Heading>
                        <Heading color="gray.600" className={"label-content"}>
                          Estado: <span>{anime.estadoEmision}</span>
                        </Heading>
                        <Heading color="gray.600" className={"label-content"}>
                          Emisión:{" "}
                          <span>{anime.fechaEstreno?.split("T")[0]}</span>
                        </Heading>
                        <Heading color="gray.600" className={"label-content"}>
                          Estudio: <span>{anime.estudio}</span>
                        </Heading>
                        <Heading color="gray.600" className={"label-content"}>
                          Categorias:
                          {singleAnime.state.categories?.map((category) => (
                            <span> {category.nombre} </span>
                          ))}
                        </Heading>
                      </Box>
                      <Divider
                        borderBottomWidth="3px"
                        marginTop={"10px"}
                        marginBottom={"10px"}
                        marginLeft={"40px"}
                        marginRight={"20px"}
                      />
                      <Box
                        className="abstract"
                        w={"100%"}
                        alignSelf="start"
                        marginLeft={"20px"}
                      >
                        <Heading size="md">Información</Heading>
                        <p>{anime.sinopsis}</p>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Box>
          )}
        </Card>
      </Flex>
    </Box>
  );
};

export default Home;
