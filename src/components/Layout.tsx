import { Box } from "@chakra-ui/layout";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import NavBar from "./NavBar";
import AnimeDescription from '../pages/AnimeDescription'
import jwt_decode from "jwt-decode";
import { useCallback, useContext, useEffect } from "react";
import React from "react";
import { userContext } from "../providers/UserContext";
import { getUserByUsername, login } from "../api/user";
import MyLists from "../pages/MyLists";

const Layout = () => {
  const user = useContext(userContext);
  if (user === undefined) throw new Error("Please use within Provider");

  const getUser = useCallback(
    (username: string, token: string) => {
      const getUserAsync = async () => {
        await login({}, user.dispatch, token);
        await getUserByUsername(token, username, user.dispatch);
      };
      getUserAsync();
    },
    [user.dispatch]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: { username: string } = jwt_decode(token);
      getUser(decoded.username, token);
    }
  }, [getUser]);

  return (
    <React.Fragment>
      <NavBar />
      <Box paddingTop={"60px"} height={"100%"}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/anime/:id">
            <AnimeDescription/>
          </Route>
          <Route path="/my-lists">
            <MyLists />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
          
        </Switch>
      </Box>
    </React.Fragment>
  );
};

export default Layout;
