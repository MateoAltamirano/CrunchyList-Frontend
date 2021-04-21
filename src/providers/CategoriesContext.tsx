import { createContext, useReducer } from "react";
import { ICategories } from "../models/Category";
import {
  categoriesReducer,
  ICategoriesReducer,
} from "../reducers/CategoryReducer";
import { Status } from "../utils/types";

const initialState: ICategories = {
  categories: [],
  status: Status.LOADING,
};

export type CategoriesContext = {
  state: ICategories;
  dispatch: React.Dispatch<ICategoriesReducer>;
};

export const categoriesContext = createContext<CategoriesContext | undefined>(
  undefined
);

const CategoriesContextProvider: React.FC = ({ children }) => {
  const [categoriesState, dispatch] = useReducer(
    categoriesReducer,
    initialState
  );
  return (
    <categoriesContext.Provider value={{ state: categoriesState, dispatch }}>
      {children}
    </categoriesContext.Provider>
  );
};

export default CategoriesContextProvider;
