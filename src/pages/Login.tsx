import {
  Box,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import "../styles/forms.css";
import logo from "../assets/img/LogoWhiteMAL.png";
import {
  Link, Router,
} from 'react-router-dom';
import {logIn} from '../api/user'
import { IUser, IUserLogIn } from "../models/";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useHistory } from "react-router-dom";
import { userContext } from "../providers/UserContext";
import { IReducer, UserActionType, Status } from "../reducers/UserReducer";

const LogIn = () => {
  const user = useContext(userContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: IUserLogIn) => {
    console.log(data);
    let res = logIn
    res(data).then((response: AxiosResponse) => {
      console.log("response login",response);
      if(response.status==201 && response.data!="No existe el usuario"){
        if(user)
        user.dispatch({
          type: UserActionType.SET_INFO,
          user: { 
              isAuthenticated: true,
              firstName: data.username,
              status: Status.SUCCESS,
              token:response.data[0].token.toString()
          },
        });
        history.push("/");

      }else{
        alert(response.data)
      }
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
      alert(error.message)
    });
  };
  return (
    <Box className="bg">
      <Box backgroundColor={"primary.main"} className="loginCard">
        <img src={logo}></img>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Usuario"}
              {...register("username", {
                required: "Debe ingresar un email",
                
              })}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </Box>
          
          <Box className={"input-box"}>
            <Input
              type={"password"}
              placeholder={"Contraseña"}
              {...register("password", { required: "El campo es requerido" })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </Box>
          
          <Button marginTop={"10px"} backgroundColor={"primary.dark"} type={"submit"}>
            Ingresar
          </Button>
        </form>
        <p>No tiene una cuenta?</p>
        <Link style={{color: "white"}} to="/signup">Crear cuenta</Link>
      </Box>
    </Box>
  );
};

export default LogIn;
