import { IUser } from "../models/User";

export enum UserActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGN_IN = "SIGN_IN",
  UPDATE_NAME = "UPDATE_NAME",
  SET_INFO = "SET_USER_INFO",
}

export enum Status {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
export interface IReducer {
  type: UserActionType;
  user: IUser;
  
}

export const userReducer = (state: IUser, action: IReducer) => {
  switch (action.type) {
    case UserActionType.SET_INFO:
      return { ...state, ...action.user };
    case UserActionType.UPDATE_NAME:
      const { firstName } = action.user;
      return { ...state, firstName };
    case UserActionType.LOGIN:
      return { ...state, isAuthenticated: action.user.isAuthenticated };
    case UserActionType.LOGOUT:
      return { ...state, isAuthenticated: action.user.isAuthenticated };
    default:
      return state;
  }
};
