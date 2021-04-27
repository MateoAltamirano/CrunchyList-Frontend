import { ISingleAnime } from "../models/Anime";

export enum SingleAnimesActionType {
  SET_SINGLE_ANIME,
}

export interface ISingleAnimesReducer {
  type: SingleAnimesActionType;
  anime: ISingleAnime;
}

export const singleAnimesReducer = (
  state: ISingleAnime,
  action: ISingleAnimesReducer
) => {
  console.log("state", state);
  switch (action.type) {
    case SingleAnimesActionType.SET_SINGLE_ANIME:
      return {
        ...state,
        anime: action.anime.anime,
        categories: action.anime.categories,
        status: action.anime.status,
      };
    default:
      return state;
  }
};
