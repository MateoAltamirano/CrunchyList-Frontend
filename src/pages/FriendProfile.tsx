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
    useToast,
    useDisclosure,
  } from "@chakra-ui/react";
  import {useEffect, useState,useCallback, useContext } from "react";
  import Card from "../components/Card";
  import "../styles/profile.css";
  import { CheckIcon, SearchIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
  import Slider from "react-slick";
  import RadioButton from "../components/RadioButton";
  import { Redirect, useHistory, useParams } from "react-router-dom";
  import { AiOutlineUser } from "react-icons/ai";
  import AnimeFavCard from "../components/AnimeFavCard";
  import { BsFillHeartFill } from "react-icons/bs";
  import AnimeListCard from "../components/AnimeListCard";
import { getFriendByUsername, follow, unfollow, getFriends} from "../api/user";
import { IUser } from "../models/User";
import { userContext } from "../providers/UserContext";
import { Status } from "../utils/types";
  
  const FriendProfile = () => {
    const history = useHistory();
    const user = useContext(userContext);
    if (user === undefined)
      throw new Error("Please use within Provider");
    let userName: { userName: string } = useParams();
    const toast = useToast();
    const { onClose } = useDisclosure();
  
    const [data, setData] = useState<IUser>();
    const [data2, setData2] = useState<Boolean>();
    
    const token = localStorage.getItem("token");

    const { isAuthenticated } = user.state;

    // const getFriend = async () => {
    //   if(token){
    //     const res = await getFriendByUsername(token,userName.userName);
    //     setData(res);
    //   }
    // };

    const getFriend = useCallback(() => {
      const getFriendAsync=async()=>{
        if(token){
          const res = await getFriendByUsername(token,userName.userName);
          setData(res);
        }
      };
      getFriendAsync()
    },[token,userName.userName]);

    const isFollow = useCallback(() => {
      const isFollowAsync= async ()=>{
        if(token){
          const res = await getFriends(user.state.idUsuario,token);
          let cont = res?.filter(usuario => usuario.username === userName.userName);
         console.log(cont);
          if (cont !== undefined && cont.length > 0){
            setData2(true);
          }else{
            setData2(false);
          }
        }
      };
      isFollowAsync()
    },[token,user.state.idUsuario]);

    useEffect(() => {
      isFollow();
    }, [isFollow,token,user.state.idUsuario]);
   

    useEffect(() => {
      getFriend();
    }, [getFriend,token, userName.userName]);

    
   
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
        value: "Esta viendo",
      },
      {
        icon: <TimeIcon boxSize="1.5rem" marginBottom="0.5rem" />,
        value: "Planea ver",
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
            slidesToShow: length > 2 ? 2 : length > 1 ? 2 : 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            infinite: true,
            speed: 500,
            slidesToShow: length > 2 ? 2 : 1,
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
    
    const [carouselAnimes, setCarouselAnimes] = useState("Favoritos");
    const onRadioChange = (value: string) => {
      setCarouselAnimes(value);
    };
    const { getRadioProps } = useRadioGroup({
      name: "framework",
      defaultValue: "Favoritos",
      onChange: onRadioChange,
    });

    const addFriend = async () => {
      let id2;
      if (data === undefined) throw new Error("Please use within Provider");
      id2 =data.idUsuario;
      var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      let body = {
        "idSeguidor":user.state.idUsuario,
        "idSeguido":id2,
        "fecha":date
      }
      const status = await follow(
        user.state.idUsuario,
        id2,
        body,
        user.state.token
      ); 
      if (status === Status.SUCCESS) {
        toast({
          title: "Éxito",
          description: "Añadido a Amigos",
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
    }

    const removeFriend = async () => {
      let id2;
      if (data === undefined) throw new Error("Please use within Provider");
      id2 =data.idUsuario;
 
      const status = await unfollow(
        user.state.idUsuario,
        id2,
        user.state.token
      ); 
      if (status === Status.SUCCESS) {
        toast({
          title: "Éxito",
          description: "Se eliminó de Amigos",
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
    }
  
  
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
              {data === undefined || data2 === undefined ? (
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
                        {data.nombre}
                      </Text>
                      <Button
                        variant="secondary"
                        onClick={() => history.push('/follow-lists/'+data.username)}
                      >
                        Sus Listas
                      </Button>
                      {(isAuthenticated && !data2 ) &&
                        <Button onClick={addFriend}>
                          Seguir
                        </Button>
                        }
                          {(isAuthenticated && data2)  &&
                        <Button onClick={removeFriend}>
                          Dejar de Seguir
                        </Button>
                        }
                    </Flex>
                    <Flex flexGrow={3} flexDirection="column">
                      <Heading size="lg" color="primary.dark">
                        Sus Estadísticas
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
                            {data.seen?.length}
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
                            {data.favs?.length}
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
                              Esta viendo
                            </Text>
                          </Flex>
                          <Text fontSize="lg" color="gray.800">
                            {data.watching?.length}
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
                              Planea ver
                            </Text>
                          </Flex>
                          <Text fontSize="lg" color="gray.800">
                            {data.toSee?.length}
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
                      data.favs && data.favs.length > 0 ? (
                        <Box w={"100%"} marginTop="1rem">
                          <Slider
                            {...settings}
                            slidesToShow={
                                data.favs.length > 2 ? 3 : data.favs.length > 1 ? 2 : 1
                            }
                            responsive={responsiveCarousel(data.favs.length)}
                          >
                            {data.favs.map((anime) =>
                              data.favs?.length === 1 ? (
                                <Box key={anime.idAnime} padding="0 30%">
                                  <AnimeFavCard
                                    key={anime.idAnime}
                                    anime={anime}
                                  />
                                </Box>
                              ) : (
                                <AnimeFavCard key={anime.idAnime} anime={anime} />
                              )
                            )}
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
                            No tiene animes en esta lista aún
                          </Text>
                        </Flex>
                      )
                    ) : undefined}
                    {carouselAnimes === "Esta viendo" ? (
                      data.watching && data.watching.length > 0 ? (
                        <Box w={"100%"} marginTop="1rem">
                          <Slider
                            {...settings}
                            slidesToShow={
                                data.watching.length > 2
                                ? 3
                                : data.watching.length > 1
                                ? 2
                                : 1
                            }
                            responsive={responsiveCarousel(data.watching.length)}
                          >
                            {data.watching.map((anime) =>
                              data.watching?.length === 1 ? (
                                <Box key={anime.idAnime} padding="0 30%">
                                  <AnimeListCard
                                    key={anime.idAnime}
                                    anime={anime}
                                  />
                                </Box>
                              ) : (
                                <AnimeListCard
                                  key={anime.idAnime}
                                  anime={anime}
                                />
                              )
                            )}
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
                            No tiene animes en esta lista aún
                          </Text>
                        </Flex>
                      )
                    ) : undefined}
                    {carouselAnimes === "Planea ver" ? (
                      data.toSee && data.toSee.length > 0 ? (
                        <Box w={"100%"} marginTop="1rem">
                          <Slider
                            {...settings}
                            slidesToShow={
                                data.toSee.length > 2 ? 3 : data.toSee.length > 1 ? 2 : 1
                            }
                            responsive={responsiveCarousel(data.toSee.length)}
                          >
                            {data.toSee.map((anime) =>
                              data.toSee?.length === 1 ? (
                                <Box key={anime.idAnime} padding="0 30%">
                                  <AnimeListCard
                                    key={anime.idAnime}
                                    anime={anime}
                                  />
                                </Box>
                              ) : (
                                <AnimeListCard
                                  key={anime.idAnime}
                                  anime={anime}
                                />
                              )
                            )}
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
                            No tiene animes en esta lista aún
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
  
  export default FriendProfile;
  