
import { Flex, Text, Link } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ISearchUser } from "../models/User";
type SearchList = {
  list: ISearchUser[] | undefined;
};

const FollowUsers = ({ list }: SearchList) => {
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
          <Link href={'/friend-profile/'+user.username} color="gray.700">
                {user.nombre}
            </Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center" flexBasis={"33%"}>
            <Text color="gray.800">{user.username}</Text>
          </Flex>
       
        </Flex>
      ))}
    </Flex>
  ) : (
    <CircularProgress isIndeterminate color="secondary.main" />
  );
};

export default FollowUsers;