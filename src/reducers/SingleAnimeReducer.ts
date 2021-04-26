import { IAnime, IAnimes ,ICategory,ISingleAnime} from "../models/Anime";
import { Status } from "../utils/types";

export enum SingleAnimesActionType {
  SET_SINGLE_ANIME,
}

export interface ISingleAnimesReducer {
  type: SingleAnimesActionType;
  anime: ISingleAnime
}

export const singleAnimesReducer = (state: ISingleAnime, action: ISingleAnimesReducer) => {
  console.log("state",state)
  switch (action.type) {
    case SingleAnimesActionType.SET_SINGLE_ANIME:
      return {
        ...state,
        anime: action.anime.anime,
        categories:action.anime.categories,
        status: action.anime.status,
      };
    default:
      return state;
  }
};
