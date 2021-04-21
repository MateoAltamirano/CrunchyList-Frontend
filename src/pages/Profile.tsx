import { Flex, CircularProgress, Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { useContext, useEffect } from "react";
import { getUserById } from "../api/api";
import { userContext } from "../providers/UserContext";
import { Status } from "../reducers/UserReducer";

const Profile = () => {
  const user = useContext(userContext);
  if (user === undefined)
    throw new Error("Please use within UserContextProvider");

  const getUser = useCallback(() => {
    getUserById("1", user.dispatch);
  }, [user.dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  
  return (
    <Flex flexDirection="column">
      {/* To read the state: */}
      {user.state.status === Status.LOADING ? (
        <CircularProgress isIndeterminate color="secondary.main" />
      ) : (
        <Button>{user.state.firstName}</Button>
      )}
    </Flex>
  );
};

export default Profile;
