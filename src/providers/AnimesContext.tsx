import { createContext, useReducer } from "react";
import { IAnimes } from "../models/Anime";
import { animesReducer, IAnimesReducer } from "../reducers/AnimesReducer";
import { Status } from "../utils/types";

const initialState: IAnimes = {
  animes: [],
  status: Status.LOADING,
};

export type AnimesContext = {
  state: IAnimes;
  dispatch: React.Dispatch<IAnimesReducer>;
};

export const animesContext = createContext<AnimesContext | undefined>(
  undefined
);

const AnimesContextProvider: React.FC = ({ children }) => {
  const [animesState, dispatch] = useReducer(animesReducer, initialState);
  return (
    <animesContext.Provider value={{ state: animesState, dispatch }}>
      {children}
    </animesContext.Provider>
  );
};

export default AnimesContextProvider;
