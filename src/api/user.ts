import axios from 'axios';
import { IUserReducer, UserActionType } from '../reducers/UserReducer';
import { Status } from '../utils/types';
import { IUserLogIn } from '../models';
import {
  ISearchUser,
  IUser,
  IUserAnime,
  IUserAnimeFavs,
  IUserSignUp,
} from '../models/User';
import { enviromentDev } from './baseRoute';

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
        { headers: { 'X-JWT-Token': token } }
      );
      user = response.data[0];
      try {
        const response = await axios.get(
          `${enviromentDev.url}/usuario/${user.idUsuario}/favoritos`,
          { headers: { 'X-JWT-Token': token } }
        );
        const favs: IUserAnimeFavs[] = response.data;
        user.favs = favs;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/1`,
          { headers: { 'X-JWT-Token': token } }
        );
        const seen: IUserAnime[] = response.data;
        user.seen = seen;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/2`,
          { headers: { 'X-JWT-Token': token } }
        );
        const watching: IUserAnime[] = response.data;
        user.watching = watching;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/3`,
          { headers: { 'X-JWT-Token': token } }
        );
        const waiting: IUserAnime[] = response.data;
        user.waiting = waiting;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/4`,
          { headers: { 'X-JWT-Token': token } }
        );
        const discarted: IUserAnime[] = response.data;
        user.discarted = discarted;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/5`,
          { headers: { 'X-JWT-Token': token } }
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
      if (response.status === 201 && response.data !== 'No existe el usuario') {
        token = response.data[0].token;
        dispatch({ type: UserActionType.LOGIN, user: { token } });
        localStorage.setItem('token', token);
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
      alert('Algo salio mal');
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
  if (token) {
    try {
      const response = await axios.get(
        `${enviromentDev.url}/getUsuario/${username}`,
        { headers: { 'X-JWT-Token': token } }
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
        { headers: { 'X-JWT-Token': token } }
      );
      user = response.data[0];

      try {
        const response = await axios.get(
          `${enviromentDev.url}/usuario/${user.idUsuario}/favoritos`,
          { headers: { 'X-JWT-Token': token } }
        );
        const favs: IUserAnimeFavs[] = response.data;
        user.favs = favs;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/1`,
          { headers: { 'X-JWT-Token': token } }
        );
        const seen: IUserAnime[] = response.data;
        user.seen = seen;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/2`,
          { headers: { 'X-JWT-Token': token } }
        );
        const watching: IUserAnime[] = response.data;
        user.watching = watching;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/3`,
          { headers: { 'X-JWT-Token': token } }
        );
        const waiting: IUserAnime[] = response.data;
        user.waiting = waiting;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/4`,
          { headers: { 'X-JWT-Token': token } }
        );
        const discarted: IUserAnime[] = response.data;
        user.discarted = discarted;
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response = await axios.get(
          `${enviromentDev.url}/lista/${user.idUsuario}/estado/5`,
          { headers: { 'X-JWT-Token': token } }
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
export const editAnime = async (
  anime: IUserAnime,
  dispatch: React.Dispatch<IUserReducer>
  // prevToken: string | undefined = undefined
) => {
  let token;
  try {
    const response = await axios.post(`${enviromentDev.url}/` /*body*/);
    if (response.status === 201 && response.data !== 'No existe el usuario') {
      token = response.data[0].token;
      dispatch({ type: UserActionType.LOGIN, user: { token } });
      localStorage.setItem('token', token);
      return Status.SUCCESS;
    } else {
      return Status.FAILED;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAnime = async (
  idAnime: number,
  usuario: IUser,
  dispatch: React.Dispatch<IUserReducer>,
  listName: string
) => {
  let user = { ...usuario };
  let list: IUserAnime[] | undefined;
  switch (listName) {
    case 'seen':
      list = user.seen;
      break;
    case 'watching':
      list = user.watching;
      break;
    case 'waiting':
      list = user.waiting;
      break;
    case 'discarted':
      list = user.discarted;
      break;
    case 'toSee':
      list = user.toSee;
      break;
    default:
      break;
  }
  try {
    if (user.token) {
      const response = await axios.delete(
        `${enviromentDev.url}/lista/${user.idUsuario}/${idAnime}`,
        { headers: { 'X-JWT-Token': user.token } }
      );
      if (response.status === 200) {
        switch (listName) {
          case 'seen':
            user.seen = list!.filter((anime) => anime.idAnime !== idAnime);
            break;
          case 'watching':
            user.watching = list!.filter((anime) => anime.idAnime !== idAnime);
            break;
          case 'waiting':
            user.waiting = list!.filter((anime) => anime.idAnime !== idAnime);
            break;
          case 'discarted':
            user.discarted = list!.filter((anime) => anime.idAnime !== idAnime);
            break;
          case 'toSee':
            user.toSee = list!.filter((anime) => anime.idAnime !== idAnime);
            break;
          default:
            break;
        }
        dispatch({ type: UserActionType.SET_USER, user });
        return { status: Status.SUCCESS, list };
      }
    } else {
      return { status: Status.FAILED, list };
    }
  } catch (error) {
    console.log(error.message);
    return { status: Status.FAILED, list };
  }
};
