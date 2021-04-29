import { createContext, useReducer } from "react";
import { ISingleAnime } from "../models/Anime";
import {
  singleAnimesReducer,
  ISingleAnimesReducer,
} from "../reducers/SingleAnimeReducer";
import { Status } from "../utils/types";

const initialState: ISingleAnime = {
  anime: [],
  categories: [],
  lista:[],
  estados:[],
  status: Status.LOADING,
};

export type SingleAnimesContext = {
  state: ISingleAnime;
  dispatch: React.Dispatch<ISingleAnimesReducer>;
};

export const singleAnimesContext = createContext<
  SingleAnimesContext | undefined
>(undefined);

const SingleAnimesContextProvider: React.FC = ({ children }) => {
  const [singleAnimesState, dispatch] = useReducer(
    singleAnimesReducer,
    initialState
  );

  return (
    <singleAnimesContext.Provider
      value={{ state: singleAnimesState, dispatch }}
    >
      {children}
    </singleAnimesContext.Provider>
  );
};

export default SingleAnimesContextProvider;
