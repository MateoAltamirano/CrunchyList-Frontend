import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import { Box } from "@chakra-ui/layout";

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Box paddingTop={"60px"}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Box>
      </Router>
    </div>
  );
};

export default App;
