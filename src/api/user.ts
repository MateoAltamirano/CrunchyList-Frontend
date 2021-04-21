import {enviromentDev} from "./baseRoute"
import {IUser, IUserLogIn} from '../models'
import axios, { AxiosResponse, AxiosError } from "axios";
import { IReducer, UserActionType, Status } from "../reducers/UserReducer";
import { Redirect } from "react-router-dom";
import {withRouter} from 'react-router-dom';


export const logIn = (body: IUserLogIn)=>{
  return axios.post(`${enviromentDev.url}/`,body)

}

export const createUser = (body: IUser) => {
  return axios.post(`${enviromentDev.url}/getUsuario`,body)
    // .then((response: AxiosResponse) => {
    //   console.log(response);
    //   if(response.status==200){  
    //     alert("Usuario creado")
    //     return "200";
    //   }
    //   // dispatch({
    //   //   type: UserActionType.SET_INFO,
    //   //   user: { ...response.data, status: Status.SUCCESS },
    //   // });
    // })
    // .catch((error: AxiosError) => {
    //   console.log(error.message);
    // });
  // //Esto es temporal solo es para simular que hace el request
  // setTimeout(() => {
  //   dispatch({
  //     type: UserActionType.SET_INFO,
  //     user: { firstName: "Mateo", status: Status.SUCCESS },
  //   });
  // }, 3000);
};

