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
  Select,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSingleAnime, addToList } from "../api/animes";
import { addFav, eliminarFav, getFav } from "../api/user";
import Card from "../components/Card";
import { userContext } from "../providers/UserContext";
import "../styles/description.css";
import { Status } from "../utils/types";
import { singleAnimesContext } from "../providers/SingleAnimeContext";
import { useParams } from "react-router-dom";
import { ILista } from "../models";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { IUserAnimeFavs } from "../models/User";

const Home = () => {
  const [idEstado, setIdEstado] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory();
  const toast = useToast();
  const user = useContext(userContext);
  const singleAnime = useContext(singleAnimesContext);
  const [estado, setEstado] = useState('');
  const [data, setData] = useState<Boolean>();
  const token = localStorage.getItem("token");
  // singleAnime && singleAnime.state.lista.length>0 ? singleAnime.state.estados.find(e=> e.idEstado===singleAnime.state.lista[0].idEstado)?.nombre :
  if (user === undefined || singleAnime === undefined)
    throw new Error("Please use within Provider");

  const { isAuthenticated } = user.state;

  let id: { id: string } = useParams();

  const getAnime = useCallback(
    (id: number, idUser?: number, token?: string) => {
      const getAnimeAsync = async () => {
        await getSingleAnime(id, singleAnime.dispatch, idUser, token);
      };
      getAnimeAsync();
    },
    [singleAnime.dispatch]
  );

  useEffect(() => {
    getAnime(Number(id.id), user.state.idUsuario, user.state.token);
  }, [getAnime, id.id, user.state]);

  const addToListAsync=async (data:ILista)=>{
    const status = await addToList(
      user.state.idUsuario,
      data,
      user.state.token
    );
    if (status === Status.SUCCESS) {
      setEstado(singleAnime.state.estados.find(e => e.idEstado === data.idEstado)?.nombre || '');
      toast({
        title: "Éxito",
        description: "Añadido a lista",
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      //history.push("/my-lists");
      //window.location.reload(false);
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
  };

  const goToProfile = () => {
    history.push("/my-lists");
  };

  const preloadForm = {
    idAnime: Number(id.id),
    idEstado: singleAnime.state.lista.length>0?singleAnime.state.lista[0].idEstado:0,
    porcentajeVisto: singleAnime.state.lista.length>0?singleAnime.state.lista[0].porcentajeVisto:0.0,
    fechaInicioVer: singleAnime.state.lista[0]?.fechaInicioVer?.split('T')[0] || "",
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preloadForm,
  });

  const onSubmit = (data: ILista) => {
    if (user.state.idUsuario) data["idUsuario"] = user.state.idUsuario;
    data["idEstado"] = idEstado;
    data["porcentajeVisto"] = Number(data["porcentajeVisto"]);
    if (data.idEstado === 0) {
      toast({
        title: "Aviso",
        description: "Debe seleccionar un estado",
        position: "top-right",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }else{
      if(data.idEstado===1) data.porcentajeVisto=100
      else if (data.idEstado===5) data.porcentajeVisto=0
      if(data.fechaInicioVer==='') data.fechaInicioVer=undefined;
      addToListAsync(data)
    }
    //
  };



  const isFav = useCallback(() => {
    const isFavAsync= async ()=>{
      if(token && user.state.idUsuario !== undefined){
        const res = await getFav(user.state.idUsuario,token);
        let animeFavid = parseInt(id.id);
        let cont = res?.filter((anime: IUserAnimeFavs)=> anime.idAnime === animeFavid);
       console.log(cont);
        if (cont !== undefined && cont.length > 0){
          setData(true);
        }else{
          setData(false);
        }
      }
    };
    isFavAsync()
  },[token,user.state.idUsuario]);

  useEffect(() => {
    isFav();
  }, [isFav,token,user.state.idUsuario]);


  const addFavorito = async () => {
    let id2 = parseInt(id.id);
    let data = {
      "idUsuario": user.state.idUsuario,
      "idAnime": id2
    }
    const status = await addFav(
      data,
      user.state.token
    );
    if (status === Status.SUCCESS) {
      toast({
        title: "Éxito",
        description: "Añadido a Favoritos",
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      //history.push("/my-lists");
      //window.location.reload(false);
    } else {
      toast({
        title: "Error",
        description: "Algo malo pasó",
        position: "top-right",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const eliminarFavorito = async () => {
    let id2 = parseInt(id.id);
 
    const status = await eliminarFav(
      user.state.idUsuario,
      id2,
      user.state.token
    );
    if (status === Status.SUCCESS) {
      toast({
        title: "Éxito",
        description: "Se eliminó de Favoritos",
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      //history.push("/my-lists");
      //window.location.reload(false);
    } else {
      toast({
        title: "Error",
        description: "Algo malo pasó,  por favor vuelva a intentar en un momento",
        position: "top-right",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  const showWarningSesion = () => {
    toast({
      title: "Aviso",
      description: "Debe iniciar sesión",
      position: "top-right",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
  };

  const estadoInput = register("idEstado", { required: "El estado es requerido" });

  const handleEstadoChange = (event: any) => {
    setIdEstado(Number(event.target.value));
  }

  return (
    <Box h="100%">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              {singleAnime.state.anime[0] && singleAnime.state.anime[0].nombre}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box className={"input-box"}>
                <label>Estado</label>
                <Select
                  onChange={(e) => {
                    estadoInput.onChange(e); // method from hook form register
                    handleEstadoChange(e); // your method
                  }}
                  placeholder={''}
                  ref={estadoInput.ref}
                >
                  {singleAnime.state.estados.map((estado, index) => (
                    <option key={index} value={estado.idEstado}>
                      {estado.nombre}
                    </option>
                  ))}
                </Select>
                {errors.idEstado && <span>{errors.idEstado.message}</span>}
              </Box>
              {idEstado !== 0 && idEstado !== 1 && idEstado !== 5 &&
              <Box className={"input-box"}>
                  {/* singleAnime.state.estados.find(state=>{return state.idEstado===preloadForm.idEstado})?.nombre */}
                  <label>Porcentaje Visto</label>
                  <Input
                    type={"number"}
                    step={"0.01"}
                    min={"0"}
                    max={"100"}
                    placeholder={"Porcentaje visto ej 50.5"}
                    {...register("porcentajeVisto", { required: "Debe ingresar solo un decimal" , pattern:/^\d+(\.\d{0,2})?$/})}
                  />
                  {errors.porcentajeVisto && <span>{errors.porcentajeVisto.message}</span>}
                </Box>
              }
              { idEstado !== 0 && idEstado !== 5 &&
                <Box className={"input-box"}>
                  {/* singleAnime.state.estados.find(state=>{return state.idEstado===preloadForm.idEstado})?.nombre */}
                  <label>Fecha inicio</label>
                  <Input
                    type={"date"}
                    placeholder={"Fecha inicio"}
                    {...register("fechaInicioVer")}
                  />
                </Box>
              }
            
          </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cerrar
              </Button>
              {singleAnime.state.lista.length === 0 && (
                <Button type={"submit"} variant="ghost">
                  Añadir
                </Button>
              )}
              {singleAnime.state.lista.length > 0 && (
                <Button type={"submit"} variant="ghost">
                  Aceptar
                </Button>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Box className="description"></Box>
      <Flex position="absolute" top={"75%"} w={"100%"} padding="0 3rem">
        <Card w={"100%"} marginBottom="60px">
          {singleAnime.state.status === Status.LOADING || data === undefined ? (
            <CircularProgress
              isIndeterminate
              color="secondary.main"
              marginTop="1rem"
            />
          ) : (
            <Box w={"100%"}>
              {singleAnime.state.anime?.map((anime) => (
                <Box key={anime.idAnime}>
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
                      {!isAuthenticated &&
                        <Button onClick={showWarningSesion}>
                          Añadir a mi lista
                        </Button>
                      }
                      {(isAuthenticated && singleAnime.state.lista.length===0 && estado === '') &&
                      <Button onClick={onOpen}>
                        Añadir a mi lista
                      </Button>
                      }
                      {isAuthenticated && (singleAnime.state.lista.length>0 || estado !== '') &&
                      <Button onClick={goToProfile}>
                        Estado: {estado || singleAnime.state.estados.find(e=> e.idEstado===singleAnime.state.lista[0].idEstado)?.nombre}
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
                        {isAuthenticated && !data &&
                        <Button onClick={addFavorito}>
                          Añadir Favorito
                        </Button>
                        }
                        {isAuthenticated && data &&
                        <Button onClick={eliminarFavorito}>
                          Eliminar Favorito
                        </Button>
                        }
                          
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
                            <span key={category.idCategoria}>
                              {category.nombre}
                            </span>
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
