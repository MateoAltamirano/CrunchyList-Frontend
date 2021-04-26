import axios from "axios";
import { IUsuarioAnime } from "../models";
import { IAnime, ICategory } from "../models/Anime";
import { IAnimesReducer, AnimesActionType } from "../reducers/AnimesReducer";
import { ISingleAnimesReducer, SingleAnimesActionType } from "../reducers/SingleAnimeReducer";
import { Status } from "../utils/types";
import {enviromentDev} from "./baseRoute"

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
  }
};

export const getSingleAnime= async (id:number,dispatch: React.Dispatch<ISingleAnimesReducer>) =>{
  let anime:Array<IAnime>;
  let categories: Array<ICategory>
  try {
    const response = await axios.get(`${enviromentDev.url}/getAnime/${id}`);
    const response2 = await axios.get(`${enviromentDev.url}/getAnime/${id}/categorias`);
    anime = response.data;
    categories = response2.data
    dispatch({
      type: SingleAnimesActionType.SET_SINGLE_ANIME,
      anime: {anime,categories,status: Status.SUCCESS}
    });
  } catch (error) {
    console.log(error.message);
  }
}

export const addTofavorites=async (idUsuario:number|undefined, body : IUsuarioAnime,token: string | undefined)=>{
  try {
    if(token){
      const response = await axios.post(`${enviromentDev.url}/lista/${idUsuario}`,body,{ headers: { "X-JWT-Token": token }});
      if(response.status>=200)
      return Status.SUCCESS
    }else{
      return Status.FAILED
    }
  } catch (error) {
    console.log(error.message);
    return Status.FAILED
  }
}
