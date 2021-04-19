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
import { userContext } from "../providers/UserContext";
import { UserActionType } from "../reducers/UserReducer";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import "../styles/forms.css";
import logo from "../assets/img/LogoWhiteMAL.png";
import {
  Link, Router,
} from 'react-router-dom';

const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Box className="bg">
      <Box backgroundColor={"primary.main"} className="loginCard">
        <img src={logo}></img>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Nombre"}
              {...register("name", { required: "El nombre es requerido" })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </Box>
          
          <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Usuario"}
              {...register("user", { required: "El usuario es requerido" })}
            />
            {errors.user && <span>{errors.user.message}</span>}
          </Box>
          
          <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Email"}
              {...register("email", {
                required: "Debe ingresar un email",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Debe ingresar un email válido",
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </Box>
          
          <Box className={"input-box"}>
            <Input
              type={"password"}
              placeholder={"Contraseña"}
              {...register("password", { required: "Debe incresar una contraseña" })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </Box>
          
          <Box className={"input-box"}>
            <Input
              type={"date"}
              placeholder={"Fecha de nacimiento"}
              {...register("date", { required: "Debe ingresar la fecha de nacimiento" })}
            />
            {errors.date && <span>{errors.date.message}</span>}
          </Box>
          
          <Button marginTop={"10px"} backgroundColor={"primary.dark"} type={"submit"}>
            Ingresar
          </Button>
        </form>
        <p>Ya tiene una cuenta?</p>
        <Link style={{color: "white"}} to="/login">Iniciar Sesión</Link>
      </Box>
    </Box>
  );
};

export default SignUp;