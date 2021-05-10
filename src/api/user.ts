import axios from "axios";
import { IUserReducer, UserActionType } from "../reducers/UserReducer";
import { Status } from "../utils/types";
import { IUserLogIn, IFavorito } from "../models";
import { ISearchUser, IUser, IUserAnime, IUserAnimeFavs, IUserSignUp } from "../models/User";
import { enviromentDev } from "./baseRoute";
import { IFollow } from "../models/Follow";

export const getUserByUsername = async (
  token: string | undefined,
  username: string,
  dispatch: React.Dispatch<IUserReducer>
) => {
  try {
    if (token) {
      let user: IUser;
      const response = await axios.get(
        `${enviromentDev.url}/usuario/${username}`,
        { headers: { "X-JWT-Token": token } }
      );
      user = response.data[0];
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
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/3`,
          { headers: { "X-JWT-Token": token } }
        );
        const waiting: IUserAnime[] = response.data;
        user.waiting = waiting;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/4`,
          { headers: { "X-JWT-Token": token } }
        );
        const discarted: IUserAnime[] = response.data;
        user.discarted = discarted;
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
      user.status = Status.SUCCESS;
      dispatch({ type: UserActionType.SET_USER, user });
    }
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

export const searchUsers = async (
  username: string,
  token: string | undefined
) => {
  console.log(token);
  if(token){
    try {
      const response = await axios.get(
        `${enviromentDev.url}/getUsuario/${username}`,
        { headers: { "X-JWT-Token": token } }
      );
      const users: ISearchUser[] = response.data;
      console.log(users);
      return users;
    } catch (error) {
      console.log(error.message);
    }
  }
};




export const getFriendByUsername = async (
  token: string | undefined,
  username: string
) => {
  try {
    if (token) {
      let user: IUser;
      const response = await axios.get(
        `${enviromentDev.url}/usuario/${username}`,
        { headers: { "X-JWT-Token": token } }
      );
      user = response.data[0];
      
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
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/3`,
          { headers: { "X-JWT-Token": token } }
        );
        const waiting: IUserAnime[] = response.data;
        user.waiting = waiting;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/4`,
          { headers: { "X-JWT-Token": token } }
        );
        const discarted: IUserAnime[] = response.data;
        user.discarted = discarted;
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
     
      return user;
    }
    
  } catch (error) {
    console.log(error.message);
  }
};


export const getFriends = async (
  userid: number | undefined,
  token: string | undefined
) => {
  console.log(userid);
  console.log(token);
  if(token){
    try {
      const response = await axios.get(
        `${enviromentDev.url}/usuario/${userid}/seguidos`,
        { headers: { "X-JWT-Token": token } }
      );
      const users: ISearchUser[] = response.data;
      console.log(users);
      return users;
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const follow = async (
  idUsuario: number | undefined,
  idSeguidor: number | undefined,
  body: IFollow,
  token: string | undefined
) => {
  try {
    if (token) {
      const response = await axios.post(
        `${enviromentDev.url}/usuario/${idUsuario}/${idSeguidor}`,
        body,
        { headers: { "X-JWT-Token": token } }
      );
      if (response.status >= 200) return Status.SUCCESS;
    } else {
      return Status.FAILED;
    }
  } catch (error) {
    console.log(error.message);
    return Status.FAILED;
  }
};

export const addFav= async (
  idUsuario: number | undefined,
  body: IFavorito,
  token: string | undefined
) => {
  try {
    if (token) {
      const response = await axios.post(
        `${enviromentDev.url}/usuario/favoritos`,
        body,
        { headers: { "X-JWT-Token": token } }
      );
      if (response.status >= 200) return Status.SUCCESS;
    } else {
      return Status.FAILED;
    }
  } catch (error) {
    console.log(error.message);
    return Status.FAILED;
  }
};
export const eliminarFav= async (
  idUsuario: number | undefined,
  idAnime: number,
  token: string | undefined
) => {
  try {
    if (token) {
      const response = await axios.delete(
        `${enviromentDev.url}/usuario/${idUsuario}/favoritos/${idAnime}`,
        { headers: { "X-JWT-Token": token } }
      );
      if (response.status >= 200) return Status.SUCCESS;
    } else {
      return Status.FAILED;
    }
  } catch (error) {
    console.log(error.message);
    return Status.FAILED;
  }
};




