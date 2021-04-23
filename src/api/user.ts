import axios, { AxiosResponse, AxiosError } from "axios";
import { IUserReducer, UserActionType } from "../reducers/UserReducer";
import { Status } from "../utils/types";
import {IUser, IUserLogIn} from '../models'
import {enviromentDev} from "./baseRoute"

export const getUserById = (
  
  id: string,
  dispatch: React.Dispatch<IUserReducer>
) => {
  axios
    .get(`http://localhost:8080/user/${id}`)
    .then((response: AxiosResponse) => {
      dispatch({
        type: UserActionType.SET_USER,
        user: { ...response.data, status: Status.SUCCESS },
      });
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
    });
  //Esto es temporal solo es para simular que hace el request
  // setTimeout(() => {
  //   dispatch({
  //     type: UserActionType.SET_USER,
  //     user: { firstName: "Mateo", status: Status.SUCCESS },
  //   });
  // }, 3000);

  
};

export const logIn = (body: IUserLogIn)=>{
  return axios.post(`${enviromentDev.url}/`,body)

}

export const createUser = (body: IUser) => {
  return axios.post(`${enviromentDev.url}/getUsuario`,body)
    
};
