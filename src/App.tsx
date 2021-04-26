import "./styles/App.css";
import UserContextProvider from "./providers/UserContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoriesContextProvider from "./providers/CategoriesContext";
import AnimesContextProvider from "./providers/AnimesContext";
import SingleAnimeContextProvider from "./providers/SingleAnimeContext"
import Layout from "./components/Layout";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AnimesContextProvider>
          <CategoriesContextProvider>
            <UserContextProvider>
              <SingleAnimeContextProvider>
                <Layout />
              </SingleAnimeContextProvider>
            </UserContextProvider>
          </CategoriesContextProvider>
        </AnimesContextProvider>
      </Router>
    </div>
  );
};

export default App;
