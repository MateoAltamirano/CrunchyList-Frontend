import { Box, Input, Button } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import "../styles/forms.css";
import logo from "../assets/img/LogoWhiteMAL.png";
import { Link } from "react-router-dom";
import { getUserByUsername, login } from "../api/user";
import { IUserLogIn } from "../models/";
import { useHistory } from "react-router-dom";
import { userContext } from "../providers/UserContext";
import { Status } from "../utils/types";
import { useToast } from "@chakra-ui/react";

const LogIn = () => {
  const user = useContext(userContext);
  if (user === undefined) throw new Error("Please use within Provider");
  const history = useHistory();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logInAndGetUser = useCallback(
    (body: IUserLogIn) => {
      const logInAndGetUserAsync = async () => {
        const status = await login(body, user.dispatch);
        if (status === Status.SUCCESS) {
          history.push("/");
          await getUserByUsername(undefined, body.username!, user.dispatch);
          toast({
            title: "Bienvenido",
            description: body.username,
            position: "top-right",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error.",
            description: "Algo Salió mal.",
            position: "top-right",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      };
      logInAndGetUserAsync();
    },
    [user.dispatch, history, toast]
  );

  const onSubmit = (data: IUserLogIn) => {
    logInAndGetUser(data);
  };

  return (
    <Box className="bg">
      <Box backgroundColor={"primary.main"} className="loginCard">
        <img alt={"logo"} src={logo}></img>
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

          <Button
            marginTop={"10px"}
            backgroundColor={"primary.dark"}
            type={"submit"}
          >
            Ingresar
          </Button>
        </form>
        <p>No tiene una cuenta?</p>
        <Link style={{ color: "white" }} to="/signup">
          Crear cuenta
        </Link>
      </Box>
    </Box>
  );
};

export default LogIn;
