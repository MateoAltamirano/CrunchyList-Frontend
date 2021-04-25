import { createContext, useReducer } from "react";
import { IUser } from "../models/User";
import { userReducer, IUserReducer } from "../reducers/UserReducer";
import { Status } from "../utils/types";

export const initialState: IUser = {
  idUsuario: undefined,
  nombre: "",
  username: undefined,
  isAuthenticated: false,
  status: Status.LOADING,
  token: "",
};

export type UserContext = {
  state: IUser;
  dispatch: React.Dispatch<IUserReducer>;
};

export const userContext = createContext<UserContext | undefined>(undefined);

const UserContextProvider: React.FC = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  return (
    <userContext.Provider value={{ state: userState, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
