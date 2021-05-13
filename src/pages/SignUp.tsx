import { Box, Input, Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import "../styles/forms.css";
import { Link } from "react-router-dom";
import { createUser } from "../api/user";
import { IUserSignUp } from "../models/User";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Status } from "../utils/types";
//import logo from "../assets/img/logoLogin.png";

const SignUp = () => {
  const toast = useToast();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch 
  } = useForm();

  const logInAndGetUser = useCallback(
    (body: IUserSignUp) => {
      const signUpUserAsync = async () => {
        const status = await createUser(body);
        if (status === Status.SUCCESS) {
          toast({
            title: "Creado",
            description: "Usuario creado exitosamente",
            position: "top-right",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          history.push("/login");
        } else {
          toast({
            title: "Error",
            description: `El usuario ${body.username} ya existe`,
            position: "top-right",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      };
      signUpUserAsync();
    },
    [toast,history]
  );

  const onSubmit = (data: IUserSignUp) => {
    delete data['password2']
    logInAndGetUser(data);
    
  };

  return (
    <Box className="bg">
      <Box backgroundColor={"primary.main"} className="loginCard">
        LOGO
        {/* <img alt={"logo"} src={logo} /> */}
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Nombre"}
              {...register("nombre", {
                required: "El nombre es requerido", 
                maxLength:{
                  value:20,
                  message:'Usar máximo 20 caracteres'
                },
                pattern:{
                  value:/(?=(?:^\w))([A-Za-zÀ-ÖØ-öø-ÿ ]+)(?<=[^ ])$/,
                  message:'No se permiten espacios en blanco'
                }
              })}
            />
            {errors.nombre && <span>{errors.nombre.message}</span>}
          </Box>

          <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Usuario"}
              {...register("username", { 
                required: "El usuario es requerido",
                maxLength:{
                  value:15,
                  message:'Usar máximo 15 caracteres'
                },
                pattern:{
                  value:/^\S*$/,
                  message:'No se permiten espacios en blanco'
                }
              })}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </Box>

          <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Email"}
              {...register("correo", {
                required: "Debe ingresar un email",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Debe ingresar un email válido",
                },
              })}
            />
            {errors.correo && <span>{errors.correo.message}</span>}
          </Box>

          <Box className={"input-box"}>
            <Input
              type={"password"}
              placeholder={"Contraseña"}
              {...register("password", {
                required: "Debe ingresar una contraseña",
                minLength: {
                  value:8,
                  message:"Debe contener minimo 8 caracteres"
                },
                pattern:{
                  value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:'Usar minúsculas, mayúsculas y números '
                }
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </Box>

          <Box className={"input-box"}>
            <Input
              type={"password"}
              placeholder={"Repetir Contraseña"}
              {...register("password2", {
                validate: (value) => value === watch('password') || "La contraseña no coincide."
              })}
            />
            {errors.password2 && <span>{errors.password2.message}</span>}
          </Box>

          <Box className={"input-box"}>
            <Input
              type={"date"}
              max={ new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0] }
              placeholder={"Fecha de nacimiento"}
              {...register("fechaNacimiento", {
                required: "Debe ingresar la fecha de nacimiento",
              })}
            />
            {errors.fechaNacimiento && (
              <span>{errors.fechaNacimiento.message}</span>
            )}
          </Box>

          <Button
            marginTop={"10px"}
            backgroundColor={"primary.dark"}
            type={"submit"}
          >
            Ingresar
          </Button>
        </form>
        <p>Ya tiene una cuenta?</p>
        <Link style={{ color: "white" }} to="/login">
          Iniciar Sesión
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;
