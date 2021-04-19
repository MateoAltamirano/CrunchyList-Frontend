import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LogIn from "./pages/Login";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import { Box } from "@chakra-ui/layout";
import UserContextProvider from "./providers/UserContext";

const App = () => {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
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
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Box>
        </UserContextProvider>
      </Router>
    </div>
  );
};

export default App;
