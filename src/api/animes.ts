import axios from "axios";
import { IAnime } from "../models/Anime";
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
  try {
    const response = await axios.get(`${enviromentDev.url}/getAnime/${id}`);
    anime = response.data;
    console.log("anime",anime)
    dispatch({
      type: SingleAnimesActionType.SET_SINGLE_ANIME,
      anime: anime,
    });
  } catch (error) {
    console.log(error.message);
  }
}
