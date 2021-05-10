import { Box, Flex, Heading } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import React, { useEffect, useState, useContext } from "react";
import { getFriends } from "../api/user";
import { userContext } from "../providers/UserContext";
import { ISearchUser } from "../models/User";
import Card from "../components/Card";
import SearchUserList from "../components/SearchUserList";

import { Redirect, useParams, useHistory } from "react-router-dom";
import FollowUsers from "../components/FollowUsers";

const FriendList = () => {
  let userName: { userName: string } = useParams();
  const history = useHistory();
  const user = useContext(userContext);
  const [data, setData] = useState<ISearchUser[]>();
  if (user === undefined)
    throw new Error("Please use within Provider");
 
  const token = localStorage.getItem("token");
  const {idUsuario, nombre} = user.state;
  console.log(nombre);
  const getUsers = async () => {
    if(token){
      const res = await getFriends(user.state.idUsuario,token);
      setData(res);  
    }
  };
  
  useEffect(() => {
    getUsers();
  }, [token,idUsuario]);
    
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
              {data !== undefined ?(
                <Flex flexWrap="wrap" flexDirection="column" marginTop="1rem">
                  <FollowUsers list={data} />
                </Flex>
              ):
                <CircularProgress isIndeterminate color="secondary.main" />
              }
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
