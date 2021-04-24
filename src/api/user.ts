import axios from "axios";
import { IUserReducer, UserActionType } from "../reducers/UserReducer";
import { Status } from "../utils/types";
import { IUserLogIn } from "../models";
import { IUser } from "../models/User";
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
  }
  let token;
  try {
    const response = await axios.post(`${enviromentDev.url}/`, body);
    token = response.data[0].token;
    dispatch({ type: UserActionType.LOGIN, user: { token } });
    localStorage.setItem("token", token);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = (body: IUser) => {
  return axios.post(`${enviromentDev.url}/getUsuario`, body);
};
