import {
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import "../styles/forms.css";
import logo from "../assets/img/LogoWhiteMAL.png";
import {
  Link,
} from 'react-router-dom';
import {logIn} from '../api/user'
import { IUserLogIn } from "../models/";
import { AxiosResponse, AxiosError } from "axios";
import { useHistory } from "react-router-dom";
import { userContext } from "../providers/UserContext";
import { UserActionType } from "../reducers/UserReducer";
import {Status} from "../utils/types"
import { useToast } from "@chakra-ui/react"

const LogIn = () => {
  const user = useContext(userContext);
  const history = useHistory();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: IUserLogIn) => {
    let res = logIn
    res(data).then((response: AxiosResponse) => {
      if(response.status==201 && response.data!="No existe el usuario"){
        if(user){
          user.dispatch({
            type: UserActionType.LOGIN,
            user: { 
                isAuthenticated: true,
                firstName: data.username,
                status: Status.SUCCESS,
                token:response.data[0].token.toString()
            },
          });
          toast({ title: "Bienvenido!",
          position: 'top',
          isClosable: true})
          history.push("/");
        }
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
        <h1 className={"title"}>Iniciar Sesión</h1>
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
        <p className={"text"}>No tiene una cuenta?</p>
        <Link style={{color: "white"}} to="/signup">Crear cuenta</Link>
      </Box>
    </Box>
  );
};

export default LogIn;
