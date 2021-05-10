import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { useEffect, useState, useContext, useCallback } from "react";
import { getFriends } from "../api/user";
import { userContext } from "../providers/UserContext";
import Card from "../components/Card";
import { SearchIcon } from "@chakra-ui/icons";
import { Redirect } from "react-router-dom";
import FollowUsers from "../components/FollowUsers";

const FriendList = () => {
  const user = useContext(userContext);
  const [data, setData] = useState<any>();
  if (user === undefined)
    throw new Error("Please use within Provider");
 
  const token = localStorage.getItem("token");
  const {idUsuario} = user.state;
  console.log(idUsuario);
  


  const getUsers = useCallback(() => {
    const getUsersAsync=async()=>{
      if(token && idUsuario !== undefined){

        const res = await getFriends(idUsuario,token);
        
        if(res !== undefined && res.length===0){
          setData("Alone")
        }else{
          setData(res);
        }
        console.log(data);
        
      }
    };
    getUsersAsync()
  },[idUsuario])

  
  useEffect(() => {
    getUsers();
  }, [getUsers]);
    
  return token ? (
      <Flex h="100%" flexDirection="column">
      <Box h="100%">
        <Box className="profile">
          <Heading size="2xl" color="white">
            Mis Amigos
          </Heading>
        </Box>
        <Flex
          position="absolute"
          top={"40%"}
          w={"100%"}
          padding="0 3rem"
          flexDirection="column"
        >
          <Card w={"100%"} marginBottom="60px">
            <Flex flexDirection="column" w={"100%"}>
              {data === undefined ?(
                <CircularProgress isIndeterminate color="secondary.main" />
              
              ): data !== undefined && data.length > 0 && data !== "Alone"? ( 

                <Flex flexWrap="wrap" flexDirection="column" marginTop="1rem">
                <FollowUsers list={data} />
                </Flex>
              ) : data === "Alone"? (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  mt="3rem"
                >
                <SearchIcon color="secondary.main" boxSize="3rem" />
                <Text fontSize="md" color="gray.800">
                  Actualmente no sigues a nadie
              </Text>
              </Flex>
                
              ) : (
                <Flex></Flex>
              )}
            </Flex>
          </Card>
        </Flex>
      </Box>
    </Flex>
  ):(
    <Redirect to={{ pathname: "/" }} />
  );
}

export default FriendList;
