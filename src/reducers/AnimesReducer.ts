import { IAnimes } from "../models/Anime";

export enum AnimesActionType {
  SET_ANIMES,
}

export interface IAnimesReducer {
  type: AnimesActionType;
  animes: IAnimes;
}

export const animesReducer = (state: IAnimes, action: IAnimesReducer) => {
  switch (action.type) {
    case AnimesActionType.SET_ANIMES:
      return {
        ...state,
        animes: action.animes.animes,
        status: action.animes.status,
      };
    default:
      return state;
  }
};
