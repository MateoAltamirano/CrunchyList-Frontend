import { Status } from "../utils/types";

export interface IUser {
  idUsuario?: number;
  nombre?: string;
  username?: string;
  correo?: string;
  fechaNacimiento?: string;
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
