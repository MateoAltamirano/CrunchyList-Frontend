import { IAnime, IAnimes ,ISingleAnime} from "../models/Anime";
import { Status } from "../utils/types";

export enum SingleAnimesActionType {
  SET_SINGLE_ANIME,
}

export interface ISingleAnimesReducer {
  type: SingleAnimesActionType;
  anime: Array<IAnime>;
}

export const singleAnimesReducer = (state: ISingleAnime, action: ISingleAnimesReducer) => {
  console.log("state",state)
  switch (action.type) {
    case SingleAnimesActionType.SET_SINGLE_ANIME:
      console.log("action.typesadas",action.type)
      return {
        anime:action.anime,
        status: Status.SUCCESS,
      };
    default:
      console.log("acts",action.type)
      return state;
  }
};
