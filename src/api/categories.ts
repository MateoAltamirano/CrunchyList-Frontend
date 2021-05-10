import axios from "axios";
import { ICategory } from "../models/Category";
import {
  ICategoriesReducer,
  CategoriesActionType,
} from "../reducers/CategoriesReducer";
import { Status } from "../utils/types";
import { enviromentDev } from "./baseRoute";

export const getAnimesByCategory = async (
  dispatch: React.Dispatch<ICategoriesReducer>
) => {
  let categories = [];
  let categoriesWithAnime: ICategory[] = [];
  try {
    const response = await axios.get(`${enviromentDev.url}/categoria`);
    categories = response.data;
    dispatch({
      type: CategoriesActionType.SET_CATEGORIES,
      categories: { categories, status: Status.LOADING },
    });
    
    for (let category of categories) {
      await getCategory(categoriesWithAnime, category);
    }
    dispatch({
      type: CategoriesActionType.SET_CATEGORIES,
      categories: { categories: categoriesWithAnime, status: Status.SUCCESS },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: CategoriesActionType.SET_CATEGORIES,
      categories: { categories: categoriesWithAnime, status: Status.FAILED },
    });
  }
};

const getCategory = async (categories: ICategory[], category: ICategory) => {
  try {
    const response = await axios.get(
      `${enviromentDev.url}/categoria/${category.idCategoria}/animes`
    );
    category = { ...category, animes: response.data };
    categories.push(category);
  } catch (error) {
    console.log(error.message);
  }
};
