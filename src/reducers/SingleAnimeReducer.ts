import { IAnime, IAnimes ,ICategory,ISingleAnime} from "../models/Anime";
import { Status } from "../utils/types";

export enum SingleAnimesActionType {
  SET_SINGLE_ANIME,
}

export interface ISingleAnimesReducer {
  type?: SingleAnimesActionType;
  anime?: Array<IAnime>;
  categories?:Array<ICategory>;
}

export const singleAnimesReducer = (state: ISingleAnime, action: ISingleAnimesReducer) => {
  switch (action.type) {
    case SingleAnimesActionType.SET_SINGLE_ANIME:
      return {
        anime:action.anime,
        status: Status.SUCCESS,
        categories:state.categories
      };
    default:
      console.log("acts",action.type)
      return state;
  }
};
