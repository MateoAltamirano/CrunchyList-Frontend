import { createContext, useReducer } from "react";
import { IUser } from "../models/User";
import { userReducer, IReducer } from "../reducers/UserReducer";

const initialState: IUser = {
  isAuthenticated: false,
  firstName: "",
};
export type UserContext = {
  state: IUser;
  dispatch: React.Dispatch<IReducer>;
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