import { Box } from "@chakra-ui/react";
import "../styles/login.css";
import logo from "../assets/img/LogoWhiteMAL.png";

const LogIn = () => {
  return (
    <Box className="bg">
      <Box backgroundColor={"primary.main"} className="loginCard">
        <img src={logo} alt={"login"}></img>
        LogIn
      </Box>
    </Box>
  );
};

export default LogIn;
