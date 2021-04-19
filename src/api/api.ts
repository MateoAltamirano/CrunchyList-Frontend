import axios, { AxiosResponse, AxiosError } from "axios";
import { IReducer, UserActionType, Status } from "../reducers/UserReducer";

export const getUserById = (id: string, dispatch: React.Dispatch<IReducer>) => {
  axios
    .get(`http://localhost:8080/user/${id}`)
    .then((response: AxiosResponse) => {
      console.log(response.data);
      dispatch({
        type: UserActionType.SET_INFO,
        user: { ...response.data, status: Status.SUCCESS },
      });
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
    });
  //Esto es temporal solo es para simular que hace el request
  setTimeout(() => {
    dispatch({
      type: UserActionType.SET_INFO,
      user: { firstName: "Mateo", status: Status.SUCCESS },
    });
  }, 3000);
};
