import { Button } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Text, Link } from "@chakra-ui/layout";
import { useContext, useState } from "react";
import { ILista } from "../models";
import { useHistory } from "react-router-dom";
import { ISearchUser } from "../models/User";
import { userContext } from "../providers/UserContext";
import { follow } from "../api/user";
import { Status } from "../utils/types";
import { useDisclosure, useToast } from "@chakra-ui/react";
type SearchList = {
  list: ISearchUser[] | undefined;
};

const FollowUsers = ({ list }: SearchList) => {
  const history = useHistory();
  const user = useContext(userContext);
  const [estado, setEstado] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  if (user === undefined)
    throw new Error("Please use within Provider");
 

  return list && list.length > 0 ? (
    <Flex w={"100%"} marginTop="1rem" flexDirection="column" overflow="hide">
      <Flex
        color="white"
        borderTopRadius="8px"
        padding="1rem 0.5rem"
        bgColor="primary.main"
      >
        <Flex justifyContent="center" flexBasis={"33%"}>
          <Text>Nombre</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"33%"}>
          <Text>Username</Text>
        </Flex>
        <Flex justifyContent="center" flexBasis={"33%"}>
          <Text>Acción</Text>
        </Flex>
      </Flex>
      {list.map((user) => (
        <Flex
          borderBottom="2px solid lightgray"
          padding="1rem 0.5rem"
          key={user.username}
        >
          <Flex justifyContent="center" alignItems="center" flexBasis={"33%"} onClick={() => history.push('/friend-profile/'+user.username)}>
          <Link href={'/friend-profile/'+user.username} color="gray.700">
                {user.nombre}
            </Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center" flexBasis={"33%"}>
            <Text color="gray.800">{user.username}</Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center" flexBasis={"33%"}>
            <Button color="gray.800">Dejar de Seguir</Button>
          </Flex>
        </Flex>
      ))}
    </Flex>
  ) : (
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
  );
};

export default FollowUsers;