import { Button, Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { userContext } from "../providers/UserContext";
import { UserActionType } from "../reducers/UserReducer";

const Home = () => {
  const user = useContext(userContext);
  if (user === undefined)
    throw new Error("Please use within UserContextProvider");
  useEffect(() => {
    // To update the state:
    user.dispatch({
      type: UserActionType.UPDATE_USER,
      user: { ...user.state, firstName: "Mateo" },
    });
  }, []);
  return (
    <Flex flexDirection="column">
      {/* To read the state: */}
      {user.state.firstName}
      <Button>Crunchy List</Button>
      <Button variant="outline">Crunchy List</Button>
      <Button variant="secondary">Crunchy List</Button>
    </Flex>
  );
};

export default Home;
