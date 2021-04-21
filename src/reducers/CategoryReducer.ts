import { ICategories } from "../models/Category";

export enum CategoriesActionType {
  SET_CATEGORIES = "SET_CATEGORIES",
}

export interface ICategoriesReducer {
  type: CategoriesActionType;
  categories: ICategories;
}

export const categoriesReducer = (
  state: ICategories,
  action: ICategoriesReducer
) => {
  switch (action.type) {
    case CategoriesActionType.SET_CATEGORIES:
      return { ...state, ...action.categories };
    default:
      return state;
  }
};
