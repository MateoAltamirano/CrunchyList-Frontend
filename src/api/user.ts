import axios from "axios";
import { IUserReducer, UserActionType } from "../reducers/UserReducer";
import { Status } from "../utils/types";
import { IUserLogIn } from "../models";
import { IUser, IUserAnime, IUserAnimeFavs, IUserSignUp } from "../models/User";
import { enviromentDev } from "./baseRoute";
import { useToast } from "@chakra-ui/react"

export const getUserByUsername = async (
  token: string | undefined,
  username: string,
  dispatch: React.Dispatch<IUserReducer>
) => {
  try {
    let user: IUser;
    const response = await axios.get(
      `${enviromentDev.url}/getUsuario/${username}`
    );
    user = response.data[0];
    if (token) {
      try {
        const response = await axios.get(
          `${enviromentDev.url}/usuario/${user.idUsuario}/favoritos`,
          { headers: { "X-JWT-Token": token } }
        );
        const favs: IUserAnimeFavs[] = response.data;
        user.favs = favs;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/1`,
          { headers: { "X-JWT-Token": token } }
        );
        const seen: IUserAnime[] = response.data;
        user.seen = seen;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/2`,
          { headers: { "X-JWT-Token": token } }
        );
        const watching: IUserAnime[] = response.data;
        user.watching = watching;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/5`,
          { headers: { "X-JWT-Token": token } }
        );
        const toSee: IUserAnime[] = response.data;
        user.toSee = toSee;
      } catch (error) {
        console.log(error.message);
      }
    }
    user.status = Status.SUCCESS;
    dispatch({ type: UserActionType.SET_USER, user });
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (
  body: IUserLogIn,
  dispatch: React.Dispatch<IUserReducer>,
  prevToken: string | undefined = undefined
) => {
  if (prevToken) {
    dispatch({ type: UserActionType.LOGIN, user: { token: prevToken } });
  } else {
    let token;
    try {
      const response = await axios.post(`${enviromentDev.url}/`, body);
      if (response.status === 201 && response.data !== "No existe el usuario") {
        token = response.data[0].token;
        dispatch({ type: UserActionType.LOGIN, user: { token } });
        localStorage.setItem("token", token);
        return Status.SUCCESS;
      } else {
        return Status.FAILED;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const createUser = async (body: IUserSignUp) => {
  try {
    const response = await axios.post(`${enviromentDev.url}/getUsuario`, body);
    if (response.status !== 200) {
      alert("Algo salio mal");
    }
    return Status.SUCCESS;
  } catch (error) {
    console.log(error.message);
    return Status.FAILED;
  }
};
