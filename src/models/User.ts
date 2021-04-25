import { Status } from "../utils/types";

export interface IUser {
  idUsuario?: number;
  nombre?: string;
  username?: string;
  correo?: string;
  fechaNacimiento?: string;
  favs?: IUserAnimeFavs[];
  seen?: IUserAnime[];
  watching?: IUserAnime[];
  waiting?: IUserAnime[];
  discarted?: IUserAnime[];
  toSee?: IUserAnime[];
  isAuthenticated?: boolean;
  status?: Status;
  token?: string;
}

export interface IUserSignUp {
  nombre: string;
  username: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
}

export interface IUserAnimeFavs {
  idAnime: number;
  idUsuario: number;
  imagen: string;
  nombre: string;
  sinopsis: string;
}

export interface IUserAnime {
  idAnime: number;
  idEstado: number;
  idUsuario: number;
  imagen: string;
  nombre: string;
  fechaInicioVer: string;
  porcentajeVisto: number;
}
