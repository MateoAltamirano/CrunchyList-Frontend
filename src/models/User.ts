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
