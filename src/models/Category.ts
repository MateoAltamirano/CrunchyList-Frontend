import { Status } from "../utils/types";
import { IAnime } from "./Anime";

export interface ICategory {
  name?: string;
  animes?: IAnime[];
}

export interface ICategories {
  categories?: ICategory[];
  status?: Status;
}
