import { Box, Input, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "../providers/UserContext";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import "../styles/forms.css";
import logo from "../assets/img/LogoWhiteMAL.png";
import { Link } from "react-router-dom";
import { createUser } from "../api/user";
import { IUser } from "../models/";
import { AxiosResponse, AxiosError } from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const user = useContext(userContext);
  if (user === undefined)
    throw new Error("Please use within UserContextProvider");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: IUser) => {
    console.log(data);
    //let createdUser = createUser;
    let res = createUser;
    res(data)
      .then((response: AxiosResponse) => {
        console.log(response);
        if (response.status === 200) {
          alert("Usuario creado");
          history.push("/login");
        }
        // dispatch({
        //   type: UserActionType.SET_INFO,
        //   user: { ...response.data, status: Status.SUCCESS },
        // });
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  };

  return (
    <Box className="bg">
      <Box backgroundColor={"primary.main"} className="loginCard">
        <img alt={"logo"} src={logo} />
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Nombre"}
              {...register("nombre", { required: "El nombre es requerido" })}
            />
            {errors.nombre && <span>{errors.nombre.message}</span>}
          </Box>

          <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Usuario"}
              {...register("username", { required: "El usuario es requerido" })}
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
                required: "Debe incresar una contraseña",
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </Box>

          <Box className={"input-box"}>
            <Input
              type={"date"}
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
