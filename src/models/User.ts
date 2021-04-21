import { Status } from "../utils/types";

export interface IUser {
  isAuthenticated?: boolean;
  firstName?: string;
  status?: Status;
}
