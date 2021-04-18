import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { useContext, useEffect } from "react";
import { userContext } from "../providers/UserContext";
import { UserActionType } from "../reducers/UserReducer";

const Profile = () => {
  const user = useContext(userContext);
  if (user === undefined)
    throw new Error("Please use within UserContextProvider");

  useEffect(() => {
    // To update the state:
    user.dispatch({
      type: UserActionType.UPDATE_NAME,
      user: { firstName: "Mateo" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default Profile;
