import { Actions, ActionTypes, View } from "../actions/app";
import { Reducer } from "redux";

export interface IAppState {
  drawerOpened?: boolean;
  offline?: boolean;
  snackbarOpened?: boolean;
  view?: View;
}

export interface IState {
  app: IAppState;
}

const app: Reducer<IAppState, Actions> = (
  state = { drawerOpened: false },
  action
): IAppState => {
  switch (action.type) {
    case ActionTypes.UPDATE_VIEW:
      return {
        ...state,
        view: action.view
      };
    case ActionTypes.UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      };
    case ActionTypes.UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened
      };
    case ActionTypes.OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true
      };
    case ActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false
      };
    default:
      return state;
  }
};

export default app;
