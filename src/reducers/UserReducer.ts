import { IUser } from "../models/User";

export enum UserActionType {
  LOGIN,
  LOGOUT,
  SIGN_IN,
  UPDATE_NAME,
  SET_USER,
}
export interface IUserReducer {
  type: UserActionType;
  user: IUser;
}

export const userReducer = (state: IUser, action: IUserReducer) => {
  switch (action.type) {
    case UserActionType.SET_USER:
      return { ...state, ...action.user };
    case UserActionType.LOGIN:
      return { ...state, token: action.user.token, isAuthenticated: true };
    case UserActionType.LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
