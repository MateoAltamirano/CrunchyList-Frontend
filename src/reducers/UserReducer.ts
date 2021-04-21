import { IUser } from "../models/User";

export enum UserActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGN_IN = "SIGN_IN",
  UPDATE_NAME = "UPDATE_NAME",
  SET_USER = "SET_USER",
}
export interface IUserReducer {
  type: UserActionType;
  user: IUser;
  
}

export const userReducer = (state: IUser, action: IUserReducer) => {
  switch (action.type) {
    case UserActionType.SET_USER:
      return { ...state, ...action.user };
    case UserActionType.UPDATE_NAME:
      const { firstName } = action.user;
      return { ...state, firstName };
    case UserActionType.LOGIN:
      return { ...state,...action.user };
    case UserActionType.LOGOUT:
      return { ...state, isAuthenticated: action.user.isAuthenticated };
    default:
      return state;
  }
};
