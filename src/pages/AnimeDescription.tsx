import {
  Box,
  CircularProgress,
  Flex,
  Heading,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select ,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSingleAnime, addTofavorites } from "../api/animes";
import Card from "../components/Card";
import { userContext } from "../providers/UserContext";
import "../styles/description.css";
import { Status } from "../utils/types";
import { singleAnimesContext } from "../providers/SingleAnimeContext";
import { useParams } from "react-router-dom";
import { ILista } from "../models";
import { useToast,useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory();
  const toast = useToast();
  const user = useContext(userContext);
  const singleAnime = useContext(singleAnimesContext);
  if (user === undefined || singleAnime === undefined)
    throw new Error("Please use within Provider");

  const { isAuthenticated } = user.state;

  let id: { id: string } = useParams();


  const getAnime= useCallback(
    (id: number,idUser?:number,token?:string) => {
      const getAnimeAsync = async () => {
        await getSingleAnime(id, singleAnime.dispatch,idUser,token);
      };
      getAnimeAsync();
    },
    [singleAnime.dispatch]
  );
  
  useEffect(() => {

    getAnime(Number(id.id),user.state.idUsuario,user.state.token);
    
  }, [getAnime, id.id,user.state]);

  const addToListAsync=async (data:ILista)=>{
    const status = await addTofavorites(
      user.state.idUsuario,
      data,
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
      //history.push("/my-lists");
      window.location.reload(false);
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
  }


  const generateDate=():string=>{
    let d = new Date(Date.now()),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return  [year, month, day].join("-")
  }

  const goToProfile=()=>{
    history.push("/my-lists");
  }

  const preloadForm={
    idAnime: Number(id.id),
    idEstado: singleAnime.state.lista.length>0?singleAnime.state.lista[0].idEstado:0,
    porcentajeVisto: singleAnime.state.lista.length>0?singleAnime.state.lista[0].porcentajeVisto:0.0,
    fechaInicioVer: singleAnime.state.lista.length>0?singleAnime.state.lista[0].fechaInicioVer.split('T')[0]:"",
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preloadForm
  });

  const onSubmit=(data:ILista)=>{
    if(user.state.idUsuario)
    data['idUsuario']=user.state.idUsuario
    data['idEstado']=Number(data['idEstado'])
    data['porcentajeVisto']=Number(data['porcentajeVisto'])
    if(data.idEstado===0){
      toast({
        title: "Aviso",
        description: "Debe seleccionar un estado",
        position: "top-right",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }else{
      if(data.idEstado===1)
      data.porcentajeVisto=100
      if(data.fechaInicioVer==='')
      data.fechaInicioVer=generateDate()
      addToListAsync(data)
    }
    //
  }
  const showWarningSesion=()=>{
    toast({
      title: "Aviso",
      description: "Debe iniciar sesión",
      position: "top-right",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
      
    <Box h="100%">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{singleAnime.state.anime[0]&&singleAnime.state.anime[0].nombre}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
              <Box className={"input-box"}>
                <label>Estado</label>
                <Select
                  placeholder={''}
                  {...register("idEstado", { required: "El estado es requerido" })}
                >
                  {singleAnime.state.estados.map(estado=>
                    <option value={estado.idEstado}>{estado.nombre}</option>
                  )}
                </Select>
                {errors.idEstado && <span>{errors.idEstado.message}</span>}
              </Box>
              <Box className={"input-box"}>
                {/* singleAnime.state.estados.find(state=>{return state.idEstado===preloadForm.idEstado})?.nombre */}
                <label>Porcentaje Visto</label>
                <Input
                  type={"number"}
                  step={"0.01"}
                  min={"0"}
                  max={"100"}
                  placeholder={"Porcentaje visto ej 50.5"}
                  {...register("porcentajeVisto", { required: "Debe ingresar solo un decimal" ,pattern:/^[+-]?\d+(\.\d+)?$/})}
                />
                {errors.porcentajeVisto && <span>{errors.porcentajeVisto.message}</span>}
              </Box>
              <Box className={"input-box"}>
                {/* singleAnime.state.estados.find(state=>{return state.idEstado===preloadForm.idEstado})?.nombre */}
                <label>Fecha inicio</label>
                <Input
                  type={"date"}
                  placeholder={"Fecha inicio"}
                  {...register("fechaInicioVer")}
                />
              </Box>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            {singleAnime.state.lista.length===0 &&
              <Button type={"submit"} variant="ghost">Añadir</Button>
            }
            {singleAnime.state.lista.length>0 &&
              <Button type={"submit"} variant="ghost">Aceptar</Button>
            }
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Box className="description"></Box>
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
                      {(!isAuthenticated)&&
                        <Button onClick={showWarningSesion}>
                          Añadir a mi lista
                        </Button>
                      }
                      {(isAuthenticated && singleAnime.state.lista.length===0) &&
                      <Button onClick={onOpen}>
                        Añadir a mi lista
                      </Button>
                      }
                      {isAuthenticated && singleAnime.state.lista.length>0 &&
                      <Button onClick={goToProfile}>
                        Estado: {singleAnime.state.estados.find(estado=>{return estado.idEstado===singleAnime.state.lista[0].idEstado})?.nombre}
                      </Button>
                      }
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