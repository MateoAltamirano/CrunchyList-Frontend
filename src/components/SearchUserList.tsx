import { Button } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/layout";
import { useHistory } from "react-router-dom";
import { ISearchUser } from "../models/User";

type SearchList = {
  list: ISearchUser[] | undefined;
};

const SearchUserList = ({ list }: SearchList) => {
  const history = useHistory();
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

      </Flex>
      {list.map((user) => (
        <Flex
          borderBottom="2px solid lightgray"
          padding="1rem 0.5rem"
          key={user.username}
        >
          <Flex justifyContent="center" alignItems="center" flexBasis={"33%"} onClick={() => history.push('/friend-profile/'+user.username)}>
            <Text color="gray.800">{user.nombre}</Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center" flexBasis={"33%"}>
            <Text color="gray.800">{user.username}</Text>
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
        No existen búsquedas con este resultado
      </Text>
    </Flex>
  );
};

export default SearchUserList;
