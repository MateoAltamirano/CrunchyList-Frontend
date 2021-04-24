import axios from "axios";
import { IUserReducer, UserActionType } from "../reducers/UserReducer";
import { Status } from "../utils/types";
import { IUserLogIn } from "../models";
import { IUser, IUserSignUp } from "../models/User";
import { enviromentDev } from "./baseRoute";

export const getUserById = async (
  username: string,
  dispatch: React.Dispatch<IUserReducer>
) => {
  let user: IUser;
  try {
    const response = await axios.get(
      `${enviromentDev.url}/getUsuario/${username}`
    );
    user = response.data[0];
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
  } catch (error) {
    console.log(error.message);
  }
};
