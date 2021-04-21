import { Status } from "../reducers/UserReducer";

export interface IUser {
  isAuthenticated?: boolean;
  firstName?: string;
  status?: Status;
  token:string
}
