import axios from "axios";
import { IAnimesReducer, AnimesActionType } from "../reducers/AnimesReducer";
import { Status } from "../utils/types";

export const getAllAnimes = async (
  dispatch: React.Dispatch<IAnimesReducer>
) => {
  let animes = [];
  try {
    const response = await axios.get("http://localhost:8443/getAnime");
    animes = response.data;
    dispatch({
      type: AnimesActionType.SET_ANIMES,
      animes: { animes, status: Status.SUCCESS },
    });
  } catch (error) {
    console.log(error.message);
  }
};
