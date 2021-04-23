import { Box, CircularProgress, Flex, Heading, Text, Divider  } from "@chakra-ui/react";
import { useCallback, useContext, useEffect } from "react";
import { getSingleAnime } from "../api/animes";
import Card from "../components/Card";
import { userContext } from "../providers/UserContext";
import "../styles/description.css";
import { Status } from "../utils/types";
import {singleAnimesContext} from "../providers/SingleAnimeContext"
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";

const Home = () => {
  const user = useContext(userContext);
  //const animes = useContext(animesContext);
  const singleAnime= useContext(singleAnimesContext);
  //const categories = useContext(categoriesContext);
  if (user === undefined || singleAnime===undefined)
    throw new Error("Please use within Provider");

  // const { isAuthenticated } = user.state;

  const getAnime = useCallback((id:number)=>{
    const getAnimeAsync = async () =>{
      await getSingleAnime(id,singleAnime.dispatch);
    };
    getAnimeAsync();

  },[singleAnime.dispatch])

  let id:{id:string}=useParams();
  useEffect(() => {
    getAnime(Number(id.id));
    console.log("aaa",typeof singleAnime)
  }, [getAnime]);
  return (
    <Box h="100%">
      <Box className="description">
      </Box>
      <Flex position="absolute" top={"75%"} w={"100%"} padding="0 3rem">
        <Card w={"100%"} marginBottom="60px">
          {singleAnime.state.status === Status.LOADING ? (
            <CircularProgress
              isIndeterminate
              color="secondary.main"
              marginTop="1rem"
            />
          ) : (
            <Box w={"100%"}>
              {singleAnime.state.anime?.map((anime) => (
                <Box>
              <Heading paddingBottom="10px" size="xl" textAlign="center" color="gray.700">
                {anime.nombre}
              </Heading>
                
              <Flex alignItems="center" justifyContent="center">
                <Flex direction="column" justifyContent="center">
                    <img  className={"imgen"} height="100%" width="100%" src={anime.imagen}/> 
                </Flex>
                <Flex direction="column" width="50%" alignItems="center">
                  <Box minWidth={"500px"} w={"100%"} margin={"20px"} marginBottom={"30px"}>
                      <Flex justifyContent="center">
                        <Heading color="gray.600" size="md" className={"label"}>Puntuación: <span>{anime.score}</span></Heading>
                        <Heading color="gray.600" size="md" className={"label"}>Rango: <span>#{anime.ranking}</span></Heading>
                        <Heading color="gray.600" size="md" className={"label"}>Popularidad: <span>{anime.popularidad}</span></Heading>
                      </Flex>
                  </Box>
                  <Divider borderBottomWidth="3px" marginTop={"10px"} marginBottom={"10px"} marginLeft={"40px"} marginRight={"20px"}/>
                  <Box  alignSelf="start" marginLeft={"20px"}>
                    <Heading size="md">Información</Heading>
                    <Heading color="gray.600"  className={"label-content"}>Episodios: <span>{anime.nroEpisodios}</span></Heading>
                    <Heading color="gray.600"  className={"label-content"}>Estado: <span>{anime.estadoEmision}</span></Heading>
                    <Heading color="gray.600"  className={"label-content"}>Emisión: <span>{anime.fechaEstreno?.split("T")[0]}</span></Heading>
                    <Heading color="gray.600"  className={"label-content"}>Estudio: <span>{anime.estudio}</span></Heading>
                  </Box>
                  <Divider borderBottomWidth="3px" marginTop={"10px"} marginBottom={"10px"} marginLeft={"40px"} marginRight={"20px"}/>
                  <Box className="abstract" w={"100%"} alignSelf="start" marginLeft={"20px"}>
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