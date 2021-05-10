import axios from "axios";
import { ILista, IUsuarioAnime } from "../models";
import { IAnime, ICategory } from "../models/Anime";
import { IEstado } from "../models/Estado";
import { IAnimesReducer, AnimesActionType } from "../reducers/AnimesReducer";
import {
  ISingleAnimesReducer,
  SingleAnimesActionType,
} from "../reducers/SingleAnimeReducer";
import { Status } from "../utils/types";
import { enviromentDev } from "./baseRoute";

export const getAllAnimes = async (
  dispatch: React.Dispatch<IAnimesReducer>
) => {
  let animes = [];
  try {
    const response = await axios.get(`${enviromentDev.url}/getAnime`);
    animes = response.data;
    dispatch({
      type: AnimesActionType.SET_ANIMES,
      animes: { animes, status: Status.SUCCESS },
    });
  } catch (error) {
    console.log(error.message);
    
    dispatch({
      type: AnimesActionType.SET_ANIMES,
      animes: { animes, status: Status.FAILED },
    });
  }
};

export const getAnimesSearch = async (
  texto: string,
  dispatch: React.Dispatch<IAnimesReducer>
) => {
  let animes = [];
  try {
    const response = await axios.get(`${enviromentDev.url}/getAnime/find/${texto}`);
    animes = response.data;
    dispatch({
      type: AnimesActionType.SET_ANIMES,
      animes: { animes, status: Status.SUCCESS },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSingleAnime = async (
  id: number,
  dispatch: React.Dispatch<ISingleAnimesReducer>,
  idUser?: number,
  token?:string
) => {
  let anime: Array<IAnime>;
  let categories: Array<ICategory>;
  let lista:Array<ILista>;
  let estados:Array<IEstado>;
  try {
    const responseAnime = await axios.get(`${enviromentDev.url}/getAnime/${id}`);
    const responseCategorias = await axios.get(
      `${enviromentDev.url}/getAnime/${id}/categorias`
    );
    let responseLista;
    if(token){
      responseLista = await axios.get(`${enviromentDev.url}/lista/exists/${idUser}/${id}`,{ headers: { "X-JWT-Token": token } })
    }else{
      responseLista={data:[]};
    }
    
    const responseEstados = await axios.get(`${enviromentDev.url}/estado`)
    anime = responseAnime.data;
    categories = responseCategorias.data;
    lista = responseLista.data;
    estados = responseEstados.data;
    dispatch({
      type: SingleAnimesActionType.SET_SINGLE_ANIME,
      anime: { anime, categories, lista,estados, status: Status.SUCCESS },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addToList = async (
  idUsuario: number | undefined,
  body: IUsuarioAnime,
  token: string | undefined
) => {
  try {
    if (token) {
      const response = await axios.post(
        `${enviromentDev.url}/lista/${idUsuario}`,
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

export const getTopAnimes = async (
  dispatch: React.Dispatch<IAnimesReducer>
) => {
  let topAnimes: IAnime[] = [];
  try {
    const response = await axios.get(`${enviromentDev.url}/getAnime`);
    topAnimes = response.data;
    topAnimes.sort(
      (a, b) => (a.ranking ? a.ranking : 0) - (b.ranking ? b.ranking : 0)
    );
    dispatch({
      type: AnimesActionType.TOP_ANIMES,
      animes: { top: topAnimes, status: Status.SUCCESS },
    });
  } catch (error) {
    console.log(error.message);
  }
};
