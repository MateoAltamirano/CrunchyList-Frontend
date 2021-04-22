import { Status } from "../utils/types";
import { IAnime } from "./Anime";

export interface ICategory {
  idCategoria?: number;
  nombre?: string;
  animes?: IAnime[];
}

export interface ICategories {
  categories?: ICategory[];
  status?: Status;
}
