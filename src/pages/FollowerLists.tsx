import {
    Flex,
    CircularProgress,
    Box,
    Heading,
    Text,
    useRadioGroup,
  } from "@chakra-ui/react";
  import { useContext, useEffect, useState } from "react";
  import Card from "../components/Card";
  import { userContext } from "../providers/UserContext";
  import "../styles/myLists.css";
  import {
    CheckIcon,
    RepeatClockIcon,
    TimeIcon,
    ViewIcon,
    ViewOffIcon,
  } from "@chakra-ui/icons";
  import RadioButton from "../components/RadioButton";
  import { Redirect, useParams } from "react-router-dom";
  import AnimeList from "../components/AnimeList";
import { getFriendByUsername } from "../api/user";
import { IUser } from "../models/User";
  
  const FollowLists = () => {

    let userName: { userName: string } = useParams();
  
    const [data, setData] = useState<IUser>();
  
    const token = localStorage.getItem("token");
    const getUsers = async () => {
      if(token){
        const res = await getFriendByUsername(token,userName.userName);
        setData(res);  
      }
    };
    
    useEffect(() => {
      getUsers();
    }, [token,userName.userName]);

    const user = useContext(userContext);
    if (user === undefined)
      throw new Error("Please use within UserContextProvider");
    const radioOptions = [
      {
        icon: <CheckIcon boxSize="1.5rem" marginBottom="0.5rem" />,
        value: "Vistos",
      },
      {
        icon: <ViewIcon boxSize="1.5rem" marginBottom="0.5rem" />,
        value: "Esta viendo",
      },
      {
        icon: <RepeatClockIcon boxSize="1.5rem" marginBottom="0.5rem" />,
        value: "En espera",
      },
      {
        icon: <ViewOffIcon boxSize="1.5rem" marginBottom="0.5rem" />,
        value: "Descartados",
      },
      {
        icon: <TimeIcon boxSize="1.5rem" marginBottom="0.5rem" />,
        value: "Planea ver",
      },
    ];
  
    const [listAnimes, setListAnimes] = useState("Vistos");
    const onRadioChange = (value: string) => {
      setListAnimes(value);
    };
    const { getRadioProps } = useRadioGroup({
      name: "framework",
      defaultValue: "Vistos",
      onChange: onRadioChange,
    });
  
    return token ? (
      <Flex h="100%" flexDirection="column">
        <Box h="100%">
          <Box className="profile">
            <Heading size="2xl" color="white">
              Lista 
            </Heading>
            <Text fontSize="xl" color="white">
              ¿Cuánto anime ha visto?
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
              {data === undefined ? (
                <CircularProgress isIndeterminate color="secondary.main" />
              ) : (
                <Flex flexDirection="column" w={"100%"}>
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
                    {listAnimes === "Vistos" ? (
                      <AnimeList list={data.seen} />
                    ) : undefined}
                    {listAnimes === "Esta viendo" ? (
                      <AnimeList list={data.watching} />
                    ) : undefined}
                    {listAnimes === "En espera" ? (
                      <AnimeList list={data.waiting} />
                    ) : undefined}
                    {listAnimes === "Descartados" ? (
                      <AnimeList list={data.discarted} />
                    ) : undefined}
                    {listAnimes === "Planea ver" ? (
                      <AnimeList list={data.toSee} />
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
  export default FollowLists;
  