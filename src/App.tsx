import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LogIn from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import { Box } from "@chakra-ui/layout";
import UserContextProvider from "./providers/UserContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoriesContextProvider from "./providers/CategoriesContext";
import AnimesContextProvider from "./providers/AnimesContext";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AnimesContextProvider>
          <CategoriesContextProvider>
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
                  <Route path="/signup">
                    <SignUp />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </Box>
            </UserContextProvider>
          </CategoriesContextProvider>
        </AnimesContextProvider>
      </Router>
    </div>
  );
};

export default App;
