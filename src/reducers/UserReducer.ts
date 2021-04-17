import { IUser } from "../models/User";

export enum UserActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGN_IN = "SIGN_IN",
  UPDATE_USER = "UPDATE_NAME",
}
export interface IReducer {
  type: UserActionType;
  user: IUser;
}

export const userReducer = (state: IUser, action: IReducer) => {
  switch (action.type) {
    case UserActionType.UPDATE_USER:
      return action.user;
    case UserActionType.LOGIN:
      return { ...state, isAuthenticated: action.user.isAuthenticated };
    case UserActionType.LOGOUT:
      return { ...state, isAuthenticated: action.user.isAuthenticated };
    default:
      return state;
  }
};
