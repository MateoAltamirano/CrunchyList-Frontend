import { Box,Button, Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { userContext } from "../providers/UserContext";
import { UserActionType } from "../reducers/UserReducer";
import '../styles/login.css'
import logo from '../assets/img/LogoWhiteMAL.png'


const LogIn = () =>{

  return  (
    <Box className="bg">
      <Box backgroundColor={"primary.main"}  className="loginCard">
        <img src={logo}></img>
        LogIn
      </Box>
    </Box>
  )
}



export default LogIn