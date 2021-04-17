import { IUser } from "../models/User";

enum ActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGN_IN = "SIGN_IN",
}
export interface IReducer {
  type: ActionType;
  user: IUser;
}

export const userReducer = (state: IUser, action: IReducer) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state, isAuthenticated: action.user.isAuthenticated };
    case ActionType.LOGOUT:
      return { ...state, isAuthenticated: action.user.isAuthenticated };
    default:
      return state;
  }
};
