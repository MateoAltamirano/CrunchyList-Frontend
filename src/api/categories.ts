import axios from "axios";
import { ICategory } from "../models/Category";
import {
  ICategoriesReducer,
  CategoriesActionType,
} from "../reducers/CategoriesReducer";
import { Status } from "../utils/types";

export const getAnimesByCategory = async (
  dispatch: React.Dispatch<ICategoriesReducer>
) => {
  let categories = [];
  try {
    const response = await axios.get("http://localhost:8443/categoria");
    categories = response.data;
    dispatch({
      type: CategoriesActionType.SET_CATEGORIES,
      categories: { categories, status: Status.LOADING },
    });
    let categoriesWithAnime: ICategory[] = [];
    for (let category of categories) {
      await getCategory(categoriesWithAnime, category);
    }
    dispatch({
      type: CategoriesActionType.SET_CATEGORIES,
      categories: { categories: categoriesWithAnime, status: Status.SUCCESS },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getCategory = async (categories: ICategory[], category: ICategory) => {
  try {
    const response = await axios.get(
      `http://localhost:8443/categoria/${category.idCategoria}/animes`
    );
    category = { ...category, animes: response.data };
    categories.push(category);
  } catch (error) {
    console.log(error.message);
  }
};
