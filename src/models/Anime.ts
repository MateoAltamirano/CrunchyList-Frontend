import { Status } from "../utils/types";
import { IEstado } from "./Estado";
import { ILista } from "./Lista";

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
  idCategoria:number;
  nombre:string;
}

export interface IAnimes {
  animes?: IAnime[];
  populares?: IAnime[];
  top?: IAnime[];
  status?: Status;
}
export interface ISingleAnime{
  anime:IAnime[];
  categories:ICategory[];
  lista:ILista[];
  estados:IEstado[]
  status:Status;
}
