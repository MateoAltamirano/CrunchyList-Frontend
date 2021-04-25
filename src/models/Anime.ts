import { Status } from "../utils/types";

export interface IAnime {
  idAnime?: number;
  nombre?: string;
  sinopsis?: string;
  nroEpisodios?: number;
  estadoEmision?: string;
  fechaEstreno?: string;
  estudio?: string;
  duracionMinutos?: number;
  score?: number;
  ranking?: number;
  popularidad?: number;
  nroFavoritos?: number;
  imagen?: string;
}

export interface ICategory{
  id:number;
  nombre:string;
}

export interface IAnimes {
  animes?: IAnime[];
  populares?: IAnime[];
  top?: IAnime[];
  status?: Status;
}
export interface ISingleAnime{
  anime?:IAnime[];
  categories?:ICategory[];
  status?:Status;
}
